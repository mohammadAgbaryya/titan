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

GET http://localhost:3000/orders/mohammad
```

## Orders POST body

```
{
  "email": "moha@example.com",
  "full_name": "moha agba",
  "full_address": "123 Main St, Anytown, USA",
  "images_urls": [
    "https://pixabay.com/get/photo1.jpg",
    "https://pixabay.com/get/photo2.jpg",
    "https://pixabay.com/get/photo3.jpg"
  ],
  "frame_color": "black",
  "user_id": "moha123"
}
```

## Future Improvements and Refactoring

If I had more time, I would clean and improve the codebase by implementing the following enhancements:

- **Separation of Concerns**:
  - Move business logic to dedicated service and utility layers, keeping the route handlers focused only on routing and request/response management.
- **Validation**:

  - Add validation checks for request data (e.g., validating emails, required fields).

- **Logging**:

  - Add structured logging throughout the application to track errors, requests, and performance.

- **Metrics and Monitoring**:

  - Integrate metrics and monitoring tools for tracking performance, errors, and usage.

- **Unit Testing**:

  - Implement unit tests for core business logic and edge cases.

- **Code Formatting and Development Standards**:
  - Add tools like **Prettier** and **ESLint** to enforce consistent code formatting and coding styles across the development team.
  - Use **Husky** for pre-commit hooks to ensure linting, formatting, and tests are run before any code is pushed.
