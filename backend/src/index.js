const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");
const env = require("./config/env");
const authenticate = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const coursesRoutes = require("./routes/courses");
const coursesPublicRoutes = require("./routes/courses-public");
const schedulesRoutes = require("./routes/schedules");
const rolesRoutes = require("./routes/roles");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Swagger documentation
const swaggerDocument = YAML.load(path.join(__dirname, "docs", "swagger.yaml"));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRoutes);

// Public routes (no auth required)
app.use("/api/public/courses", coursesPublicRoutes);

// Protected routes (auth required)
app.use("/api/courses", authenticate, coursesRoutes);
app.use("/api/schedules", authenticate, schedulesRoutes);
app.use("/api/roles", authenticate, rolesRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "UP" });
});

app.listen(env.PORT, () => {
  console.log(
    `Server running on http://localhost:${env.PORT}\nSwagger docs available at http://localhost:${env.PORT}/api/docs`,
  );
});
