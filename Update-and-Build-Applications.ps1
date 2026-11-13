# Double-click Update-and-Build-Applications.cmd (in the portfolio repo root).
# Sync only 'develop': pull/rebase, push committed local work; never force-push or reset.
[CmdletBinding()]
param([string]$Application = "")
$ErrorActionPreference = "Stop"
$repo = $PSScriptRoot
$default = "rowan-university-ece-adjunct-501674"
$applicationRoots = @(
    (Join-Path $repo "resume\job-applications\faculty"),
    (Join-Path $repo "resume\job-applications\industry")
)

function Write-Step([string]$Message) {
    Write-Host ("[{0}] {1}" -f (Get-Date -Format 'HH:mm:ss'), $Message)
}

# IMPORTANT: Do not name this function 'Git'. PowerShell resolves functions
# case-insensitively, so calling git inside a function called Git recurses forever.
function Invoke-GitCommand {
    param([Parameter(Mandatory=$true)][string[]]$GitArguments)
    Write-Step ("git " + ($GitArguments -join " "))
    & git.exe -C $repo @GitArguments
    if ($LASTEXITCODE -ne 0) {
        throw ("Git command failed: git " + ($GitArguments -join " "))
    }
}

function Get-GitText {
    param([Parameter(Mandatory=$true)][string[]]$GitArguments)
    $result = & git.exe -C $repo @GitArguments
    if ($LASTEXITCODE -ne 0) {
        throw ("Git command failed: git " + ($GitArguments -join " "))
    }
    return ($result | Out-String).Trim()
}

function Get-TrackedEdits {
    $lines = @(& git.exe -C $repo status --porcelain --untracked-files=no)
    if ($LASTEXITCODE -ne 0) { throw "Cannot inspect tracked changes." }
    return @($lines | Where-Object { $_.Trim() })
}

function Offer-TrackedCommit([string]$Context) {
    $changed = @(Get-TrackedEdits)
    if ($changed.Count -eq 0) { return }
    Write-Host ""
    Write-Host ("Tracked local changes " + $Context + ":") -ForegroundColor Yellow
    $changed | ForEach-Object { Write-Host ("  " + $_) }
    Write-Host "This repository may be public. Review the files before uploading." -ForegroundColor Yellow
    $choice = Read-Host "Commit these TRACKED changes to develop for synchronization? [y/N]"
    if ($choice -notmatch '^(y|yes)$') { throw "Local changes left untouched; sync paused to prevent data loss." }
    Invoke-GitCommand -GitArguments @("add","-u")
    Invoke-GitCommand -GitArguments @("commit","-m","Save reviewed local portfolio changes before syncing develop")
}

try {
    Write-Host "=========================================================" -ForegroundColor Cyan
    Write-Host " PORTFOLIO | SYNC DEVELOP + BUILD APPLICATIONS" -ForegroundColor Cyan
    Write-Host "=========================================================" -ForegroundColor Cyan
    Write-Step ("Repository: " + $repo)
    if (-not (Test-Path (Join-Path $repo ".git"))) { throw "Move this launcher to the root of the cloned portfolio repository." }
    if (-not (Get-Command git.exe -ErrorAction SilentlyContinue)) { throw "Git for Windows (git.exe) was not found on PATH." }

    Write-Step "1/5 Preparing the develop branch..."
    $branch = Get-GitText -GitArguments @("branch","--show-current")
    Write-Step ("Current branch: " + $branch)
    if ($branch -ne "develop") {
        if (@(Get-TrackedEdits).Count -gt 0) {
            throw "Tracked edits exist on '$branch'. Commit/stash them manually before switching to develop."
        }
        # git switch will refuse if untracked files would be overwritten.
        Invoke-GitCommand -GitArguments @("switch","develop")
    }

    $untracked = @(& git.exe -C $repo ls-files --others --exclude-standard)
    if ($LASTEXITCODE -ne 0) { throw "Cannot inspect untracked files." }
    if ($untracked.Count -gt 0 -and ($untracked -join "").Trim()) {
        Write-Host ("NOTE: " + $untracked.Count + " untracked file(s) will NOT be automatically uploaded.") -ForegroundColor Yellow
        $untracked | Select-Object -First 8 | ForEach-Object { Write-Host ("  " + $_) }
    }

    Offer-TrackedCommit "before updating"
    Write-Step "2/5 Synchronizing local develop with origin/develop..."
    Invoke-GitCommand -GitArguments @("fetch","origin","develop")
    $localBefore = Get-GitText -GitArguments @("rev-parse","HEAD")
    $remoteBefore = Get-GitText -GitArguments @("rev-parse","origin/develop")
    if ($localBefore -eq $remoteBefore) {
        Write-Step "Already up to date; no incoming commits."
    } else {
        # Rebase local commits onto develop. Does not discard, reset or force-push.
        Invoke-GitCommand -GitArguments @("pull","--rebase","origin","develop")
        Write-Step "Pull/rebase completed."
    }
    Invoke-GitCommand -GitArguments @("push","origin","develop")
    $localAfter = Get-GitText -GitArguments @("rev-parse","HEAD")
    $remoteAfter = Get-GitText -GitArguments @("rev-parse","origin/develop")
    Write-Step "Local commits pushed to origin/develop (or already up to date)."
    Write-Step ("Local HEAD: " + $localAfter.Substring(0,8))
    if ($localAfter -ne $remoteAfter) {
        Write-Step "Remote-tracking metadata may not reflect the completed push until the next fetch."
    }

    Write-Step "3/5 Selecting faculty or industry application..."
    $available = @($applicationRoots | ForEach-Object { Get-ChildItem -Path $_ -Directory -ErrorAction SilentlyContinue } | Where-Object {
        Test-Path (Join-Path $_.FullName "build_documents.py")
    } | Sort-Object Name)
    if ($available.Count -eq 0) { throw "No application build scripts found." }
    if ([string]::IsNullOrWhiteSpace($Application)) {
        Write-Host "Choose an application, or press ENTER for Rowan:"
        for ($i=0; $i -lt $available.Count; $i++) {
            $tag = if ($available[$i].Name -eq $default) { " (default)" } else { "" }
            Write-Host ("  [{0}] {1}{2}" -f ($i+1),$available[$i].Name,$tag)
        }
        $choice = Read-Host "Application number or name [Enter=Rowan]"
        if ([string]::IsNullOrWhiteSpace($choice)) {
            $Application = $default
        } elseif ($choice -match '^\d+$' -and [int]$choice -ge 1 -and [int]$choice -le $available.Count) {
            $Application = $available[[int]$choice-1].Name
        } else {
            $Application = $choice.Trim()
        }
    }
    if ($Application -notmatch '^[a-z0-9-]+$') { throw "Invalid application folder name." }
    $matching = @($available | Where-Object { $_.Name -eq $Application })
    if ($matching.Count -ne 1) { throw ("Application folder missing or ambiguous: " + $Application) }
    $folder = $matching[0].FullName
    $builder = Join-Path $folder "build_documents.py"
    if (-not (Test-Path $builder)) { throw ("No build script for " + $Application) }
    Write-Step ("Selected: " + $Application)

    Write-Step "4/5 Checking local tools..."
    $python = Get-Command python.exe -ErrorAction SilentlyContinue
    $node = Get-Command node.exe -ErrorAction SilentlyContinue
    $tex = Get-Command pdflatex.exe -ErrorAction SilentlyContinue
    if (-not $python -or -not $node -or -not $tex) {
        Write-Host "Local build skipped: Python, Node.js and pdflatex must be installed." -ForegroundColor Yellow
        Write-Host "The GitHub submission-ready files are still available after the pull." -ForegroundColor Yellow
    } else {
        & $python.Source -c "import docx, reportlab, pypdf"
        if ($LASTEXITCODE -ne 0) {
            Write-Step "Installing Python PDF/Word requirements..."
            & $python.Source -m pip install -r (Join-Path $repo "resume\requirements.txt")
            if ($LASTEXITCODE -ne 0) { throw "Python dependencies failed to install." }
        }
        Write-Step "5/5 Building documents..."
        & $python.Source $builder
        if ($LASTEXITCODE -ne 0) {
            throw "Document build failed; the committed submission-ready files remain available."
        }
        Write-Step "Document build finished successfully."
    }

    $ready = Join-Path $folder "submission-ready"
    if (Test-Path $ready) {
        $outputs = @(Get-ChildItem $ready -File | Where-Object { $_.Extension -in @(".pdf",".docx") })
        Write-Host ""
        Write-Host ("READY: " + $outputs.Count + " PDF/Word file(s)") -ForegroundColor Green
        $outputs | ForEach-Object { Write-Host ("  " + $_.Name) }
        Start-Process explorer.exe -ArgumentList ('"' + $ready + '"')
    } else {
        Write-Host "No submission-ready folder found for selected application." -ForegroundColor Yellow
    }

    # Optional outbound sync for files generated by the local builder.
    $postChanges = @(Get-TrackedEdits)
    if ($postChanges.Count -gt 0) {
        Write-Host ""
        Write-Host "The build modified tracked repository files:" -ForegroundColor Yellow
        $postChanges | ForEach-Object { Write-Host ("  " + $_) }
        $answer = Read-Host "Commit and push these TRACKED files to develop? [y/N]"
        if ($answer -match '^(y|yes)$') {
            Invoke-GitCommand -GitArguments @("add","-u")
            Invoke-GitCommand -GitArguments @("commit","-m","Update reviewed locally built faculty application files")
            Invoke-GitCommand -GitArguments @("pull","--rebase","origin","develop")
            Invoke-GitCommand -GitArguments @("push","origin","develop")
            Write-Step "Local generated changes pushed to develop."
        } else {
            Write-Step "Generated edits kept locally, not uploaded."
        }
    }
    Write-Host ""
    Write-Host "DONE: develop synchronization and application review completed." -ForegroundColor Green
} catch {
    Write-Host ""
    Write-Host ("ERROR: " + $_.Exception.Message) -ForegroundColor Red
    Write-Host "No force-push, reset, or automatic untracked-file upload was performed." -ForegroundColor Yellow
    exit 1
} finally {
    Write-Step ("Finished at " + (Get-Date -Format 'HH:mm:ss'))
}
