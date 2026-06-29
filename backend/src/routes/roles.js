const express = require("express");
const router = express.Router();
const rolesService = require("../services/roles");

/**
 * GET /api/roles
 * Returns all roles
 */
router.get("/", (_req, res) => {
  const roles = rolesService.getAll();
  res.json({ status: "SUCCESS", code: 200, data: roles });
});

/**
 * GET /api/roles/:id
 * Returns a single role by id
 */
router.get("/:id", (req, res) => {
  const role = rolesService.getById(req.params.id);
  if (!role) {
    return res
      .status(404)
      .json({ status: "ERROR", code: 404, message: "Role not found" });
  }
  res.json({ status: "SUCCESS", code: 200, data: role });
});

/**
 * POST /api/roles
 * Creates a new role
 * Body: { name: string }
 */
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ status: "ERROR", code: 400, message: "Name is required" });
  }
  const role = rolesService.create({ name });
  res.status(201).json({ status: "SUCCESS", code: 201, data: role });
});

/**
 * PUT /api/roles/:id
 * Updates an existing role
 * Body: { name: string }
 */
router.put("/:id", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ status: "ERROR", code: 400, message: "Name is required" });
  }
  const role = rolesService.update(req.params.id, { name });
  if (!role) {
    return res
      .status(404)
      .json({ status: "ERROR", code: 404, message: "Role not found" });
  }
  res.json({ status: "SUCCESS", code: 200, data: role });
});

/**
 * DELETE /api/roles/:id
 * Deletes a role
 */
router.delete("/:id", (req, res) => {
  const removed = rolesService.remove(req.params.id);
  if (!removed) {
    return res
      .status(404)
      .json({ status: "ERROR", code: 404, message: "Role not found" });
  }
  res.json({ status: "SUCCESS", code: 200, message: "Role deleted" });
});

module.exports = router;
