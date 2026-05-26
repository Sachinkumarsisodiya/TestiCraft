import { PrismaClient } from "@prisma/client";

// Graceful fallback and validation for DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.warn("⚠️  WARNING: DATABASE_URL is missing in the environment.");
  console.warn("⚠️  TestiCraft Prisma Client may fail to connect if a query is executed.");
}

if (process.env.NODE_ENV !== "production") {
  if (!global.prismaGlobal) {
    global.prismaGlobal = new PrismaClient();
  }
}

const prisma = global.prismaGlobal ?? new PrismaClient();

export default prisma;
