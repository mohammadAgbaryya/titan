import Koa from 'koa';
import dotenv from 'dotenv';
import bodyParser from 'koa-bodyparser';
import router from './routes/mainRoute';
import { createOrdersTable } from './db';

// Load environment variables
dotenv.config();

const app = new Koa();

// Middleware for parsing request body
app.use(bodyParser());

// Add the error-handling middleware at the top
app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.status = 404;
      ctx.body = { error: 'Resource not found' };
    }
  } catch (err: any) {
    console.error('Unhandled error:', err);
    ctx.status = err.status || 500;
    ctx.body = {
      error: 'Internal Server Error',
      message: err.message || 'Something went wrong!',
    };
    if (process.env.NODE_ENV === 'development') {
      ctx.body.stack = err.stack;
    }
  }
});

// Middleware for handling errors
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const error = err as Error;
    ctx.status = ctx.status || 500;
    ctx.body = { error: error.message };
  }
});

// Call the function to create the orders table if it doesn't exist
createOrdersTable();

// Use the router
app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
