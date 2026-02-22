# Tutor Booking Platform API

A RESTful API for a tutor booking platform built with **Express**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**. Authentication is handled by **better-auth**.

---

## Tech Stack

| Layer     | Technology  |
| --------- | ----------- |
| Runtime   | Node.js     |
| Framework | Express 5   |
| Language  | TypeScript  |
| ORM       | Prisma 7    |
| Database  | PostgreSQL  |
| Auth      | better-auth |

---

## Project Setup

```bash
# Install dependencies
npm install

# Run in development mode (watch)
npm run dev

# Seed the admin user
npm run seed:admin
```

---

## Environment Variables

Create a `.env` file in the root with the following variables:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:5000
```

---

## Database

This project uses **Prisma** with **PostgreSQL**.

```bash
# Run migrations
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio
```

### Models

- **User** — Supports roles: `Student`, `Tutor`, `Admin`
- **TutorProfile** — Tutor details, hourly rate, subjects, availability
- **Category** — Subject categories for tutors
- **Booking** — Session bookings between students and tutors (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`)
- **Review** — Student reviews for tutors
- **Session / Account / Verification** — Managed by better-auth

---

## API Endpoints

### Authentication — `/api/auth/*`

Handled entirely by **better-auth**. Supports sign up, sign in, sign out, and session management.

---

### Tutor Profiles — `/api/tutors`

| Method | Endpoint                     | Auth   | Description                                       |
| ------ | ---------------------------- | ------ | ------------------------------------------------- |
| `POST` | `/api/tutors`                | Tutor  | Create a tutor profile                            |
| `PUT`  | `/api/tutors/tutor/:TutorId` | Tutor  | Update a tutor profile                            |
| `GET`  | `/api/tutors`                | Public | Get all tutor profiles (with search & pagination) |
| `GET`  | `/api/tutors/:TutorId`       | Public | Get a specific tutor profile                      |

> Supports search and pagination on `GET /api/tutors`.

---

### Categories — `/api/categories`

| Method | Endpoint          | Auth   | Description        |
| ------ | ----------------- | ------ | ------------------ |
| `POST` | `/api/categories` | Public | Create a category  |
| `GET`  | `/api/categories` | Public | Get all categories |

---

### Bookings — `/api/bookings`

| Method | Endpoint                          | Auth            | Description                            |
| ------ | --------------------------------- | --------------- | -------------------------------------- |
| `POST` | `/api/bookings`                   | Student         | Create a new booking                   |
| `GET`  | `/api/bookings/student`           | Student         | Get bookings for the logged-in student |
| `GET`  | `/api/bookings/tutor`             | Tutor           | Get bookings for the logged-in tutor   |
| `PUT`  | `/api/bookings/:bookingId/status` | Student / Tutor | Update booking status                  |

---

### Reviews — `/api/reviews`

| Method | Endpoint       | Auth    | Description                 |
| ------ | -------------- | ------- | --------------------------- |
| `POST` | `/api/reviews` | Student | Submit a review for a tutor |

---

### Admin — User Management — `/admin`

| Method   | Endpoint                      | Auth  | Description            |
| -------- | ----------------------------- | ----- | ---------------------- |
| `GET`    | `/admin/users`                | Admin | Get all users          |
| `PUT`    | `/admin/users/:userId/status` | Admin | Update a user's status |
| `DELETE` | `/admin/users/:userId`        | Admin | Delete a user          |

---

### Admin — Booking Management — `/api/admin/bookings`

| Method   | Endpoint                        | Auth   | Description                   |
| -------- | ------------------------------- | ------ | ----------------------------- |
| `GET`    | `/api/admin/bookings`           | Public | Get all bookings              |
| `DELETE` | `/api/admin/bookings/cancelled` | Admin  | Remove all cancelled bookings |

---

## Admin Credentials (Seeded)

```
Email:    tempreal17112000@gmail.com
Password: Admin12345
```

Seed with:

```bash
npm run seed:admin
```

---

## Scripts

| Script               | Description                                    |
| -------------------- | ---------------------------------------------- |
| `npm run dev`        | Start dev server with hot reload (`tsx watch`) |
| `npm run seed:admin` | Seed the admin user into the database          |

Tutor
"email": "tutor1@gmail.com", // required
"password": "password1234",
