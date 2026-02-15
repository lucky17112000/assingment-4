import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = express();
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:5000", //clientsite url
    credentials: true,
  })
);
app.use(express.json());
export default app;
