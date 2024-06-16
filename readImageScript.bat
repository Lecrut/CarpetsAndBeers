@echo off
:: Step 1: Remove container
docker rm -f EBiznesServer
:: Step 1: Remove the existing Docker image
docker rmi server-to-login-e-biznes

:: Step 2: Read docker image from tar file
docker load --input server.tar

:: Step 3: Run the Docker image on port 8080
docker run -d -p 8080:8080 --name EBiznesServer -t server-to-login-e-biznes
