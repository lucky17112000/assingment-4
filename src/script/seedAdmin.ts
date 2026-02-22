import { prisma } from "../lib/prisma";
import { auth } from "../lib/auth";

async function seedadmin() {
  try {
    const email = process.env.ADMIN_EMAIL || "";
    const password = process.env.ADMIN_PASSWORD || "";

    if (!email || !password) {
      throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
    }

    // Check if admin already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.log("Admin user already exists:", email);
      return;
    }

    // Use better-auth internal API — no running server needed
    const result = await auth.api.signUpEmail({
      body: {
        name: "Asaduzzaman Alamin",
        email,
        password,
      },
    });

    if (!result?.user) {
      throw new Error("Failed to create admin user");
    }

    // Set role to Admin and mark email as verified via Prisma
    await prisma.user.update({
      where: { email },
      data: { role: "Admin", emailVerified: true },
    });

    console.log("Admin user seeded successfully:", email);
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
}
seedadmin();
