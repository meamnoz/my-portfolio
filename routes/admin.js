const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Middleware for checking if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/admin/login');
};

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// --- Login Routes ---
router.get('/login', (req, res) => {
    res.render('admin/login', { error: null });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user.id;
        res.redirect('/admin/posts');
    } else {
        res.render('admin/login', { error: 'Invalid email or password.' });
    }
});

// --- Logout Route ---
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/admin/login');
    });
});

// --- Dashboard / Posts List ---
router.get('/', isAuthenticated, (req, res) => res.redirect('/admin/posts'));

router.get('/posts', isAuthenticated, async (req, res) => {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: { author: true }
    });
    res.render('admin/posts', { posts });
});

// --- Create/Edit Post Routes ---
router.get('/posts/new', isAuthenticated, async (req, res) => {
    const categories = await prisma.category.findMany();
    res.render('admin/editor', { post: null, categories, pageTitle: 'New Post', marked: require('marked') });
});

router.get('/posts/edit/:id', isAuthenticated, async (req, res) => {
    const post = await prisma.post.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { categories: { include: { category: true } } }
    });
    if (post && post.sources) {
        try {
            post.sources = JSON.parse(post.sources);
        } catch (e) {
            post.sources = [];
        }
    }
    const categories = await prisma.category.findMany();
    res.render('admin/editor', { post, categories, pageTitle: 'Edit Post', marked: require('marked') });
});

// Handle Post Creation
router.post('/posts', isAuthenticated, upload.single('coverImage'), async (req, res) => {
    const { title, slug, excerpt, body, status, categories, source_labels, source_urls } = req.body;
    const coverImageUrl = req.file ? `/public/uploads/${req.file.filename}` : null;
    
    const categoryConnect = (Array.isArray(categories) ? categories : [categories])
        .filter(Boolean)
        .map(catId => ({ categoryId: parseInt(catId) }));

    const sources = source_labels && source_urls ? source_labels
        .map((label, index) => ({ label, url: source_urls[index] }))
        .filter(source => source.label && source.url) : [];

    await prisma.post.create({
        data: {
            title, slug, excerpt, body, status, coverImageUrl,
            sources: JSON.stringify(sources),
            authorId: req.session.userId,
            publishedAt: status === 'published' ? new Date() : null,
            categories: { create: categoryConnect },
        },
    });
    res.redirect('/admin/posts');
});

// Handle Post Update
router.post('/posts/edit/:id', isAuthenticated, upload.single('coverImage'), async (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, slug, excerpt, body, status, categories, source_labels, source_urls } = req.body;
    
    const sources = source_labels && source_urls ? source_labels
        .map((label, index) => ({ label, url: source_urls[index] }))
        .filter(source => source.label && source.url) : [];

    let dataToUpdate = {
        title, slug, excerpt, body, status,
        sources: JSON.stringify(sources),
        publishedAt: status === 'published' ? new Date() : null,
    };

    if (req.file) {
        dataToUpdate.coverImageUrl = `/public/uploads/${req.file.filename}`;
    }

    const categoryConnect = (Array.isArray(categories) ? categories : [categories])
        .filter(Boolean)
        .map(catId => ({ categoryId: parseInt(catId) }));

    await prisma.post.update({
        where: { id: postId },
        data: {
            ...dataToUpdate,
            categories: {
                deleteMany: {},
                create: categoryConnect,
            },
        },
    });
    res.redirect('/admin/posts');
});

// Handle Post Deletion
router.post('/posts/delete/:id', isAuthenticated, async (req, res) => {
    await prisma.post.delete({ where: { id: parseInt(req.params.id) } });
    res.redirect('/admin/posts');
});

// --- Category Routes ---
router.get('/categories', isAuthenticated, async (req, res) => {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    res.render('admin/categories', { categories });
});

router.post('/categories', isAuthenticated, async (req, res) => {
    const { name, slug } = req.body;
    await prisma.category.create({ data: { name, slug } });
    res.redirect('/admin/categories');
});

router.post('/categories/delete/:id', isAuthenticated, async (req, res) => {
    await prisma.category.delete({ where: { id: parseInt(req.params.id) } });
    res.redirect('/admin/categories');
});

module.exports = router;