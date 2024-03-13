FROM openjdk:17-jdk-alpine
EXPOSE 8080
ADD /target/todo_app.jar todo_app.jar 
ENTRYPOINT ["java", "-jar", "/todo_app.jar"]
