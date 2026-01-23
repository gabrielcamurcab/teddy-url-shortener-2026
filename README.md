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

   **Generate JWT Keys (Base64):**

   To properly secure the application, generate a new pair of RSA keys in Base64 format.

   **Linux / macOS:**

   ```bash
   # Generate keys
   openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048
   openssl rsa -pubout -in private.pem -out public.pem

   # Print Base64 values
   echo "JWT_PRIVATE_KEY=$(base64 -w 0 private.pem)"
   echo "JWT_PUBLIC_KEY=$(base64 -w 0 public.pem)"

   # Cleanup
   rm private.pem public.pem
   ```

   **Windows (PowerShell):**

   ```powershell
   node -e "const { generateKeyPairSync } = require('crypto'); const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048, publicKeyEncoding: { type: 'spki', format: 'pem' }, privateKeyEncoding: { type: 'pkcs8', format: 'pem' } }); console.log('JWT_PRIVATE_KEY=' + Buffer.from(privateKey).toString('base64')); console.log('JWT_PUBLIC_KEY=' + Buffer.from(publicKey).toString('base64'));"
   ```

**Copy the generated keys to the .env file**

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
