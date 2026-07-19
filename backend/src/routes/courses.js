const express = require("express");
const router = express.Router();
const coursesService = require("../services/courses");

/**
 * GET /api/courses?page=1&limit=10
 * Returns paginated list of courses
 */
router.get("/", (req, res) => {
  console.log("Received request to fetch courses with query:", req.query);
  const page = parseInt(req.query.page) ?? 1;
  const limit = parseInt(req.query.limit) ?? 10;

  const result = coursesService.getAll(page, limit);
  res.json({ status: "SUCCESS", code: 200, ...result });
});

/**
 * GET /api/courses/list
 * Returns all courses without pagination, only id and name fields
 */
router.get("/list", (req, res) => {
  const courses = coursesService.getAllList();
  res.json({ status: "SUCCESS", code: 200, data: courses });
});

/**
 * GET /api/courses/:id
 * Returns a single course by id
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

/**
 * POST /api/courses
 * Creates a new course
 * Body: { name: string, description?: string, price?: number }
 */
router.post("/", (req, res) => {
  const { name, description, price } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ status: "ERROR", code: 400, message: "Name is required" });
  }
  const course = coursesService.create({ name, description, price });
  res.status(201).json({ status: "SUCCESS", code: 201, data: course });
});

/**
 * PUT /api/courses/:id
 * Updates an existing course
 * Body: { name?: string, description?: string, price?: number }
 */
router.put("/:id", (req, res) => {
  const { name, description, price } = req.body;
  const course = coursesService.update(req.params.id, {
    name,
    description,
    price,
  });
  if (!course) {
    return res
      .status(404)
      .json({ status: "ERROR", code: 404, message: "Course not found" });
  }
  res.json({ status: "SUCCESS", code: 200, data: course });
});

/**
 * DELETE /api/courses/:id
 * Deletes a course
 */
router.delete("/:id", (req, res) => {
  const removed = coursesService.remove(req.params.id);
  if (!removed) {
    return res
      .status(404)
      .json({ status: "ERROR", code: 404, message: "Course not found" });
  }
  res.json({ status: "SUCCESS", code: 200, message: "Course deleted" });
});

module.exports = router;
