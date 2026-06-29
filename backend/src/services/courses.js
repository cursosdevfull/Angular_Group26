const path = require("path");
const fs = require("fs");

const coursesFilePath = path.join(__dirname, "..", "data", "courses.json");

function readCourses() {
  const raw = fs.readFileSync(coursesFilePath, "utf-8");
  return JSON.parse(raw);
}

function writeCourses(courses) {
  fs.writeFileSync(coursesFilePath, JSON.stringify(courses, null, 2), "utf-8");
}

/**
 * Get all courses with pagination
 * @param {number} page - Page number (1-based)
 * @param {number} limit - Items per page
 * @returns {{ data: Array, total: number, page: number, limit: number, totalPages: number }}
 */
function getAll(page = 1, limit = 10) {
  const courses = readCourses();
  const total = courses.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const data = courses.slice(startIndex, endIndex);

  return {
    data,
    total,
    page,
    limit,
    totalPages,
  };
}

/**
 * Get course by id
 * @param {string} id
 * @returns {object|null}
 */
function getById(id) {
  const courses = readCourses();
  return courses.find((c) => c.id === id) || null;
}

/**
 * Create a new course
 * @param {object} courseData - { name, description, price }
 * @returns {object}
 */
function create(courseData) {
  const courses = readCourses();
  const newId = String(
    courses.length > 0 ? Math.max(...courses.map((c) => Number(c.id))) + 1 : 1,
  );
  const newCourse = {
    id: newId,
    name: courseData.name,
    description: courseData.description || "",
    price: courseData.price || 0,
    createdAt: new Date().toISOString(),
  };
  courses.push(newCourse);
  writeCourses(courses);
  return newCourse;
}

/**
 * Update an existing course
 * @param {string} id
 * @param {object} courseData - { name, description, price }
 * @returns {object|null}
 */
function update(id, courseData) {
  const courses = readCourses();
  const index = courses.findIndex((c) => c.id === id);
  if (index === -1) return null;

  courses[index] = {
    ...courses[index],
    name: courseData.name !== undefined ? courseData.name : courses[index].name,
    description:
      courseData.description !== undefined
        ? courseData.description
        : courses[index].description,
    price:
      courseData.price !== undefined ? courseData.price : courses[index].price,
  };
  writeCourses(courses);
  return courses[index];
}

/**
 * Delete a course
 * @param {string} id
 * @returns {boolean}
 */
function remove(id) {
  const courses = readCourses();
  const index = courses.findIndex((c) => c.id === id);
  if (index === -1) return false;

  courses.splice(index, 1);
  writeCourses(courses);
  return true;
}

module.exports = { getAll, getById, create, update, remove };
