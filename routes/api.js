const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
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

    const posts = await prisma.post.findMany({
        where,
        take: parseInt(limit),
        orderBy: { publishedAt: 'desc' },
        include: {
            categories: { include: { category: true } }
        }
    });
    res.json(posts);
});

// GET all categories
router.get('/categories', async (req, res) => {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    res.json(categories);
});

module.exports = router;