# Jdroid-X Satellite Launcher (V11.5)
# This script bypasses all browser manual hurdles and launches the Automation Bridge.

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "   JDROID-X SATELLITE LAUNCHER (V11.5)           " -ForegroundColor Cyan
Write-Host "   ZERO-TOUCH AUTOMATION & LIVE SYNC             " -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

# 1. Check for Node.js
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Error: Node.js is not installed. Please install it from nodejs.org" -ForegroundColor Red
    Pause
    exit
}

# 2. Check for dependencies
if (!(Test-Path "node_modules")) {
    Write-Host "📡 First time setup: Installing Automation Engine (Playwright)..." -ForegroundColor Yellow
    npm.cmd install playwright
    npx.cmd playwright install chromium
}

# 3. Launch the Bridge
Write-Host "🚀 Launching Jdroid-X System Web Payload..." -ForegroundColor Green
node jSystemWebPayload.js

Pause
