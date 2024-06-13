FROM openjdk:17-jdk
VOLUME /tmp
COPY build/libs/CarpetAndBeer-0.0.1-SNAPSHOT.jar app.jar
CMD ["sh","-c","java -jar app.jar"]