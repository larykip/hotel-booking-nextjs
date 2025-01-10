# Welcome to MetroManor Hotel Booking System

`NextJS 14` `JavaScript` `TailwindCSS` `Shadcn` `Aceternity` `MongoDB` `Mongoose` `JWT`

## Project Overview

MetroManor Hotel Booking System is a modern web application built with Next.js 14, JavaScript, and Shadcn UI components. This system provides a seamless hotel booking experience for users and an efficient management interface for hotel administrators.

### Key Features

- User Authentication: Secure sign-up and login functionality
- Room Browsing: Users can view available rooms with detailed information
- Booking Management: Easy-to-use interface for making and managing reservations
- Admin Dashboard: Comprehensive tools for hotel staff to manage bookings and room availability

### Tech Stack

- **Frontend**: Next.js 14, React
- **UI Components**: Shadcn UI, Aceternity, Lucide-React, CMDK
- **State Management**: React Hook Form, Zod for form validation
- **Authentication**: JWT (JSON Web Tokens)
- **Backend**: Next.js API Routes
- **Database**: MongoDB (with Mongoose ORM)

### Project Structure

- `src/app`: Next.js app router and API routes
- `src/components`: Reusable React components
- `src/lib`: Utility functions and database connection
- `src/models`: Mongoose models for database schema

### Authentication Flow

The application uses a token-based authentication system:
1. Users sign up or log in through dedicated forms
2. Upon successful authentication, a JWT is stored in an HTTP-only cookie
3. Protected routes and API endpoints verify the JWT for access control

## Getting Started

To set up and run the MetroManor Hotel Booking System on your local machine, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/larykip/hotel-booking-nextjs
   cd hotel-booking-nextjs
   ```

2. Create a `.env.local` file in the root directory and add the following environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

Note: Ensure you have Node.js (version 22 or later) and npm installed on your machine before proceeding.

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.
