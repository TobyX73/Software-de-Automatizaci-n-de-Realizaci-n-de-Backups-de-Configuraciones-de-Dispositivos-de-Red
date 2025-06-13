FROM amazoncorretto:17-alpine-jdk

COPY target/BackupApi-1.0-SNAPSHOT.jar /app/BackupApi.jar

ENTRYPOINT ["java", "-jar", "/app/BackupApi.jar"]