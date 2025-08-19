const express = require('express');
// *** FIX: Import the single, shared Prisma Client instance ***
const prisma = require('../prisma/client');

const router = express.Router();

// GET published posts with optional category filter
router.get('/posts', async (req, res) => {
    const { category, limit = 3 } = req.query;
    let where = { status: 'published' };

    if (category) {
        where.categories = {
            some: {
                category: {
                    slug: category
                }
            }
        };
    }

    try {
        const posts = await prisma.post.findMany({
            where,
            take: parseInt(limit),
            orderBy: { publishedAt: 'desc' },
            include: {
                categories: { include: { category: true } }
            }
        });
        res.json(posts);
    } catch (error) {
        console.error("API /posts error:", error);
        res.status(500).json({ error: "Failed to fetch posts." });
    }
});

// GET all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
        res.json(categories);
    } catch (error) {
        console.error("API /categories error:", error);
        res.status(500).json({ error: "Failed to fetch categories." });
    }
});

module.exports = router;
