@echo off
echo Looking for MongoDB...

set "MONGO_PATH="

REM Check common locations
if exist "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" set "MONGO_PATH=C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
if exist "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" set "MONGO_PATH=C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
if exist "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" set "MONGO_PATH=C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe"
if exist "C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe" set "MONGO_PATH=C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe"
if exist "C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" set "MONGO_PATH=C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe"

if "%MONGO_PATH%"=="" (
    echo Could not automatically find MongoDB.
    echo Please ensure MongoDB is installed.
    echo.
    echo You can try starting it manually by finding 'mongod.exe' and running it.
) else (
    echo Found MongoDB at: %MONGO_PATH%
    echo Starting MongoDB...
    if not exist "C:\data\db" (
        echo Creating default data directory C:\data\db...
        mkdir "C:\data\db"
    )
    "%MONGO_PATH%" --dbpath="C:\data\db"
)

pause
