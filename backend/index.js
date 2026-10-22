import express from "express";
import { checkLogin } from "./auth.js";

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(express.json({ limit: "10kb" }));

app.post("/api/login", (request, response) => {
  const { email, password } = request.body ?? {};
  const result = checkLogin(email, password);
  return response.status(result.status).json(result.body);
});

app.listen(port, () => {
  console.log(`Abisoniya Institute API listening on http://localhost:${port}`);
});