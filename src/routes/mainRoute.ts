import Router from 'koa-router';
import { fetchPixabayImages } from '../services/pixabayService';
import { query } from '../db';
import Order from '../models/Order';

const router = new Router();

// Route to fetch image URLs
router.get('/photos/:num', async (ctx) => {
    const num = parseInt(ctx.params.num);
    if (isNaN(num) || num <= 0) {
        ctx.status = 400;
        ctx.body = { error: 'Invalid number of images requested' };
        return;
    }

    const imageUrls = await fetchPixabayImages(num);
    if (imageUrls.length > 0) {
        ctx.body = { images: imageUrls };
    } else {
        ctx.status = 500;
        ctx.body = { error: 'Failed to fetch images' };
    }
});

// Route to save orders
router.post('/orders', async (ctx) => {
    const body = ctx.request.body as Order;
    const { email, full_name, full_address, images_urls, frame_color, user_id } = body;

    if (!email || !full_name || !full_address || !images_urls || !frame_color || !user_id) {
        ctx.status = 400;
        ctx.body = { error: 'Missing required fields' };
        return;
    }

    try {
        const result = await query(
            `INSERT INTO orders (email, full_name, full_address, images_urls, frame_color, user_id) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [email, full_name, full_address, images_urls, frame_color, user_id]
        );

        ctx.body = result.rows[0]; // Return the created order
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Failed to create order' };
        console.error('Error inserting order:', error);
    }
});

// Route to get all orders for a specific user
router.get('/orders/:userId', async (ctx) => {
    const { userId } = ctx.params;

    if (!userId) {
        ctx.status = 400;
        ctx.body = { error: 'User ID is required' };
        return;
    }

    try {
        const result = await query(
            'SELECT * FROM orders WHERE user_id = $1',
            [userId]
        );

        if (result.rows.length > 0) {
            ctx.body = result.rows;
        } else {
            ctx.status = 404;
            ctx.body = { message: 'No orders found for this user' };
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Failed to fetch orders' };
        console.error('Error fetching orders:', error);
    }
});

export default router;
