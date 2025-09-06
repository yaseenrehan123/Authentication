import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

main()
    .then(() => console.log('Database seeded!'))
    .catch((e: Error) => console.error(e.message))
    .finally(() => prisma.$disconnect())

async function main() {
    await prisma.user.deleteMany();
    await prisma.user.createMany({
        data: [
            {
                username: 'Yaseen',
                email: 'yaseenrahan@gmail.com',
                password: 'efgh'
            },
        ]
    });
}