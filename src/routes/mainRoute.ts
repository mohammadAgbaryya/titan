import Router from 'koa-router';
import { fetchPixabayImages } from '../services/pixabayService';

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

export default router;
