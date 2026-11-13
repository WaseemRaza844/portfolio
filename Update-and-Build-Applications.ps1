# Double-click Update-and-Build-Applications.cmd to start this safe updater.
# Works from the root of WaseemRaza844/portfolio on Windows.
[CmdletBinding()]
param([string]$Application = "")
$ErrorActionPreference = "Stop"
$repo = $PSScriptRoot
$faculty = Join-Path $repo "resume\job-applications\faculty"
$default = "rowan-university-ece-adjunct-501674"

function Fail([string]$message) { throw $message }
function Git([string[]]$Arguments) {
    & git -C $repo @Arguments
    if ($LASTEXITCODE -ne 0) { Fail "Git failed: git $($Arguments -join ' ')" }
}
try {
    if (-not (Test-Path (Join-Path $repo ".git"))) { Fail "This launcher must be placed in the ROOT of the cloned portfolio repository." }
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) { Fail "Git is not installed or not on PATH." }

    Write-Host "Portfolio application updater" -ForegroundColor Cyan
    $dirty = & git -C $repo status --porcelain
    if ($LASTEXITCODE -ne 0) { Fail "Cannot inspect Git status." }
    if ($dirty) {
        Write-Warning "You have local uncommitted changes. This launcher will NOT discard, reset or stash them."
        $answer = Read-Host "Continue with a safe fast-forward pull? [y/N]"
        if ($answer -notmatch '^(y|yes)$') { Write-Host "Stopped safely."; exit 0 }
    }

    $branch = (& git -C $repo branch --show-current).Trim()
    if ($branch -ne "develop") {
        if ($dirty) { Fail "Please commit or stash local work before switching from '$branch' to develop." }
        Git @("switch","develop")
    }
    Write-Host "Fetching the latest develop branch..." -ForegroundColor Cyan
    Git @("pull","--ff-only","origin","develop")

    if (-not (Get-Command python -ErrorAction SilentlyContinue)) { Fail "Install Python and add it to PATH." }
    if (-not (Get-Command pdflatex -ErrorAction SilentlyContinue)) { Fail "Install MiKTeX or TeX Live (pdflatex) before building faculty CV PDFs." }

    $available = @(Get-ChildItem -Path $faculty -Directory | Where-Object {
        Test-Path (Join-Path $_.FullName "build_documents.py")
    } | Sort-Object Name)
    if (-not $available) { Fail "No faculty application build scripts were found." }

    if ([string]::IsNullOrWhiteSpace($Application)) {
        Write-Host ""
        Write-Host "Choose an application to build (press Enter for Rowan):"
        for ($i=0; $i -lt $available.Count; $i++) {
            Write-Host ("[{0}] {1}" -f ($i+1), $available[$i].Name)
        }
        $selected = Read-Host "Number or folder name [Rowan default]"
        if ([string]::IsNullOrWhiteSpace($selected)) {
            $Application = $default
        } elseif ($selected -match '^\d+$' -and [int]$selected -ge 1 -and [int]$selected -le $available.Count) {
            $Application = $available[[int]$selected-1].Name
        } else {
            $Application = $selected.Trim()
        }
    }
    if ($Application -notmatch '^[a-z0-9-]+$') { Fail "Invalid application name." }
    $folder = Join-Path $faculty $Application
    $script = Join-Path $folder "build_documents.py"
    if (-not (Test-Path $script)) { Fail "No build_documents.py in '$Application'." }

    & python -c "import docx, reportlab, pypdf"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Installing missing PDF/Word dependencies..." -ForegroundColor Yellow
        & python -m pip install -r (Join-Path $repo "resume\requirements.txt")
        if ($LASTEXITCODE -ne 0) { Fail "Python dependency installation failed." }
    }

    Write-Host "Building $Application using existing repository templates..." -ForegroundColor Cyan
    & python $script
    if ($LASTEXITCODE -ne 0) { Fail "Document build failed. See the error above. Files are NOT confirmed ready." }
    $ready = Join-Path $folder "submission-ready"
    if (Test-Path $ready) {
        Write-Host "Finished: $ready" -ForegroundColor Green
        Start-Process explorer.exe -ArgumentList ('"' + $ready + '"')
    } else {
        Write-Warning "Build completed but no submission-ready folder was found."
    }
} catch {
    Write-Host ""
    Write-Host ("ERROR: " + $_.Exception.Message) -ForegroundColor Red
    exit 1
}
