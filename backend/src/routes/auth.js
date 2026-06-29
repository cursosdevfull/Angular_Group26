const express = require("express");
const router = express.Router();
const authService = require("../services/auth");

/**
 * POST /login
 * Body: { email: string, password: string }
 * Returns: { status: "SUCCESS" | "ERROR", code: number, message: string }
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const result = authService.login(email, password);

  const response = {
    status: result.success ? "SUCCESS" : "ERROR",
    code: result.code,
    message: result.message,
  };

  res.status(result.code).json(response);
});

module.exports = router;
