import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { tutorProfileController } from "./modules/tutorProfile.controller";

const app = express();

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:4000", //clientsite url
    credentials: true,
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use("/tutors", tutorProfileController.createTutorProfile);
export default app;
