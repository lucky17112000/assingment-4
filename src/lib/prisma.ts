import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const rawConnectionString = process.env.DATABASE_URL || "";

if (!rawConnectionString) {
  throw new Error("DATABASE_URL is not set");
}

const ensureSslMode = (url: string) => {
  if (url.includes("sslmode=")) {
    return url;
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}sslmode=verify-full`;
};

const connectionString = ensureSslMode(rawConnectionString);

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
