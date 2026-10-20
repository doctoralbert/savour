@echo off
setlocal
cd /d "%~dp0"
title Savour 3.0 - Local Server

if not exist "local-server.mjs" (
  echo.
  echo FOUT: local-server.mjs niet gevonden.
  echo Controleer of je de volledige Savour-map hebt uitgepakt.
  echo.
  pause
  exit /b 1
)

if not exist "C:\Program Files\nodejs\node.exe" (
  where node >nul 2>nul
  if errorlevel 1 (
    echo.
    echo FOUT: Node.js is niet gevonden.
    echo Installeer Node.js LTS en probeer opnieuw.
    echo.
    pause
    exit /b 1
  )
  set "NODE_CMD=node"
) else (
  set "NODE_CMD=C:\Program Files\nodejs\node.exe"
)

echo ========================================
echo              SAVOUR 3.0
echo          Lokale testomgeving
echo ========================================
echo.
echo Map: %CD%
echo.
echo Node.js wordt gestart...
echo.

rem Open de browser kort nadat de server gestart is.
start "Savour browser" cmd /c "timeout /t 1 /nobreak >nul & start "" http://localhost:3000"

"%NODE_CMD%" local-server.mjs

 echo.
echo ========================================
echo De Savour-server is gestopt.
echo ========================================
echo.
pause
