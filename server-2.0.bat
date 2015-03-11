@ECHO OFF
CLS
ECHO Choose your server to start
ECHO 1. Php server
ECHO 2. Python server
ECHO.

CHOICE /C 12 /M "Enter your choice:"

:: Note - list ERRORLEVELS in decreasing order
IF ERRORLEVEL 2 GOTO PYTHON
IF ERRORLEVEL 1 GOTO PHP

:PHP
ECHO Starting php server for this folder on port 8080
php -S localhost:8080 -t .
GOTO End

:PYTHON
ECHO Starting simple python server for this folder on port 8080
py -m http.server 8080
GOTO End


:End
