# Teddy URL Shortener

A robust URL shortener API built with **NestJS**, **Prisma**, and **PostgreSQL**.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Documentation](#documentation)
- [License](#license)

## Features

- [x] Create shortened URLs
- [x] Update existing URLs
- [x] Delete URLs
- [x] Retrieve original URL by code (Redirect)
- [x] List all URLs (User specific)
- [x] User Authentication (JWT)
- [x] Swagger Documentation

## Prerequisites

- **Node.js**: (Version 20 or higher recommended)
- **Docker & Docker Compose**: For running the database

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/gabrielcamurcab/teddy-url-shortener-2026
```

2. **Configure Environment Variables**

   Create a `.env` file based on the example:

   ```bash
   cp .env.example .env
   ```

3. **Start the Database**

   Use Docker Compose to spin up the PostgreSQL database:

   ```bash
   docker compose up -d
   ```

4. **Install Dependencies**

   ```bash
   npm install
   ```

5. **Run Database Migrations**

   Apply the Prisma migrations to set up the schema:

   ```bash
   npx prisma migrate dev
   ```

## Running the App

Start the development server:

```bash
npm run start:dev
```

The application will be running at `http://localhost:3000`.

## Documentation

The API documentation is available via Swagger UI, providing an interactive interface to test the endpoints:

- **Swagger UI**: [http://localhost:3000/api](http://localhost:3000/api)

## License

This project is licensed under the [MIT License](LICENSE).
