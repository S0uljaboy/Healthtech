@echo off
echo =========================================================
echo HealthTech SaaS - Inicializacao Automatica (Sprint 5/6)
echo =========================================================

echo Iniciando o banco de dados (Prisma Push)...
cd packages\database
call npx prisma db push
cd ..\..

echo Instalando possiveis novas dependencias...
call pnpm install

echo Iniciando API (NestJS)...
start "HealthTech API" cmd /c "cd apps\api && pnpm run start:dev"

echo Aguardando 5 segundos para a API subir...
timeout /t 5 /nobreak

echo Iniciando Web App (Next.js)...
start "HealthTech WEB" cmd /c "cd apps\web && pnpm run dev"

echo Tudo rodando! Pode abrir seu navegador em http://localhost:3000
pause
