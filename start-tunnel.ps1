$misoDir = "C:\Users\Admin\Projects\workspace\src\miso"
$logFile = "$misoDir\cloudflared.log"
$nextLog = "$misoDir\nextjs.log"

# Stop any previous cloudflared or node on 3000
Get-Process -Name "cloudflared" -ErrorAction SilentlyContinue | Stop-Process -Force

# Start Next.js server
Start-Process -FilePath "cmd.exe" -ArgumentList "/c pnpm start" -WorkingDirectory $misoDir -RedirectStandardOutput $nextLog -RedirectStandardError "$misoDir\next-err.log" -WindowStyle Hidden

# Wait for port 3000
$started = $false
for ($i = 0; $i -lt 15; $i++) {
    Start-Sleep -Seconds 1
    $conn = Test-NetConnection -ComputerName 127.0.0.1 -Port 3000 -InformationLevel Quiet
    if ($conn) {
        $started = $true
        break
    }
}

if (-not $started) {
    Write-Output "Next.js failed to start on port 3000. Checking error log:"
    Get-Content "$misoDir\next-err.log" -Tail 20
    exit 1
}

Write-Output "Next.js is up on http://localhost:3000"

# Remove old cloudflared log
if (Test-Path $logFile) { Remove-Item $logFile -Force }

# Launch Cloudflared
Start-Process -FilePath "C:\Program Files (x86)\cloudflared\cloudflared.exe" -ArgumentList "tunnel --url http://localhost:3000" -RedirectStandardError $logFile -WindowStyle Hidden

# Poll for trycloudflare URL
$found = $false
for ($i = 0; $i -lt 20; $i++) {
    Start-Sleep -Seconds 1
    if (Test-Path $logFile) {
        $content = Get-Content $logFile -Raw
        if ($content -match 'https://[a-zA-Z0-9-]+\.trycloudflare\.com') {
            Write-Output "TUNNEL_URL: $($matches[0])"
            $found = $true
            break
        }
    }
}

if (-not $found) {
    Write-Output "Cloudflared logs:"
    Get-Content $logFile -Tail 20
}
