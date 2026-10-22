# Abisoniya Institute

A beginner-friendly React login page and Express API for the Abisoniya Institute
full-stack development course. The login uses one mock account, not a database
or production authentication.

## Run locally

1. Install the project dependencies with `npm install`.
2. Start the frontend and backend with `npm run dev`.
3. Open the Vite URL printed in the terminal (usually `http://localhost:5173`).

The React app is in `frontend/`. The API is in `backend/` and runs on port 4000.
Vite forwards `/api` requests to the API. Run `npm run build` to build the
frontend or `npm start` to run only the API. Run `npm run lint` to check the
frontend code.

## Deploy to Vercel

Import the repository into Vercel and keep the project root set to the
repository root. `vercel.json` installs the frontend dependencies, builds the
React app into `frontend/dist`, and serves `api/login.js` as the `/api/login`
serverless function. The same login check is shared with the local Express API.

## Demo account

- Email: `demo@abisoniya.test`
- Password: `Abisoniya2026!`

The login form checks that both fields are filled in, that the email looks
valid, and that the password is at least eight characters long. A successful
login opens the student dashboard. Incorrect details display an error message.
