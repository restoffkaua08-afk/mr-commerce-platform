param(
    [switch]$NoBrowser
)

$ErrorActionPreference = "Stop"

$Project = $PSScriptRoot
$Server = Join-Path $Project "server"
$Web = Join-Path $Project "web"
$Runtime = Join-Path $Project ".runtime"
$StateFile = Join-Path $Runtime "mr-processes.json"

$ApiLog = Join-Path $Runtime "api.log"
$ApiErrorLog = Join-Path $Runtime "api-error.log"
$WebLog = Join-Path $Runtime "web.log"
$WebErrorLog = Join-Path $Runtime "web-error.log"

$ApiEntry = Join-Path $Server "dist\server.js"
$WebEntry = Join-Path `
    $Web `
    "node_modules\next\dist\bin\next"

$ServerEnv = Join-Path $Server ".env.local"
$WebEnv = Join-Path $Web ".env.local"

$MySqlAdmin = "C:\xampp\mysql\bin\mysqladmin.exe"
$MySqlStart = "C:\xampp\mysql_start.bat"

function Test-PortAvailable {
    param(
        [Parameter(Mandatory = $true)]
        [int]$Port
    )

    $Connection = Get-NetTCPConnection `
        -LocalPort $Port `
        -State Listen `
        -ErrorAction SilentlyContinue

    return ($null -eq $Connection)
}

function Test-MariaDb {
    & $MySqlAdmin `
        --user=root `
        ping `
        --silent *> $null

    return ($LASTEXITCODE -eq 0)
}

function Stop-StartedProcess {
    param(
        [System.Diagnostics.Process]$Process
    )

    if ($Process -and -not $Process.HasExited) {
        Stop-Process `
            -Id $Process.Id `
            -Force `
            -ErrorAction SilentlyContinue
    }
}

Write-Host "======================================" -ForegroundColor DarkYellow
Write-Host "          INICIANDO A MR" -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor DarkYellow

$RequiredFiles = @(
    $ApiEntry,
    $WebEntry,
    $ServerEnv,
    $WebEnv,
    $MySqlAdmin
)

foreach ($File in $RequiredFiles) {
    if (-not (Test-Path -LiteralPath $File -PathType Leaf)) {
        throw (
            "Arquivo obrigatório ausente: $File`n" +
            "Execute primeiro: .\INSTALAR-MR.ps1"
        )
    }
}

if (Test-Path -LiteralPath $StateFile -PathType Leaf) {
    throw (
        "Já existe um estado de execução da MR.`n" +
        "Use PARAR-MR.ps1 antes de iniciar novamente."
    )
}

if (-not (Test-PortAvailable -Port 8021)) {
    throw "A porta 8021 já está ocupada."
}

if (-not (Test-PortAvailable -Port 3000)) {
    throw "A porta 3000 já está ocupada."
}

Write-Host ""
Write-Host "=== VERIFICANDO MARIADB ===" -ForegroundColor Cyan

if (-not (Test-MariaDb)) {
    if (-not (Test-Path -LiteralPath $MySqlStart -PathType Leaf)) {
        throw "MariaDB está parado e mysql_start.bat não foi encontrado."
    }

    Write-Host "Iniciando MariaDB pelo XAMPP..." `
        -ForegroundColor Yellow

    Start-Process `
        -FilePath $MySqlStart `
        -WorkingDirectory "C:\xampp" `
        -WindowStyle Hidden

    $MariaDbReady = $false

    for ($Attempt = 1; $Attempt -le 20; $Attempt++) {
        Start-Sleep -Seconds 1

        if (Test-MariaDb) {
            $MariaDbReady = $true
            break
        }

        Write-Host "Aguardando MariaDB: $Attempt de 20"
    }

    if (-not $MariaDbReady) {
        throw "MariaDB não ficou disponível."
    }
}

Write-Host "MariaDB disponível." -ForegroundColor Green

if (-not (Test-Path -LiteralPath $Runtime)) {
    New-Item `
        -ItemType Directory `
        -Path $Runtime `
        -Force |
        Out-Null
}

$RuntimeLogs = @(
    $ApiLog,
    $ApiErrorLog,
    $WebLog,
    $WebErrorLog
)

foreach ($LogFile in $RuntimeLogs) {
    if (Test-Path -LiteralPath $LogFile) {
        Remove-Item -LiteralPath $LogFile -Force
    }
}

$ApiProcess = $null
$WebProcess = $null

try {
    Write-Host ""
    Write-Host "=== INICIANDO API ===" -ForegroundColor Cyan

    $ApiProcess = Start-Process `
        -FilePath "node.exe" `
        -ArgumentList $ApiEntry `
        -WorkingDirectory $Server `
        -RedirectStandardOutput $ApiLog `
        -RedirectStandardError $ApiErrorLog `
        -WindowStyle Hidden `
        -PassThru

    $ApiReady = $false

    for ($Attempt = 1; $Attempt -le 20; $Attempt++) {
        Start-Sleep -Seconds 1

        if ($ApiProcess.HasExited) {
            if (Test-Path -LiteralPath $ApiErrorLog) {
                Get-Content -LiteralPath $ApiErrorLog
            }

            throw "A API encerrou durante a inicialização."
        }

        try {
            $Health = Invoke-RestMethod `
                -Uri "http://127.0.0.1:8021/api/v1/health" `
                -TimeoutSec 3

            if ($Health.status -eq "ok") {
                $ApiReady = $true
                break
            }
        }
        catch {
            Write-Host "Aguardando API: $Attempt de 20"
        }
    }

    if (-not $ApiReady) {
        throw "A API não ficou disponível."
    }

    Write-Host "API disponível no PID $($ApiProcess.Id)." `
        -ForegroundColor Green

    Write-Host ""
    Write-Host "=== INICIANDO FRONTEND ===" -ForegroundColor Cyan

    $WebArguments = @(
        $WebEntry,
        "start",
        "-p",
        "3000"
    )

    $WebProcess = Start-Process `
        -FilePath "node.exe" `
        -ArgumentList $WebArguments `
        -WorkingDirectory $Web `
        -RedirectStandardOutput $WebLog `
        -RedirectStandardError $WebErrorLog `
        -WindowStyle Hidden `
        -PassThru

    $WebReady = $false

    for ($Attempt = 1; $Attempt -le 25; $Attempt++) {
        Start-Sleep -Seconds 1

        if ($WebProcess.HasExited) {
            if (Test-Path -LiteralPath $WebErrorLog) {
                Get-Content -LiteralPath $WebErrorLog
            }

            throw "O frontend encerrou durante a inicialização."
        }

        try {
            $Response = Invoke-WebRequest `
                -Uri "http://127.0.0.1:3000" `
                -UseBasicParsing `
                -TimeoutSec 3

            if ($Response.StatusCode -eq 200) {
                $WebReady = $true
                break
            }
        }
        catch {
            Write-Host "Aguardando frontend: $Attempt de 25"
        }
    }

    if (-not $WebReady) {
        throw "O frontend não ficou disponível."
    }

    Write-Host "Frontend disponível no PID $($WebProcess.Id)." `
        -ForegroundColor Green

    $State = [ordered]@{
        project = $Project
        apiPid = $ApiProcess.Id
        webPid = $WebProcess.Id
        apiUrl = "http://127.0.0.1:8021"
        webUrl = "http://127.0.0.1:3000"
        startedAt = (Get-Date).ToString("o")
    }

    $StateJson = $State | ConvertTo-Json

    [System.IO.File]::WriteAllText(
        $StateFile,
        $StateJson + "`r`n",
        [System.Text.UTF8Encoding]::new($false)
    )
}
catch {
    Stop-StartedProcess -Process $WebProcess
    Stop-StartedProcess -Process $ApiProcess

    if (Test-Path -LiteralPath $StateFile) {
        Remove-Item -LiteralPath $StateFile -Force
    }

    throw
}

Write-Host ""
Write-Host "======================================" -ForegroundColor DarkGreen
Write-Host "           MR ESTÁ ONLINE" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor DarkGreen
Write-Host "Site: http://localhost:3000"
Write-Host "API:  http://localhost:8021/api/v1/health"
Write-Host ""
Write-Host "Os logs estão em .runtime\"
Write-Host "Use PARAR-MR.ps1 para encerrar a plataforma."

if (-not $NoBrowser) {
    Start-Process "http://localhost:3000"
}
