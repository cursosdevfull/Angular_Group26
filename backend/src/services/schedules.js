const path = require("path");
const fs = require("fs");

const schedulesFilePath = path.join(__dirname, "..", "data", "schedules.json");
const coursesFilePath = path.join(__dirname, "..", "data", "courses.json");

function readSchedules() {
  const raw = fs.readFileSync(schedulesFilePath, "utf-8");
  return JSON.parse(raw);
}

function readCourses() {
  const raw = fs.readFileSync(coursesFilePath, "utf-8");
  return JSON.parse(raw);
}

function writeSchedules(schedules) {
  fs.writeFileSync(
    schedulesFilePath,
    JSON.stringify(schedules, null, 2),
    "utf-8",
  );
}

/**
 * Get all schedules with pagination and optional courseId filter
 * @param {number} page - Page number (1-based)
 * @param {number} limit - Items per page
 * @param {string} [courseId] - Optional filter by courseId
 * @returns {{ data: Array, total: number, page: number, limit: number, totalPages: number }}
 */
function getAll(page = 1, limit = 10, courseId = null) {
  let schedules = readSchedules();
  const courses = readCourses();

  if (courseId) {
    schedules = schedules.filter((s) => s.courseId === courseId);
  }

  const total = schedules.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const data = schedules.slice(startIndex, endIndex).map((schedule) => {
    const course = courses.find((c) => c.id === schedule.courseId);
    return {
      ...schedule,
      courseName: course ? course.name : "",
    };
  });

  return {
    data,
    total,
    page,
    limit,
    totalPages,
  };
}

/**
 * Get schedule by id
 * @param {string} id
 * @returns {object|null}
 */
function getById(id) {
  const schedules = readSchedules();
  return schedules.find((s) => s.id === id) || null;
}

/**
 * Get all schedules for a specific course
 * @param {string} courseId
 * @returns {Array}
 */
function getByCourseId(courseId) {
  const schedules = readSchedules();
  return schedules.filter((s) => s.courseId === courseId);
}

/**
 * Create a new schedule
 * @param {object} scheduleData - { courseId, dateStart, title, teacherName, summary, requeriments }
 * @returns {object}
 */
function create(scheduleData) {
  const schedules = readSchedules();
  const newId = String(
    schedules.length > 0
      ? Math.max(...schedules.map((s) => Number(s.id))) + 1
      : 1,
  );
  const newSchedule = {
    id: newId,
    courseId: scheduleData.courseId,
    dateStart: scheduleData.dateStart,
    title: scheduleData.title,
    teacherName: scheduleData.teacherName,
    summary: scheduleData.summary || "",
    requeriments: scheduleData.requeriments || "",
    createdAt: new Date().toISOString(),
  };
  schedules.push(newSchedule);
  writeSchedules(schedules);
  return newSchedule;
}

/**
 * Update an existing schedule
 * @param {string} id
 * @param {object} scheduleData - { courseId, dateStart, title, teacherName, summary, requeriments }
 * @returns {object|null}
 */
function update(id, scheduleData) {
  const schedules = readSchedules();
  const index = schedules.findIndex((s) => s.id === id);
  if (index === -1) return null;

  schedules[index] = {
    ...schedules[index],
    courseId:
      scheduleData.courseId !== undefined
        ? scheduleData.courseId
        : schedules[index].courseId,
    dateStart:
      scheduleData.dateStart !== undefined
        ? scheduleData.dateStart
        : schedules[index].dateStart,
    title:
      scheduleData.title !== undefined
        ? scheduleData.title
        : schedules[index].title,
    teacherName:
      scheduleData.teacherName !== undefined
        ? scheduleData.teacherName
        : schedules[index].teacherName,
    summary:
      scheduleData.summary !== undefined
        ? scheduleData.summary
        : schedules[index].summary,
    requeriments:
      scheduleData.requeriments !== undefined
        ? scheduleData.requeriments
        : schedules[index].requeriments,
  };
  writeSchedules(schedules);
  return schedules[index];
}

/**
 * Delete a schedule
 * @param {string} id
 * @returns {boolean}
 */
function remove(id) {
  const schedules = readSchedules();
  const index = schedules.findIndex((s) => s.id === id);
  if (index === -1) return false;

  schedules.splice(index, 1);
  writeSchedules(schedules);
  return true;
}

module.exports = { getAll, getById, getByCourseId, create, update, remove };
