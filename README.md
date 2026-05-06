# Tutor Booking Platform

**Where students find tutors — book a session, confirm the time, leave a review.**

[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express)](https://expressjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-4169E1?style=flat-square&logo=postgresql)](https://www.postgresql.org)
[![better-auth](https://img.shields.io/badge/Auth-better--auth-6C47FF?style=flat-square)](https://better-auth.com)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com)

---

## What is the Tutor Booking Platform?

Most tutoring apps are just directories. This platform is a **structured workflow** — tutors build profiles, students browse by category and price, bookings move through defined states, and reviews are only possible once a session is complete. Admins keep the platform clean by managing users and clearing stale data. The result is a reliable pipeline, not a free-for-all listing.

---

## The Life of a Booking

Every session on the platform takes this journey:

```
  STUDENT              PLATFORM              TUTOR               ADMIN
  ───────              ────────              ─────               ─────

  Browse tutors   →   Filter by          →  Tutor profile       Manage users
  (by category,       category,             visible publicly    Update status
   hourly rate,       hourly rate,          │                   Delete profiles
   availability)      search terms          │                   Remove cancelled
        │                                   │                   bookings
        ↓                                   │
  Create booking  →   PENDING           →   Confirm?
  (sessionDate,       (awaiting tutor        │
   startTime,          response)             ├─ CONFIRMED ──→  Session runs
   endTime,                                  │                  │
   tutorId)                                  └─ CANCELLED ──→  Booking closed
                                                                │
                                                           COMPLETED ──→ Review
```

Your dashboard (student or tutor) shows exactly where each booking sits in that pipeline.

---

## Who Uses the Platform?

| You are...           | What you can do                                                                 |
|---|---|
| **A visitor**        | Browse tutor profiles, read bios, see hourly rates and categories               |
| **A student**        | Register, create bookings, manage your session history, leave reviews           |
| **A tutor**          | Register, create and update your profile, manage incoming bookings              |
| **An admin**         | Manage all users (activate/deactivate/delete), clear cancelled bookings         |

Role separation is enforced server-side — every protected route validates the session and checks the role via middleware before any business logic runs.

---

## What's Actually Happening Behind the API

Every request goes through a layered middleware chain before it touches the database:

```
  Client                  Express Router             Middleware               Prisma / DB
  ──────                  ──────────────             ──────────               ───────────

  POST /api/bookings  →   booking.route.ts   →   requireAuth()          →   booking.service.ts
                                                  checkRole("Student")        │
                                                  │                           └── PostgreSQL
                                                  └─ 401 / 403 if fails            (via pg adapter)
```

This means:
- `BETTER_AUTH_SECRET` is **never** exposed to the client
- Session tokens are verified on every protected request
- Role mismatches are rejected before the controller is ever called
- The Prisma adapter communicates with PostgreSQL over SSL

---

## Tech Stack

| Layer       | Technology                                  |
|---|---|
| RUNTIME     | [Node.js](https://nodejs.org) 20            |
| FRAMEWORK   | [Express](https://expressjs.com) 5          |
| LANGUAGE    | [TypeScript](https://www.typescriptlang.org) 5 |
| ORM         | [Prisma](https://www.prisma.io) 7           |
| DATABASE    | [PostgreSQL](https://www.postgresql.org)    |
| AUTH        | [better-auth](https://better-auth.com) (email/password + Google OAuth) |
| DB ADAPTER  | [@prisma/adapter-pg](https://www.prisma.io/docs/orm/overview/databases/postgresql) + [pg](https://node-postgres.com) |
| BUILD       | [tsup](https://tsup.egoist.dev) (ESM bundle for Vercel) |
| DEV RUNNER  | [tsx](https://tsx.is) (watch mode)          |

---

## API Endpoints at a Glance

```
/api/auth/*                       better-auth — sign up, sign in, sign out, sessions

/api/tutors                       GET  — browse all tutors (search, pagination, filter)
/api/tutors                       POST — create tutor profile          [Tutor]
/api/tutors/tutor/:TutorId        PUT  — update tutor profile          [Tutor]
/api/tutors/:TutorId              GET  — get a specific tutor profile

/api/categories                   GET  — list all categories
/api/categories                   POST — create a category

/api/bookings                     POST — create a booking              [Student]
/api/bookings/student             GET  — student's own bookings        [Student]
/api/bookings/tutor               GET  — tutor's own bookings          [Tutor]
/api/bookings/:bookingId/status   PUT  — update booking status         [Student | Tutor]
/api/bookings/all                 GET  — view all bookings

/api/reviews                      POST — submit a review               [Student]
/api/reviews                      GET  — all reviews (public)
/api/reviews/tutor/reviews        GET  — reviews for logged-in tutor   [Tutor]
/api/reviews/tutor/:tutorId       GET  — public reviews for a tutor

/admin/users                      GET  — list all users                [Admin]
/admin/users/:userId/status       PUT  — update user status            [Admin]
/admin/users/:userId              DELETE — delete a user               [Admin]
/admin/users/:userId/tutor-profile DELETE — delete a tutor profile     [Admin]

/api/admin/bookings               GET  — all bookings                  [Admin]
/api/admin/bookings/cancelled     DELETE — remove cancelled bookings   [Admin]
```

---

## Get Running Locally

**1. Clone and install**

```bash
git clone <your-repo-url>
cd assingment-4
npm install
```

**2. Set up environment**

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:5000
```

> `BETTER_AUTH_SECRET` must be a strong random string — it signs all session tokens. Never commit it.

**3. Run database migrations**

```bash
npx prisma migrate dev
```

**4. Seed the admin user**

```bash
npm run seed:admin
```

**5. Start the dev server**

```bash
npm run dev
# API available at http://localhost:5000
```

---

## Project Layout

```
src/
├── app.ts                        Express app — routes, CORS, middleware wiring
├── server.ts                     Entry point — starts the server on PORT 5000
│
├── lib/
│   ├── auth.ts                   better-auth config (roles, OAuth, session settings)
│   └── prisma.ts                 Prisma client with pg adapter + SSL
│
├── middlware/
│   └── auth.ts                   requireAuth + checkRole middleware
│
├── helpers/
│   └── paginationSortingHelper.ts  Pagination utility (page, limit, skip, sort)
│
├── modules/
│   ├── tutorProfile/             Tutor profile CRUD
│   │   ├── tutorProfile.route.ts
│   │   ├── tutorProfile.controller.ts
│   │   └── tutorProfile.servic.ts
│   ├── category/                 Subject category management
│   │   ├── category.route.ts
│   │   ├── category.controller.ts
│   │   └── category.service.ts
│   ├── booking/                  Session booking lifecycle
│   │   ├── booking.route.ts
│   │   ├── booking.controller.ts
│   │   └── booking.service.ts
│   ├── reviwe/                   Student reviews for tutors
│   │   ├── review.route.ts
│   │   ├── review.controller.ts
│   │   └── reviwe.service.ts
│   └── admin/
│       ├── userManage/           Admin user management
│       │   ├── usermanage.route.ts
│       │   ├── userManage.controllers.ts
│       │   └── userManage.sevice.ts
│       └── bookingManage/        Admin booking management
│           ├── bookingManageRouter.ts
│           ├── bookingmanage.controller.ts
│           └── bookingManageService.ts
│
├── generated/
│   └── prisma/                   Auto-generated Prisma client types
│
└── script/
    └── seedAdmin.ts              One-time admin seed script

prisma/
├── schema.prisma                 Database schema (User, TutorProfile, Category, Booking, Review)
└── migrations/                   Migration history
```

---

## Environment Variables

| Variable            | Required | Purpose                                          |
|---|---|---|
| `DATABASE_URL`      | Yes      | PostgreSQL connection string                     |
| `BETTER_AUTH_SECRET`| Yes      | Signs and verifies all session tokens (server-side only) |
| `BETTER_AUTH_URL`   | Yes      | Base URL of this API (used by better-auth internally) |

---

## Scripts

```bash
npm run dev          # Development server with hot reload (tsx watch)
npm run build        # Production build via tsup → /api/app.mjs
npm run seed:admin   # Insert the seeded admin user into the database
```

---

## Admin Credentials (Seeded)

```
Email:    tempreal17112000@gmail.com
Password: Admin12345
```

Run `npm run seed:admin` once after migrations to insert the admin account.

---

## Deployment Notes (Vercel)

Add `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL` to **all three environments** (Production, Preview, Development) in Vercel project settings.

The build output (`tsup`) targets ESM for Node 20. Vercel routes all traffic to `/api/app.mjs` as configured in `vercel.json`.

> `pg-native` is excluded from the bundle (`--external pg-native`) — Vercel's Node runtime does not include native bindings.

---

## Known Gotchas

> **`DATABASE_URL is not defined`**  
> The variable exists in `.env` locally but must also be set explicitly in Vercel. It is NOT auto-inherited from local files.

> **`better-auth CSRF check`**  
> CSRF checking is disabled to support Postman and mobile clients. If you enable it for production, cross-origin requests from non-browser clients will start failing with 403.

> **Prisma generate on install**  
> `postinstall` runs `prisma generate` automatically. If the database is unreachable during `npm install`, generation still succeeds — only migrations require a live connection.

---

<div align="center">

Built by **Alamin Mustafa Rahim** · Tutor Booking Platform Full-Stack Mission

*Frontend connects to this API — this repo is the backend only.*

</div>
