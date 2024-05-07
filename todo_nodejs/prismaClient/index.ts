import { PrismaClient } from '@prisma/client';
const url = "mysql://root:Pramila@511@localhost:3306/todo"

const prisma = new PrismaClient({
    datasources: {
        db : {url}
    },
});

prisma.$connect();
export default prisma;