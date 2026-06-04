# Reno Notice Board

A responsive Notice Board application built for the Reno Platforms Web Development Internship Assignment.

## Live Demo

https://reno-notice-board-fvwfc7g7b-akarsh-nag-s-projects.vercel.app

## GitHub Repository

https://github.com/Akarsh63069/reno-notice-board

## Features

* Create notices
* View notices
* Edit notices
* Delete notices with confirmation
* Search notices
* Urgent notice priority support
* Optional image URL support
* Responsive design
* Prisma ORM integration
* TiDB Cloud database integration
* Vercel deployment

## Tech Stack

* Next.js (Pages Router)
* React
* Prisma ORM
* TiDB Cloud (MySQL Compatible)
* Tailwind CSS
* Vercel

## Run Locally

### Clone Repository

```bash
git clone https://github.com/Akarsh63069/reno-notice-board.git
cd reno-notice-board
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create a `.env` file and add:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE?sslaccept=strict"
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Push Database Schema

```bash
npx prisma db push
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## What I Would Improve With More Time

I would add user authentication, cloud-based image uploads, advanced filtering, pagination, and automated testing to improve scalability and user experience.

## AI Usage

AI tools were used for requirement clarification, project planning, debugging assistance, code review support, and documentation guidance. All implementation, database integration, deployment, testing, and final verification were completed manually.

## Author

Akarsh Nag
