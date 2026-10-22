# Abisoniya Institute Login

A beginner-friendly login page built with React and an Express server. It uses
one demo account and does not use a database or production authentication.

## Run locally

1. Install dependencies with `npm install`.
2. Start the Vite frontend and Express API with `npm run dev`.
3. Open the local URL printed by Vite (usually `http://localhost:5173`).

The Vite development server proxies `/api` requests to the Express server in
`backend/index.js` on port 4000. To create a production frontend bundle, run
`npm run build`. Start the API separately with `npm start`.

## Demo account

- Email: `demo@abisoniya.test`
- Password: `Abisoniya2026!`

The login form checks that both fields are filled in, that the email looks
valid, and that the password is at least eight characters long. A successful
login opens the student dashboard. Incorrect details display an error message.
