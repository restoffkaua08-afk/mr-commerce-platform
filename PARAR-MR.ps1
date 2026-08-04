$ErrorActionPreference = "Stop"

$Project = $PSScriptRoot
$Runtime = Join-Path $Project ".runtime"
$StateFile = Join-Path $Runtime "mr-processes.json"

function Stop-RegisteredProcess {
    param(
        [Parameter(Mandatory = $true)]
        [int]$ProcessId,

        [Parameter(Mandatory = $true)]
        [string]$Component
    )

    $Process = Get-Process `
        -Id $ProcessId `
        -ErrorAction SilentlyContinue

    if (-not $Process) {
        Write-Host "$Component já estava encerrado." `
            -ForegroundColor Yellow

        return
    }

    $ProcessInfo = Get-CimInstance `
        -ClassName Win32_Process `
        -Filter "ProcessId = $ProcessId" `
        -ErrorAction Stop

    if (-not $ProcessInfo) {
        throw "Não foi possível inspecionar o processo de $Component."
    }

    if ($ProcessInfo.Name -ne "node.exe") {
        throw (
            "O PID registrado para $Component pertence a outro programa: " +
            $ProcessInfo.Name
        )
    }

    if (
        -not $ProcessInfo.CommandLine -or
        $ProcessInfo.CommandLine.IndexOf(
            $Project,
            [System.StringComparison]::OrdinalIgnoreCase
        ) -lt 0
    ) {
        throw (
            "O processo registrado para $Component não pertence à MR. " +
            "Ele não será encerrado."
        )
    }

    & taskkill.exe `
        /PID $ProcessId `
        /T `
        /F *> $null

    $TaskKillExitCode = $LASTEXITCODE

    $ProcessStopped = $false

    for ($Attempt = 1; $Attempt -le 20; $Attempt++) {
        Start-Sleep -Milliseconds 250

        $RemainingProcess = Get-Process `
            -Id $ProcessId `
            -ErrorAction SilentlyContinue

        if (-not $RemainingProcess) {
            $ProcessStopped = $true
            break
        }
    }

    if (-not $ProcessStopped) {
        throw "Não foi possível encerrar $Component."
    }

    if ($TaskKillExitCode -ne 0) {
        Write-Host (
            "taskkill retornou código $TaskKillExitCode, " +
            "mas o processo foi confirmado como encerrado."
        ) -ForegroundColor Yellow
    }

    Write-Host "$Component encerrado: PID $ProcessId" `
        -ForegroundColor Green
}

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

Write-Host "======================================" -ForegroundColor DarkYellow
Write-Host "          ENCERRANDO A MR" -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor DarkYellow

if (-not (Test-Path -LiteralPath $StateFile -PathType Leaf)) {
    Write-Host "Nenhum estado de execução foi encontrado." `
        -ForegroundColor Yellow
    Write-Host "A plataforma já pode estar encerrada."

    exit 0
}

try {
    $State = Get-Content `
        -LiteralPath $StateFile `
        -Raw `
        -Encoding UTF8 |
        ConvertFrom-Json
}
catch {
    throw (
        "O arquivo de estado está inválido. " +
        "Nenhum processo será encerrado automaticamente."
    )
}

if ($State.project -ne $Project) {
    throw (
        "O estado pertence a outro projeto. " +
        "Nenhum processo será encerrado."
    )
}

Write-Host ""
Write-Host "=== CONFERINDO PROCESSOS ===" -ForegroundColor Cyan

$RegisteredProcesses = @(
    [ordered]@{
        Id = [int]$State.webPid
        Component = "Frontend"
    },
    [ordered]@{
        Id = [int]$State.apiPid
        Component = "API"
    }
)

foreach ($RegisteredProcess in $RegisteredProcesses) {
    $ExistingProcess = Get-Process `
        -Id $RegisteredProcess.Id `
        -ErrorAction SilentlyContinue

    if (-not $ExistingProcess) {
        continue
    }

    $ProcessInfo = Get-CimInstance `
        -ClassName Win32_Process `
        -Filter "ProcessId = $($RegisteredProcess.Id)" `
        -ErrorAction Stop

    if (
        -not $ProcessInfo -or
        $ProcessInfo.Name -ne "node.exe" -or
        -not $ProcessInfo.CommandLine -or
        $ProcessInfo.CommandLine.IndexOf(
            $Project,
            [System.StringComparison]::OrdinalIgnoreCase
        ) -lt 0
    ) {
        throw (
            "A identidade do processo $($RegisteredProcess.Component) " +
            "não pôde ser confirmada. Nada será encerrado."
        )
    }
}

Write-Host "Identidade dos processos confirmada." `
    -ForegroundColor Green

Write-Host ""
Write-Host "=== ENCERRANDO SERVIÇOS ===" -ForegroundColor Cyan

Stop-RegisteredProcess `
    -ProcessId ([int]$State.webPid) `
    -Component "Frontend"

Stop-RegisteredProcess `
    -ProcessId ([int]$State.apiPid) `
    -Component "API"

$PortsReleased = $false

for ($Attempt = 1; $Attempt -le 10; $Attempt++) {
    Start-Sleep -Milliseconds 500

    if (
        (Test-PortAvailable -Port 3000) -and
        (Test-PortAvailable -Port 8021)
    ) {
        $PortsReleased = $true
        break
    }
}

if (-not $PortsReleased) {
    throw "Os processos encerraram, mas alguma porta continua ocupada."
}

Remove-Item `
    -LiteralPath $StateFile `
    -Force `
    -ErrorAction Stop

Write-Host ""
Write-Host "=== RESULTADO ===" -ForegroundColor Green
Write-Host "Porta 3000: livre"
Write-Host "Porta 8021: livre"
Write-Host "MariaDB: preservado"
Write-Host ""
Write-Host "A plataforma MR foi encerrada corretamente." `
    -ForegroundColor Green
