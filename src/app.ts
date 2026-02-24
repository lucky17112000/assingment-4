import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { categoryRoute } from "./modules/category/category.route";
import { tutorProfileRoute } from "./modules/tutorProfile/tutorProfile.route";
import { bookingRoute } from "./modules/booking/booking.route";
import { reviewRoute } from "./modules/reviwe/review.route";
import { userManageRouter } from "./modules/admin/userManage/usermanage.route";
import { bookingManageRouter } from "./modules/admin/bookingManage/bookingManageRouter";

const app: Application = express();
const allowedOrigins = [
  process.env.APP_URL || "http://localhost:4000",
  process.env.PROD_APP_URL, // Production frontend URL
  "http://localhost:3000",
  "http://localhost:4000",
  "http://localhost:5000",
].filter(Boolean); // Remove undefined values

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches Vercel preview pattern
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Tutor Booking API is running" });
});

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/tutors", tutorProfileRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/reviews", reviewRoute);
app.use("/admin", userManageRouter);
app.use("/api/admin/bookings", bookingManageRouter);

export default app;
