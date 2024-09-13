## Pizza Management Application

## Overview
This project is a pizza management application developed using the Next.js framework. It consists of two main functionalities for managing toppings and pizzas. The application allows pizza store owners to manage available toppings and lets pizza chefs create and manage their pizza masterpieces.

## Features
Manage Toppings:

- Display a list of available toppings.
- Add new toppings.
- Delete existing toppings.
- Update existing toppings.
- Prevent duplicate toppings from being added.

Manage Pizzas:

- Display a list of existing pizzas and their toppings.
- Create new pizzas and add toppings to them.
- Delete existing pizzas.
- Update the name of an existing pizza.
- Update the toppings on an existing pizza.
- Prevent duplicate pizzas from being added.

## Tech&Tool Used
Next.js: A React framework used for building the application structure.

Supabase:
Supabase handles data management, replacing useState for storing pizzas and toppings. It directly interacts with the database to persist changes and provides real-time synchronization, ensuring consistent data across the app.

Why Supabase?
- Persistent Storage: Data remains stored in a PostgreSQL database, ensuring it's saved across sessions.
- Real-time Updates: Instant synchronization of data changes across clients.
- Scalability: Handles large datasets efficiently, making it better suited for complex applications.
- Security: Built-in authentication and row-level security.
- I chose Supabase for its real-time features, scalability, and persistent data management, making it ideal for a dynamic, collaborative application.

CSS:
Used for styling, focusing on mobile responsiveness and modern design.

## Installation
To run this application locally, follow these steps:

Clone the repository:
`git clone https://github.com/syounglee012/sam-pizza-supabase.git`

Navigate to the project directory:
`cd sam-pizza-supabase`

Install dependencies:
`npm install`

Start the development server:
`npm run dev`

Open the application in your browser:
`http://localhost:3000`
