@echo off
echo ============================================
echo LIMPIEZA COMPLETA DE CACHE DE VSCODE
echo ============================================
echo.
echo Este script eliminara todos los caches
echo que pueden causar errores falsos.
echo.
pause

cd /d "%~dp0"

echo Eliminando cache de node_modules...
rmdir /s /q node_modules\.cache 2>nul

echo Eliminando .eslintcache...
del /q .eslintcache 2>nul

echo Eliminando cache de TypeScript...
rmdir /s /q node_modules\.tsbuildinfo 2>nul

echo.
echo ============================================
echo LIMPIEZA COMPLETADA
echo ============================================
echo.
echo POR FAVOR:
echo 1. CIERRA VSCode COMPLETAMENTE
echo 2. VUELVE A ABRIR EL PROYECTO
echo.
echo Los errores deberian haber desaparecido.
echo.
pause
