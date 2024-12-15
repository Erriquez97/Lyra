# Use an official JDK image
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the Spring Boot jar file
COPY target/lyra_BE-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
