@echo off
cd /d "%~dp0"
echo Eliminando cache de ESLint...
del /q node_modules\.cache\*.eslint* 2>nul
del /q node_modules\.cache\.eslintcache 2>nul
echo Cache eliminado.
echo.
echo Por favor:
echo 1. Cierra VSCode completamente
echo 2. Vuelve a abrir el proyecto
echo Los errores deberian desaparecer.
pause
