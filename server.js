const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// تنظیم موتور EJS برای رندر صفحات
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware ها
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname))); // برای دسترسی به index.html و فایل‌های عمومی
app.use('/public', express.static(path.join(__dirname, 'public'))); // پوشه عمومی برای CSS و عکس

// تنظیمات نشست (Session)
app.use(session({
    secret: process.env.SESSION_SECRET || 'a-very-strong-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 1000 * 60 * 60 * 24 } // 1 روز
}));

// روت‌های برنامه
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

// روت اصلی برای نمایش index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});