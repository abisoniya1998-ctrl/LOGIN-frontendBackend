const demoUser = {
  email: "demo@abisoniya.test",
  password: "Abisoniya2026!",
  name: "Abisoniya Institute Student",
};

export function checkLogin(email, password) {
  if (typeof email !== "string" || typeof password !== "string") {
    return {
      status: 400,
      body: { error: "Enter an email address and password." },
    };
  }

  if (email.trim().toLowerCase() !== demoUser.email || password !== demoUser.password) {
    return {
      status: 401,
      body: { error: "That email and password don't match." },
    };
  }

  return {
    status: 200,
    body: {
      user: {
        email: demoUser.email,
        name: demoUser.name,
      },
    },
  };
}
