FROM openjdk:8-jdk-alpine
ARG JAR_FILE=target/*.war
COPY ${JAR_FILE} app.war
ENTRYPOINT ["java", "-jar", "-Duser.timezone=Asia/Seoul", "/app.war"]