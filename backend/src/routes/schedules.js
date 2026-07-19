const express = require("express");
const router = express.Router();
const schedulesService = require("../services/schedules");

/**
 * GET /api/schedules?page=1&limit=10&courseId=1
 * Returns paginated list of schedules, optionally filtered by courseId
 */
router.get("/", (req, res) => {
  console.log("Received request to fetch schedules with query:", req.query);
  const page = parseInt(req.query.page) ?? 1;
  const limit = parseInt(req.query.limit) ?? 10;
  const courseId = req.query.courseId || null;

  const result = schedulesService.getAll(page, limit, courseId);
  res.json({ status: "SUCCESS", code: 200, ...result });
});

/**
 * GET /api/schedules/:id
 * Returns a single schedule by id
 */
router.get("/:id", (req, res) => {
  const schedule = schedulesService.getById(req.params.id);
  if (!schedule) {
    return res
      .status(404)
      .json({ status: "ERROR", code: 404, message: "Schedule not found" });
  }
  res.json({ status: "SUCCESS", code: 200, data: schedule });
});

/**
 * POST /api/schedules
 * Creates a new schedule
 * Body: { courseId: string, dateStart: string, title: string, teacherName: string, summary?: string, requeriments?: string }
 */
router.post("/", (req, res) => {
  const { courseId, dateStart, title, teacherName, summary, requeriments } =
    req.body;
  if (!courseId || !dateStart || !title || !teacherName) {
    return res.status(400).json({
      status: "ERROR",
      code: 400,
      message: "courseId, dateStart, title, and teacherName are required",
    });
  }
  const schedule = schedulesService.create({
    courseId,
    dateStart,
    title,
    teacherName,
    summary,
    requeriments,
  });
  res.status(201).json({ status: "SUCCESS", code: 201, data: schedule });
});

/**
 * PUT /api/schedules/:id
 * Updates an existing schedule
 * Body: { courseId?: string, dateStart?: string, title?: string, teacherName?: string, summary?: string, requeriments?: string }
 */
router.put("/:id", (req, res) => {
  const { courseId, dateStart, title, teacherName, summary, requeriments } =
    req.body;
  const schedule = schedulesService.update(req.params.id, {
    courseId,
    dateStart,
    title,
    teacherName,
    summary,
    requeriments,
  });
  if (!schedule) {
    return res
      .status(404)
      .json({ status: "ERROR", code: 404, message: "Schedule not found" });
  }
  res.json({ status: "SUCCESS", code: 200, data: schedule });
});

/**
 * DELETE /api/schedules/:id
 * Deletes a schedule
 */
router.delete("/:id", (req, res) => {
  const removed = schedulesService.remove(req.params.id);
  if (!removed) {
    return res
      .status(404)
      .json({ status: "ERROR", code: 404, message: "Schedule not found" });
  }
  res.json({ status: "SUCCESS", code: 200, message: "Schedule deleted" });
});

module.exports = router;
