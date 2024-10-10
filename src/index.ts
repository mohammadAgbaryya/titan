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

// Middleware for handling errors
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        // Explicitly cast err to the Error type
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
