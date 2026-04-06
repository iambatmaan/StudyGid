@echo off
cd /d "%~dp0"
title Studygid
echo.
echo  Studygid serveri ishga tushirilmoqda...
echo  "Running on" ko'rinsa, brauzerda oching:
echo.
echo     http://127.0.0.1:5000
echo.
echo  Serverni to'xtatish: bu oynani yoping yoki Ctrl+C bosing.
echo.
set PY=python
if exist "venv\Scripts\python.exe" set PY=venv\Scripts\python.exe

%PY% app.py
if errorlevel 1 (
  echo.
  echo  Agar "python is not recognized" chiqsa, python.org dan Python o'rnating
  echo  Keyin:  pip install -r requirements.txt
  echo.
  pause
)
