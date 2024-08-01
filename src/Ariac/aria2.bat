@echo off

REM Caminho para o executável aria2c
set ARIA2_PATH=C:\aria2-1.37.0-win-64bit-build1\aria2-1.37.0-win-64bit-build1/aria2c


REM Iniciar o Aria2
%ARIA2_PATH% --enable-rpc --rpc-listen-all=true --rpc-allow-origin-all

pause
