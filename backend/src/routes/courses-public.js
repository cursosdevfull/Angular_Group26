const express = require("express");
const router = express.Router();
const coursesService = require("../services/courses");

/**
 * GET /api/public/courses?page=1&limit=10
 * Returns paginated list of courses (PUBLIC - no auth required)
 */
router.get("/", (req, res) => {
  const page = parseInt(req.query.page) ?? 1;
  const limit = parseInt(req.query.limit) ?? 10;

  const result = coursesService.getAll(page, limit);
  res.json({ status: "SUCCESS", code: 200, ...result });
});

/**
 * GET /api/public/courses/:id
 * Returns a single course by id (PUBLIC - no auth required)
 */
router.get("/:id", (req, res) => {
  const course = coursesService.getById(req.params.id);
  if (!course) {
    return res
      .status(404)
      .json({ status: "ERROR", code: 404, message: "Course not found" });
  }
  res.json({ status: "SUCCESS", code: 200, data: course });
});

module.exports = router;
