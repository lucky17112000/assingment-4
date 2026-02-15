import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { categoryRoute } from "./modules/category/category.route";
import { tutorProfileRoute } from "./modules/tutorProfile/tutorProfile.route";
import { bookingRoute } from "./modules/booking/booking.route";
import { reviewRoute } from "./modules/reviwe/review.route";

const app = express();

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:4000", //clientsite url
    credentials: true,
  }),
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use("/api/tutors", tutorProfileRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/reviews", reviewRoute);

export default app;
