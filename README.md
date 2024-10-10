# Full Stack Titan Assignment

A Node.js application built with Koa, TypeScript, and PostgreSQL to fetch photo URLs from the Pixabay API, handle rate limits with caching, and create/retrieve orders associated with users in the PostgreSQL database.

## Prerequisites

- Node.js
- PostgreSQL
  - Ensure that PostgreSQL is running with either the default database (`postgres`) or create a new one. If you create a new database, update the `.env` file accordingly with the new database name.

## Clone the Repository

```
git clone https://github.com/mohammadAgbaryya/titan.git
cd titan
```

## .env File

Create a `.env` file in the root directory with the following content:

```
DB_USER=your_pg_user      # PostgreSQL username (e.g., your macOS username)
DB_HOST=localhost         # Database host (use 'localhost' for local development)
DB_DATABASE=postgres      # Default database name (change if needed)
DB_PASSWORD=              # Leave blank if no password
DB_PORT=5432              # Default PostgreSQL port
SERVER_PORT=3000          # Port for the Koa server
```

## Install and run

```
npm install
npm run watch
```

## API Endpoints Examples

```
GET http://localhost:3000/photos/5

POST http://localhost:3000/orders

GET http://localhost:3000/orders/userId
```