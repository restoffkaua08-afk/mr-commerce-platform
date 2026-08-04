param(
    [switch]$SkipTests
)

$ErrorActionPreference = "Stop"

$Project = $PSScriptRoot
$Server = Join-Path $Project "server"
$Web = Join-Path $Project "web"
$Bootstrap = Join-Path `
    $Project `
    "database\bootstrap\product_aggregator_mvp.sql"

$ServerEnvExample = Join-Path $Server ".env.example"
$ServerEnvLocal = Join-Path $Server ".env.local"
$WebEnvExample = Join-Path $Web ".env.example"
$WebEnvLocal = Join-Path $Web ".env.local"

$MySql = "C:\xampp\mysql\bin\mysql.exe"
$MySqlAdmin = "C:\xampp\mysql\bin\mysqladmin.exe"
$MySqlStart = "C:\xampp\mysql_start.bat"

$DatabaseName = "product_aggregator_mvp"

function Invoke-CheckedCommand {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Description,

        [Parameter(Mandatory = $true)]
        [scriptblock]$Command
    )

    Write-Host ""
    Write-Host "=== $Description ===" -ForegroundColor Cyan

    & $Command

    if ($LASTEXITCODE -ne 0) {
        throw "$Description falhou com código $LASTEXITCODE."
    }
}

function Test-MariaDb {
    & $MySqlAdmin `
        --user=root `
        ping `
        --silent *> $null

    return ($LASTEXITCODE -eq 0)
}

function New-RandomHexSecret {
    $Bytes = New-Object byte[] 32

    $Generator = [System.Security.Cryptography.RandomNumberGenerator]::Create()

    try {
        $Generator.GetBytes($Bytes)
    }
    finally {
        $Generator.Dispose()
    }

    return (
        ($Bytes |
            ForEach-Object {
                $_.ToString("x2")
            }) -join ""
    )
}

Write-Host "======================================" -ForegroundColor DarkYellow
Write-Host "       INSTALAÇÃO LOCAL DA MR" -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor DarkYellow
Write-Host "Projeto: $Project"

Write-Host ""
Write-Host "=== VALIDANDO ESTRUTURA ===" -ForegroundColor Cyan

$RequiredPaths = @(
    $Server,
    $Web,
    $Bootstrap,
    $ServerEnvExample,
    $WebEnvExample,
    (Join-Path $Project "package.json"),
    (Join-Path $Server "package.json"),
    (Join-Path $Web "package.json")
)

foreach ($Path in $RequiredPaths) {
    if (-not (Test-Path -LiteralPath $Path)) {
        throw "Arquivo ou diretório obrigatório ausente: $Path"
    }

    Write-Host "OK: $Path"
}

Write-Host ""
Write-Host "=== VALIDANDO PROGRAMAS ===" -ForegroundColor Cyan

$NodeCommand = Get-Command "node.exe" -ErrorAction SilentlyContinue
$NpmCommand = Get-Command "npm.cmd" -ErrorAction SilentlyContinue

if (-not $NodeCommand) {
    throw "Node.js não foi encontrado no PATH."
}

if (-not $NpmCommand) {
    throw "npm não foi encontrado no PATH."
}

if (-not (Test-Path -LiteralPath $MySql -PathType Leaf)) {
    throw "Cliente do MariaDB não encontrado: $MySql"
}

if (-not (Test-Path -LiteralPath $MySqlAdmin -PathType Leaf)) {
    throw "mysqladmin não encontrado: $MySqlAdmin"
}

Write-Host "Node.js: $(node --version)"
Write-Host "npm: $(npm --version)"
Write-Host "MariaDB: encontrado no XAMPP"

Write-Host ""
Write-Host "=== VERIFICANDO MARIADB ===" -ForegroundColor Cyan

if (-not (Test-MariaDb)) {
    if (-not (Test-Path -LiteralPath $MySqlStart -PathType Leaf)) {
        throw "MariaDB está parado e mysql_start.bat não foi encontrado."
    }

    Write-Host "MariaDB está parado. Iniciando pelo XAMPP..." `
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
        throw "O MariaDB não ficou disponível."
    }
}

Write-Host "MariaDB disponível." -ForegroundColor Green

Write-Host ""
Write-Host "=== CONFIGURANDO AMBIENTE LOCAL ===" -ForegroundColor Cyan

if (-not (Test-Path -LiteralPath $ServerEnvLocal)) {
    $ServerEnvironment = [System.IO.File]::ReadAllText(
        $ServerEnvExample
    )

    $Secret = New-RandomHexSecret

    $ServerEnvironment = $ServerEnvironment.Replace(
        "replace-with-a-secure-random-value",
        $Secret
    )

    $Utf8WithoutBom = [System.Text.UTF8Encoding]::new($false)

    [System.IO.File]::WriteAllText(
        $ServerEnvLocal,
        $ServerEnvironment.TrimEnd() + "`n",
        $Utf8WithoutBom
    )

    Write-Host "Criado: server\.env.local"
    Write-Host "Segredo local seguro gerado automaticamente."
}
else {
    Write-Host "Preservado: server\.env.local"
}

if (-not (Test-Path -LiteralPath $WebEnvLocal)) {
    Copy-Item `
        -LiteralPath $WebEnvExample `
        -Destination $WebEnvLocal

    Write-Host "Criado: web\.env.local"
}
else {
    Write-Host "Preservado: web\.env.local"
}

Write-Host ""
Write-Host "=== VALIDANDO PROTEÇÃO DOS AMBIENTES ===" `
    -ForegroundColor Cyan

Set-Location -LiteralPath $Project

git check-ignore --quiet -- "server/.env.local"

if ($LASTEXITCODE -ne 0) {
    throw "server/.env.local não está protegido pelo Git."
}

git check-ignore --quiet -- "web/.env.local"

if ($LASTEXITCODE -ne 0) {
    throw "web/.env.local não está protegido pelo Git."
}

Write-Host "Ambientes locais protegidos." -ForegroundColor Green

Invoke-CheckedCommand `
    -Description "INSTALANDO ORQUESTRADOR" `
    -Command {
        Set-Location -LiteralPath $Project
        npm ci
    }

Invoke-CheckedCommand `
    -Description "INSTALANDO BACKEND" `
    -Command {
        Set-Location -LiteralPath $Server
        npm ci
    }

Invoke-CheckedCommand `
    -Description "INSTALANDO FRONTEND" `
    -Command {
        Set-Location -LiteralPath $Web
        npm ci
    }

Write-Host ""
Write-Host "=== PREPARANDO BANCO DE DADOS ===" -ForegroundColor Cyan

$DatabaseExists = & $MySql `
    --user=root `
    --batch `
    --skip-column-names `
    --execute="
        SELECT COUNT(*)
        FROM information_schema.schemata
        WHERE schema_name = '$DatabaseName';
    "

if ($LASTEXITCODE -ne 0) {
    throw "Não foi possível consultar o catálogo do MariaDB."
}

if ([int]$DatabaseExists -eq 0) {
    Write-Host "Criando banco pelo bootstrap independente..."

    $RestoreProcess = Start-Process `
        -FilePath $MySql `
        -ArgumentList @(
            "--user=root",
            "--default-character-set=utf8mb4"
        ) `
        -RedirectStandardInput $Bootstrap `
        -NoNewWindow `
        -Wait `
        -PassThru

    if ($RestoreProcess.ExitCode -ne 0) {
        throw "Não foi possível restaurar o bootstrap."
    }

    Write-Host "Banco restaurado." -ForegroundColor Green
}
else {
    Write-Host "Banco existente preservado: $DatabaseName" `
        -ForegroundColor Green
}

Invoke-CheckedCommand `
    -Description "VALIDANDO BANCO" `
    -Command {
        Set-Location -LiteralPath $Project
        npm run db:check
    }

Invoke-CheckedCommand `
    -Description "VALIDANDO CÓDIGO" `
    -Command {
        Set-Location -LiteralPath $Project
        npm run lint
    }

Invoke-CheckedCommand `
    -Description "GERANDO BUILDS" `
    -Command {
        Set-Location -LiteralPath $Project
        npm run build
    }

if (-not $SkipTests) {
    Invoke-CheckedCommand `
        -Description "EXECUTANDO TESTES INTEGRADOS" `
        -Command {
            Set-Location -LiteralPath $Project
            npm test
        }
}
else {
    Write-Host ""
    Write-Host "Testes ignorados por solicitação." `
        -ForegroundColor Yellow
}

Set-Location -LiteralPath $Project

Write-Host ""
Write-Host "======================================" -ForegroundColor DarkGreen
Write-Host "       INSTALAÇÃO CONCLUÍDA" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor DarkGreen
Write-Host "Banco: $DatabaseName"
Write-Host "Backend: preparado"
Write-Host "Frontend: preparado"
Write-Host "Ambientes locais: protegidos"
Write-Host ""
Write-Host "A plataforma MR está instalada e validada." -ForegroundColor Green
