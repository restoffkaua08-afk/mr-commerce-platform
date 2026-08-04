$ErrorActionPreference = "Stop"

$Project = $PSScriptRoot
$Runtime = Join-Path $Project ".runtime"
$StateFile = Join-Path $Runtime "mr-processes.json"
$MySqlAdmin = "C:\xampp\mysql\bin\mysqladmin.exe"

function Get-RegisteredProcess {
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
        throw "$Component não está ativo no PID registrado $ProcessId."
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
            "O PID de $Component pertence a outro programa: " +
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
            "O processo de $Component não pertence ao projeto MR. " +
            "Nenhuma ação foi realizada."
        )
    }

    return $Process
}

Write-Host "======================================" -ForegroundColor DarkYellow
Write-Host "          VALIDANDO A MR" -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor DarkYellow

if (-not (Test-Path -LiteralPath $StateFile -PathType Leaf)) {
    throw (
        "A MR não possui um estado de execução ativo.`n" +
        "Execute primeiro: .\INICIAR-MR.ps1"
    )
}

try {
    $State = Get-Content `
        -LiteralPath $StateFile `
        -Raw `
        -Encoding UTF8 |
        ConvertFrom-Json
}
catch {
    throw "O arquivo de estado da MR está inválido."
}

if ($State.project -ne $Project) {
    throw "O estado registrado pertence a outro projeto."
}

Write-Host ""
Write-Host "=== VALIDANDO PROCESSOS ===" -ForegroundColor Cyan

$ApiProcess = Get-RegisteredProcess `
    -ProcessId ([int]$State.apiPid) `
    -Component "API"

$WebProcess = Get-RegisteredProcess `
    -ProcessId ([int]$State.webPid) `
    -Component "frontend"

Write-Host "API: PID $($ApiProcess.Id)"
Write-Host "Frontend: PID $($WebProcess.Id)"
Write-Host "Processos pertencem à MR." -ForegroundColor Green

Write-Host ""
Write-Host "=== VALIDANDO MARIADB ===" -ForegroundColor Cyan

if (-not (Test-Path -LiteralPath $MySqlAdmin -PathType Leaf)) {
    throw "mysqladmin não foi encontrado."
}

& $MySqlAdmin `
    --user=root `
    ping `
    --silent *> $null

if ($LASTEXITCODE -ne 0) {
    throw "MariaDB não está disponível."
}

Write-Host "MariaDB: OK" -ForegroundColor Green

Write-Host ""
Write-Host "=== VALIDANDO API E BANCO ===" -ForegroundColor Cyan

$HealthResponse = Invoke-RestMethod `
    -Uri "http://127.0.0.1:8021/api/v1/health" `
    -TimeoutSec 5

if ($HealthResponse.status -ne "ok") {
    throw "A API não retornou status ok."
}

Write-Host "API e banco: OK" -ForegroundColor Green

Write-Host ""
Write-Host "=== VALIDANDO FRONTEND ===" -ForegroundColor Cyan

$HomeResponse = Invoke-WebRequest `
    -Uri "http://127.0.0.1:3000" `
    -UseBasicParsing `
    -TimeoutSec 5

if ($HomeResponse.StatusCode -ne 200) {
    throw "A página inicial não retornou HTTP 200."
}

Write-Host "Página inicial: HTTP 200" -ForegroundColor Green

Write-Host ""
Write-Host "=== VALIDANDO CATÁLOGO ===" -ForegroundColor Cyan

$CatalogResponse = Invoke-RestMethod `
    -Uri "http://127.0.0.1:3000/api/catalog" `
    -TimeoutSec 10

$Products = @($CatalogResponse.products)
$Brands = @($CatalogResponse.brands)
$Categories = @($CatalogResponse.categories)

Write-Host "Produtos: $($Products.Count)"
Write-Host "Marcas: $($Brands.Count)"
Write-Host "Categorias: $($Categories.Count)"

if ($Products.Count -ne 8) {
    throw "Quantidade de produtos incorreta."
}

if ($Brands.Count -ne 3) {
    throw "Quantidade de marcas incorreta."
}

if ($Categories.Count -ne 5) {
    throw "Quantidade de categorias incorreta."
}

$InvalidProducts = @(
    $Products |
    Where-Object {
        -not $_.slug -or
        -not $_.name -or
        -not $_.image
    }
)

if ($InvalidProducts.Count -gt 0) {
    throw "O catálogo contém produtos sem informações essenciais."
}

Write-Host "Catálogo integrado: OK" -ForegroundColor Green

Write-Host ""
Write-Host "======================================" -ForegroundColor DarkGreen
Write-Host "          SISTEMA SAUDÁVEL" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor DarkGreen
Write-Host "Site: http://localhost:3000"
Write-Host "API:  http://localhost:8021/api/v1/health"
Write-Host "Iniciado em: $($State.startedAt)"
