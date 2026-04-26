# SheRide — Women-Only Bus Reservation System

SheRide is a web application built exclusively for women to search, select, and book bus seats safely and conveniently. It includes user authentication, real-time seat availability, booking confirmation emails, and profile management.

---

## What It Does

- Search buses by route and travel date
- View available seats on a visual bus layout and select up to 4
- Fill in passenger details and confirm a booking
- Receive a booking confirmation email instantly
- Create an account, log in, and manage your profile
- Booked seats are shown as unavailable to other users for 12 hours

---

## Pages

| Page        | URL               | Description                              |
|-------------|-------------------|------------------------------------------|
| Home        | `/`               | Landing page                             |
| About       | `/about`          | About SheRide                            |
| Contact     | `/contact`        | Contact information                      |
| Search      | `/results`        | Search buses by route and date           |
| Seat Select | `/seats/:busId`   | Pick seats and enter passenger details   |
| Login       | `/login`          | Login with email or phone number         |
| Sign Up     | `/signup`         | Create a new account                     |
| Dashboard   | `/dashboard`      | Edit your profile (login required)       |

---

## API Routes

Server runs on `http://localhost:5000`

### Auth
| Method | Endpoint        | Protected | What it does                        |
|--------|-----------------|-----------|-------------------------------------|
| POST   | `/auth/signup`  | No        | Register a new account              |
| POST   | `/auth/login`   | No        | Login and receive a token           |
| GET    | `/auth/profile` | Yes       | Fetch logged-in user's details      |
| PUT    | `/auth/profile` | Yes       | Update name, email, phone, password |

### Buses
| Method | Endpoint     | What it does                                        |
|--------|--------------|-----------------------------------------------------|
| GET    | `/buses`     | Search buses — pass `from`, `to`, `date` as params  |
| GET    | `/buses/:id` | Get a specific bus with live seat availability      |

### Booking
| Method | Endpoint   | What it does                          |
|--------|------------|---------------------------------------|
| POST   | `/booking` | Confirm a booking and send email      |

### Other
| Method | Endpoint  | What it does              |
|--------|-----------|---------------------------|
| GET    | `/health` | Check if server is running|

---

## Available Bus Routes (for testing)

| Route               | Bus IDs                    |
|---------------------|----------------------------|
| Mumbai → Pune       | bus-001, bus-002, bus-003  |
| Delhi → Dehradun    | bus-004, bus-005, bus-006  |
| Bangalore → Chennai | bus-007, bus-008           |
| Jaipur → Delhi      | bus-009, bus-010           |

---

## Author

Yana Pandey
