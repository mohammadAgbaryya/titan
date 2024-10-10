import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routes/mainRoute';

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

// Use the router
app.use(router.routes()).use(router.allowedMethods());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Photos example route: http://localhost:${PORT}/photos/3`);
});
