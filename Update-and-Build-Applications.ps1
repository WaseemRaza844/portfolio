# Portfolio application updater; launch via Update-and-Build-Applications.cmd
[CmdletBinding()]
param([string]$Application = "")
$ErrorActionPreference = 'Stop'
$repo = $PSScriptRoot
$faculty = Join-Path $repo 'resume\job-applications\faculty'
$default = 'rowan-university-ece-adjunct-501674'
$started = Get-Date

function Say([string]$Message) {
    Write-Host ("[{0}] {1}" -f (Get-Date -Format 'HH:mm:ss'), $Message)
}
function Git([string[]]$GitArguments) {
    Say ("git " + ($GitArguments -join ' '))
    & git -C $repo @GitArguments
    if ($LASTEXITCODE -ne 0) { throw ("Git command failed: " + ($GitArguments -join ' ')) }
}
function FindPython {
    $python = Get-Command python -ErrorAction SilentlyContinue
    if ($python) { return $python.Source }
    throw 'Python was not found on PATH. Install Python 3.12 and reopen the launcher.'
}

try {
    Write-Host '=========================================================' -ForegroundColor Cyan
    Write-Host ' PORTFOLIO | UPDATE AND BUILD FACULTY APPLICATIONS' -ForegroundColor Cyan
    Write-Host '=========================================================' -ForegroundColor Cyan
    Say ("Repository: " + $repo)

    if (-not (Test-Path (Join-Path $repo '.git'))) { throw 'Launcher must be in the root of your cloned portfolio repository.' }
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw 'Git not found. Install Git for Windows.' }

    Say '1/5 Checking current branch and local edits...'
    $branch = (& git -C $repo branch --show-current).Trim()
    if ($LASTEXITCODE -ne 0) { throw 'Failed to read the current Git branch.' }
    Say ("Current branch: " + $branch)
    $changes = @(& git -C $repo status --porcelain)
    if ($LASTEXITCODE -ne 0) { throw 'Could not inspect local edits.' }
    if ($changes.Count -gt 0 -and ($changes -join '').Trim()) {
        Write-Warning 'Local edits are present. No edits will be reset, deleted or stashed.'
        $changes | Select-Object -First 8 | ForEach-Object { Write-Host ("  " + $_) }
    } else {
        Say 'Local worktree is clean.'
    }

    if ($branch -ne 'develop') {
        if ($changes.Count -gt 0 -and ($changes -join '').Trim()) {
            throw 'Local changes prevent automatic branch switching. Please commit/stash edits, then run again.'
        }
        Git -GitArguments @('switch','develop')
    }

    Say '2/5 Checking GitHub for latest changes...'
    # Fast-forward ONLY. Never overwrite local edits, reset, or force pull.
    Git -Args @('fetch','origin','develop')
    $before = (& git -C $repo rev-parse HEAD).Trim()
    $remote = (& git -C $repo rev-parse origin/develop).Trim()
    if ($before -eq $remote) {
        Say 'Repository is ALREADY UP TO DATE. No pull needed.'
    } else {
        Say 'Updates found. Applying safe fast-forward pull...'
        Git -Args @('merge','--ff-only','origin/develop')
        Say 'Repository updated successfully.'
    }

    Say '3/5 Selecting an application...'
    $available = @(Get-ChildItem -Path $faculty -Directory | Where-Object {
        Test-Path (Join-Path $_.FullName 'build_documents.py')
    } | Sort-Object Name)
    if ($available.Count -eq 0) { throw 'No buildable faculty application folders found.' }

    if ([string]::IsNullOrWhiteSpace($Application)) {
        Write-Host ''
        Say 'Press ENTER to build Rowan, or type a number:'
        for ($i=0; $i -lt $available.Count; $i++) {
            $tag = if ($available[$i].Name -eq $default) { ' [DEFAULT]' } else { '' }
            Write-Host ('  [{0}] {1}{2}' -f ($i+1), $available[$i].Name, $tag)
        }
        $choice = Read-Host 'Choose application (Enter = Rowan)'
        if ([string]::IsNullOrWhiteSpace($choice)) {
            $Application = $default
        } elseif ($choice -match '^\d+$' -and [int]$choice -ge 1 -and [int]$choice -le $available.Count) {
            $Application = $available[[int]$choice-1].Name
        } else {
            $Application = $choice.Trim()
        }
    }
    if ($Application -notmatch '^[a-z0-9-]+$') { throw 'Invalid application name.' }
    $folder = Join-Path $faculty $Application
    $script = Join-Path $folder 'build_documents.py'
    if (-not (Test-Path $script)) { throw ("No build script in " + $Application) }
    Say ("Selected: " + $Application)

    Say '4/5 Checking build tools...'
    $python = FindPython
    Say ("Using Python: " + $python)
    $check = & $python -c 'import docx, reportlab, pypdf'
    if ($LASTEXITCODE -ne 0) {
        Say 'Installing missing Python packages from resume/requirements.txt...'
        & $python -m pip install -r (Join-Path $repo 'resume\requirements.txt')
        if ($LASTEXITCODE -ne 0) { throw 'Python dependency installation failed.' }
    }
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Node.js is required to load shared portfolio data. Install Node.js and try again.' }
    if (-not (Get-Command pdflatex -ErrorAction SilentlyContinue)) { throw 'pdflatex is required for CV builds. Install MiKTeX or TeX Live.' }

    Say '5/5 Building documents...'
    & $python $script
    if ($LASTEXITCODE -ne 0) { throw 'The application build failed. Review the error above.' }

    $ready = Join-Path $folder 'submission-ready'
    $outputs = @(Get-ChildItem $ready -File -ErrorAction SilentlyContinue | Where-Object { $_.Extension -in @('.pdf','.docx') })
    if ($outputs.Count -eq 0) { throw 'No PDF or Word output was created.' }
    Write-Host ''
    Write-Host 'SUCCESS: APPLICATION DOCUMENTS BUILT' -ForegroundColor Green
    $outputs | ForEach-Object { Write-Host ('  ' + $_.Name) }
    Say ("Output: " + $ready)
    Start-Process explorer.exe -ArgumentList ('"' + $ready + '"')
} catch {
    Write-Host ''
    Write-Host ('ERROR: ' + $_.Exception.Message) -ForegroundColor Red
    Write-Host 'Your local changes were NOT intentionally discarded.' -ForegroundColor Yellow
    exit 1
} finally {
    Say ('Finished at ' + (Get-Date -Format 'HH:mm:ss'))
}
