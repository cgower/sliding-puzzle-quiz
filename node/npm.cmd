@echo off
@SET PATH=%PATH%;%~dp0
node "%~dp0..\..\packages\NodeBin.5.2.0\npm-2.14.13\bin\npm-cli.js" %*
