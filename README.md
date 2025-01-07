# Ticket Management Platform

## Overview

This project is a web platform designed for users to submit tickets related to various purposes such as requesting information, reporting issues, or any other queries. The platform differentiates between two types of entities: Admin and Ticket Manager, each with distinct roles and responsibilities.

## Features

### Admin Features:
- **Create Projects**: Admins can create new projects for users to submit tickets.
- **Manage Users**: Admins have the ability to create, edit, and manage users.
- **View Reports and Graphs**: Admins can access various reports and graphical representations of ticket statuses, including opened and resolved tickets.

### Ticket Manager Features:
- **View Tickets**: Ticket Managers can view all the tickets assigned to them.
- **Resolve Tickets**: Ticket Managers can solve tickets and update the status to indicate resolution.

## Technology Stack

### Frontend:
- **Angular**: The frontend is built using Angular, providing a dynamic and responsive user interface.

### Backend:
- **Spring Boot**: The backend is developed with Spring Boot, ensuring robust and scalable server-side operations.

### Database:
- **MySQL**: Used to store user-related information.
- **Elasticsearch**: Utilized for storing and querying report information efficiently.

## Prerequisites

- **Docker**: Ensure Docker is installed on your system.
- **Docker Compose**: Make sure Docker Compose is installed and properly configured.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Erriquez97/Lyra.git
   cd Lyra
   ```

2. Run the application using Docker Compose:
   ```bash
   docker-compose up
   ```

   This command will start all the necessary services, including the Angular frontend, Spring Boot backend, MySQL database, and Elasticsearch.

## Usage

### Accessing the Platform:
- Once the services are running, open a web browser and navigate to `http://localhost:4200` to access the frontend.

### Admin Login:
- Admins can log in to manage projects, users, and view detailed reports on ticket activities.

### Ticket Manager Login:
- Ticket Managers can log in to view and resolve tickets assigned to them.
