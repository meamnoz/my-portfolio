const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    // Create admin user
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin',
            password: hashedPassword,
        },
    });

    console.log({ admin });

    // Create sample categories
    const category1 = await prisma.category.upsert({
        where: { slug: 'ai-in-trade' },
        update: {},
        create: { name: 'AI in Trade', slug: 'ai-in-trade' }
    });

    const category2 = await prisma.category.upsert({
        where: { slug: 'market-analysis' },
        update: {},
        create: { name: 'Market Analysis', slug: 'market-analysis' }
    });
    
    console.log({ category1, category2 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });