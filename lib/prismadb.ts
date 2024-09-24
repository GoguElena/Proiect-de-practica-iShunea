import {PrismaClient} from "@prisma/client";

declare global{
    var prsma:PrismaClient|undefined
};
const prismadb= globalThis.prisma || new PrismaClient();
if(process.env.NODE_ENW !== "production") globalThis.prisma= prismadb;

export default prismadb;