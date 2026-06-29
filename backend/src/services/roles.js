const path = require("path");
const fs = require("fs");

const rolesFilePath = path.join(__dirname, "..", "data", "roles.json");

function readRoles() {
  const raw = fs.readFileSync(rolesFilePath, "utf-8");
  return JSON.parse(raw);
}

function writeRoles(roles) {
  fs.writeFileSync(rolesFilePath, JSON.stringify(roles, null, 2), "utf-8");
}

/**
 * Get all roles
 * @returns {Array}
 */
function getAll() {
  return readRoles();
}

/**
 * Get role by id
 * @param {string} id
 * @returns {object|null}
 */
function getById(id) {
  const roles = readRoles();
  return roles.find((r) => r.id === id) || null;
}

/**
 * Create a new role
 * @param {object} roleData - { name: string }
 * @returns {object}
 */
function create(roleData) {
  const roles = readRoles();
  const newId = String(
    roles.length > 0 ? Math.max(...roles.map((r) => Number(r.id))) + 1 : 1,
  );
  const newRole = { id: newId, name: roleData.name };
  roles.push(newRole);
  writeRoles(roles);
  return newRole;
}

/**
 * Update an existing role
 * @param {string} id
 * @param {object} roleData - { name: string }
 * @returns {object|null}
 */
function update(id, roleData) {
  const roles = readRoles();
  const index = roles.findIndex((r) => r.id === id);
  if (index === -1) return null;

  roles[index] = { id, name: roleData.name };
  writeRoles(roles);
  return roles[index];
}

/**
 * Delete a role
 * @param {string} id
 * @returns {boolean}
 */
function remove(id) {
  const roles = readRoles();
  const index = roles.findIndex((r) => r.id === id);
  if (index === -1) return false;

  roles.splice(index, 1);
  writeRoles(roles);
  return true;
}

module.exports = { getAll, getById, create, update, remove };
