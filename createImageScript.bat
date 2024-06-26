@echo off
call buildScript.bat

del server.

docker rm -f EBiznesServer

REM Step 1: Remove the existing Docker image
docker rmi server-to-login-e-biznes

REM Step 2: Build the Docker image
docker build -t server-to-login-e-biznes .

REM Step 3: Save the Docker image to a tar file
docker save -o server.tar server-to-login-e-biznes

echo Docker image server-to-login-e-biznes has been built and saved to server.tar
