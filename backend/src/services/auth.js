const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const env = require("../config/env");

const usersFilePath = path.join(__dirname, "..", "data", "users.json");
const rolesFilePath = path.join(__dirname, "..", "data", "roles.json");

function readUsers() {
  const raw = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(raw);
}

function readRoles() {
  const raw = fs.readFileSync(rolesFilePath, "utf-8");
  return JSON.parse(raw);
}

/**
 * Validates user credentials against users.json
 * @param {string} email
 * @param {string} password
 * @returns {{ success: boolean, code: number, message: string }}
 */
function login(email, password) {
  if (!email || !password) {
    return {
      success: false,
      code: 400,
      message: JSON.stringify({ error: "Email and password are required" }),
    };
  }

  const users = readUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return {
      success: false,
      code: 401,
      message: JSON.stringify({ error: "Invalid credentials" }),
    };
  }

  const roles = readRoles();
  const role = roles.find((r) => r.id === user.roleId);

  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    roleName: role ? role.name : null,
  };

  const accessToken = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

  return {
    success: true,
    code: 200,
    message: JSON.stringify({ access_token: accessToken }),
  };
}

module.exports = { login };
