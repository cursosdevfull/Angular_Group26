const express = require("express");
const cors = require("cors");
const env = require("./config/env");
const authenticate = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const coursesRoutes = require("./routes/courses");
const rolesRoutes = require("./routes/roles");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", authenticate, coursesRoutes);
app.use("/api/roles", authenticate, rolesRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "UP" });
});

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
});
