# SheRide — Women-Only Bus Reservation System

A full-stack web application for women-only bus booking with seat selection, booking confirmation emails, and user profile management.

---

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 18, Vite, React Router v6     |
| Backend  | Node.js, Express                    |
| Database | MongoDB Atlas (Mongoose)            |
| Auth     | JWT (7-day tokens), bcryptjs        |
| Email    | Nodemailer + Gmail SMTP             |

---

## Project Structure

```
SheRide/
├── client/          # React frontend (Vite, port 5173)
└── server/          # Express backend (port 5000)
    └── src/
        ├── controllers/
        ├── data/          # Mock bus data + in-memory seat store
        ├── middleware/    # JWT auth middleware
        ├── models/        # Mongoose User model
        ├── routes/
        └── utils/         # Mailer
```

---

## Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas cluster
- Gmail account with an App Password

### Server

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_gmail_app_password
CLIENT_ORIGIN=http://localhost:5173
```

```bash
npm run dev      # starts with nodemon on port 5000
```

### Client

```bash
cd client
npm install
npm run dev      # starts Vite on port 5173
```

---

## API Routes

Base URL: `http://localhost:5000`

### Auth

| Method | Endpoint        | Auth | Description                         |
|--------|-----------------|------|-------------------------------------|
| POST   | `/auth/signup`  | —    | Register a new user                 |
| POST   | `/auth/login`   | —    | Login with email or phone           |
| GET    | `/auth/profile` | JWT  | Get logged-in user's details        |
| PUT    | `/auth/profile` | JWT  | Update name, email, phone, password |

**POST `/auth/signup`**
```json
{
  "firstName": "Your first name ",
  "lastName": "Your last name",
  "email": "your.email@example.com",
  "phone": "1234567890",
  "password": "secret123"
}
```

**POST `/auth/login`**
```json
{ "emailOrPhone": "your.email@example.com", "password": "secret123" }
```

**PUT `/auth/profile`** — `Authorization: Bearer <token>` required
```json
{
  "firstName": "Your first name",
  "lastName": "Your last name",
  "email": "your.email@example.com",
  "phone": "1234567890",
  "currentPassword": "secret123",
  "newPassword": "newSecret456"
}
```
> `currentPassword` and `newPassword` are optional — omit both to update only profile details.

---

### Buses

| Method | Endpoint     | Auth | Description                           |
|--------|--------------|------|---------------------------------------|
| GET    | `/buses`     | —    | Search buses by route and date        |
| GET    | `/buses/:id` | —    | Get bus details with live seat status |

**GET `/buses?from=Mumbai&to=Pune&date=2026-05-01`**

**GET `/buses/bus-001?date=2026-05-01`**
Returns the seat layout with booked seats marked. Seats are locked for 12 hours after booking.

Available routes in mock data:

| Route               | Bus IDs                  |
|---------------------|--------------------------|
| Mumbai → Pune       | bus-001, bus-002, bus-003 |
| Delhi → Dehradun    | bus-004, bus-005, bus-006 |
| Bangalore → Chennai | bus-007, bus-008          |
| Jaipur → Delhi      | bus-009, bus-010          |

---

### Booking

| Method | Endpoint   | Auth | Description            |
|--------|------------|------|------------------------|
| POST   | `/booking` | —    | Confirm a seat booking |

**POST `/booking`**
```json
{
  "busId": "bus-001",
  "seatNumbers": [3, 4],
  "passengers": [
    { "name": "Priya Sharma", "age": "28" },
    { "name": "Rina Verma",   "age": "25" }
  ],
  "email": "priya@example.com",
  "phone": "9876543210",
  "date": "2026-05-01",
  "totalAmount": 945
}
```

Sends a booking confirmation email to the provided address.

---

### Health Check

| Method | Endpoint  | Description              |
|--------|-----------|--------------------------|
| GET    | `/health` | Server + DB status check |

---

## Frontend Pages

| Route           | Description                               |
|-----------------|-------------------------------------------|
| `/`             | Homepage                                  |
| `/about`        | About SheRide                             |
| `/contact`      | Contact info and form                     |
| `/results`      | Search buses by route and date            |
| `/seats/:busId` | Seat map, passenger details, and booking  |
| `/login`        | Login with email or phone number          |
| `/signup`       | Create a new account                      |
| `/dashboard`    | Edit profile — protected, login required  |

---

## Key Features

- **Seat locking** — booked seats appear in red with a hover tooltip; locks expire after 12 hours
- **Per-passenger details** — separate name + age per seat; single shared email for confirmation
- **Email notifications** — welcome email on signup; full booking confirmation with trip details
- **Persistent auth** — JWT in localStorage; stays logged in on page refresh
- **Profile dropdown** — initials avatar in navbar with Dashboard and Logout options
- **Profile editing** — update name, email, phone, and password from the dashboard

---

## Author

Yana Pandey
