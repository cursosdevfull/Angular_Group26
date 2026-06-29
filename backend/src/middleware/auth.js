const jwt = require("jsonwebtoken");
const env = require("../config/env");

/**
 * Middleware to verify JWT token from Authorization header.
 * The header format is: "authorization: bearer <access_token>"
 *
 * If the token is valid, the decoded payload is attached to req.user.
 * Otherwise, a 401 response is returned.
 */
function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({
      status: "ERROR",
      code: 401,
      message: JSON.stringify({ error: "Missing authorization header" }),
    });
  }

  // Expect format: "bearer <token>"
  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
    return res.status(401).json({
      status: "ERROR",
      code: 401,
      message: JSON.stringify({
        error: "Invalid authorization header format. Expected: bearer <token>",
      }),
    });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "ERROR",
      code: 401,
      message: JSON.stringify({ error: "Invalid or expired token" }),
    });
  }
}

module.exports = authenticate;
