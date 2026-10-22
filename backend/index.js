const express = require("express");

const app = express();
const port = Number(process.env.PORT) || 4000;
const demoUser = {
  email: "demo@abisoniya.test",
  password: "Abisoniya2026!",
  name: "Abisoniya Institute Student",
};

app.use(express.json({ limit: "10kb" }));

app.post("/api/login", (request, response) => {
  const { email, password } = request.body ?? {};

  if (typeof email !== "string" || typeof password !== "string") {
    return response.status(400).json({ error: "Enter an email address and password." });
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedEmail !== demoUser.email || password !== demoUser.password) {
    return response.status(401).json({ error: "That email and password don't match." });
  }

  return response.json({
    user: {
      email: demoUser.email,
      name: demoUser.name,
    },
  });
});

app.listen(port, () => {
  console.log(`Abisoniya Institute API listening on http://localhost:${port}`);
});