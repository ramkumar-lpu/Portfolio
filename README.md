<<<<<<< HEAD
# Portfolio
my personal web
# Ramstack Showcase — Local setup

This repository includes a Vite + React frontend and a small Node/Express backend used to send contact-form emails via SMTP (nodemailer).

## What I added
- `server/index.js` — small Express server with `POST /api/send` that forwards form submissions to an SMTP address using environment variables.
- `server/package.json` — server dependencies (express, cors, nodemailer).
- `server/.env.example` — sample env vars for SMTP and backend URL.

## Prerequisites
- Node.js (18+ recommended)
- An SMTP account (SendGrid, Mailgun SMTP, Gmail SMTP with app password, or other SMTP provider)

## Setup (Windows PowerShell examples)

1. Install frontend deps (run in repo root):

```powershell
cd "C:\Users\ramku\Downloads\ramstack-showcase-main\ramstack-showcase-main"
npm install
```

5. Start the frontend (in another terminal):

```powershell
cd "C:\Users\ramku\Downloads\ramstack-showcase-main\ramstack-showcase-main"
npm run dev
```

6. Open the app in your browser at the Vite URL (Vite prints the Local URL, e.g., `http://localhost:8081/`).

## How it works
- The Contact form posts JSON to `VITE_BACKEND_URL` (defaults to `http://localhost:4000/api/send`).
- The backend uses `email.js you supplied to send the email to `TO_EMAIL`.
- If the backend fails to send for any reason, the frontend falls back to opening the visitor's mail client via a `mailto:` link so the message can still be sent manually.

## Environment variables (server `.env`)
from the email.js website ..........
VITE_EMAILJS_SERVICE_ID=your service id 
VITE_EMAILJS_TEMPLATE_ID=your_Template_ID
VITE_EMAILJS_PUBLIC_KEY=Your_public_KEy

## Security & production notes
- Keep SMTP credentials secret and inject them via environment variables on your host (do not commit `.env` to version control).
- For production, consider using a transactional email provider (SendGrid, Mailgun, SES) for better deliverability and use API keys rather than raw SMTP where possible.
- Add rate-limiting and spam protection (reCAPTCHA) to the backend before exposing publicly.

## Troubleshooting
- If you see `Failed to send` in the frontend toast, check the backend console for errors and verify SMTP credentials.
- You can test SMTP locally with services like Mailtrap or by using your email provider's SMTP test settings.

If you want, I can also add a single `dev` script that runs frontend and backend concurrently (requires adding `concurrently` or similar). Tell me if you'd like that.


## Project info

**URL**: ramsmain.vercel.app

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

