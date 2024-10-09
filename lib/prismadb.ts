
import { PrismaClient } from "@prisma/client";

declare global {
    let prisma: PrismaClient | undefined; // Use var for mutable global variables
}

const prismadb = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production")
    globalThis.prisma = prismadb;

export default prismadb;
