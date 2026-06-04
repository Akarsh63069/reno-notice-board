# Reno Notice Board

A responsive Notice Board application built for the Reno Platforms Web Development Internship Assignment. The application supports complete Create, Read, Update and Delete (CRUD) functionality using Next.js Pages Router, Prisma ORM and a MySQL-compatible hosted database.

## Features

* List notices as responsive cards
* Add new notice
* Edit existing notice with pre-filled values
* Delete notice after confirmation
* Search notices by title, category or priority
* Server-side validation through API routes
* Urgent notices displayed with priority badge
* Prisma-powered database operations
* Optional image URL support
* Responsive design for desktop and mobile devices
* Deployment ready with Vercel

## Tech Stack

* Next.js (Pages Router)
* React
* Prisma ORM
* MySQL-compatible hosted database (TiDB Cloud)
* Tailwind CSS
* Vercel

## Run Locally

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd reno-notice-board
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create a `.env` file and add your database connection string.

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE?sslaccept=strict"
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Push schema to database

```bash
npx prisma db push
```

### 6. Run development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Environment Variables

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE?sslaccept=strict"
```

## API Routes

### Notices Collection

* GET `/api/notices` — Fetch all notices
* POST `/api/notices` — Create a new notice

### Individual Notice

* GET `/api/notices/[id]` — Fetch a single notice
* PUT `/api/notices/[id]` — Update a notice
* DELETE `/api/notices/[id]` — Delete a notice

## Project Structure

```text
components/
│
├── NoticeForm.js

pages/
│
├── index.js
├── add.js
├── edit/
│   └── [id].js
│
└── api/
    └── notices/
        ├── index.js
        └── [id].js

lib/
│
├── prisma.js
├── validateNotice.js

prisma/
│
└── schema.prisma

styles/
│
└── globals.css
```

## What I Would Improve With More Time

* Image upload support using cloud storage
* Advanced filtering and sorting
* Pagination for large datasets
* Toast notifications for user actions
* Automated testing for API routes
* User authentication and role management

## AI Usage

AI tools were used for requirement clarification, project planning and code review assistance. Application logic, debugging, testing and final implementation decisions were manually verified before submission.

## Author

Akarsh Nag
