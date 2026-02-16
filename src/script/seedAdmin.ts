import { email } from "better-auth";
import { prisma } from "../lib/prisma";
import { UserRole } from "../modules/tutorProfile/tutorProfile.route";

async function seedadmin() {
  try {
    //cheak user exist or not
    const adminData = {
      name: "Asaduzzaman Alamin",
      email: process.env.ADMIN_EMAIL || "",
      password: process.env.ADMIN_PASSWORD || "",
      role: UserRole.Admin,
      emailVerified: true,
    };
    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });
    if (existingUser) {
      throw new Error("Admin user already exists");
    }
    const signUpAdmin = await fetch(
      "http://localhost:4000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:4000",
        },
        body: JSON.stringify(adminData),
      },
    );
    console.log(signUpAdmin);
    if (signUpAdmin.ok) {
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
}
// seedadmin();
