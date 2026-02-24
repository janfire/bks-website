const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
        console.error('ADMIN_USERNAME or ADMIN_PASSWORD not found in environment variables.');
        return;
    }

    const existingAdmin = await prisma.admin.findUnique({
        where: { username },
    });

    if (!existingAdmin) {
        console.log(`Creating initial admin user: ${username}`);
        const hashedPassword = await hash(password, 12);
        await prisma.admin.create({
            data: {
                username,
                password: hashedPassword,
            },
        });
        console.log('Admin user created successfully.');
    } else {
        console.log('Admin user already exists.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
