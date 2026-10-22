import { checkLogin } from "../backend/auth.js";

export default function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Use POST to sign in." });
  }

  const { email, password } = request.body ?? {};
  const result = checkLogin(email, password);
  return response.status(result.status).json(result.body);
}
