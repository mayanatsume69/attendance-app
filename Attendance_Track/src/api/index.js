import uuid from "node-uuid";
import _ from "lodash";

// Seed localStorage._students
if (localStorage._students === undefined) {
  localStorage.setItem(
    "_students",
    JSON.stringify([
      {
        lastName: "Jones",
        firstName: "Jessica",
        id: "7ae6c6e0-8912-11e6-ae55-995190a07d86",
        atSchool: false,
        entries: [
          { text: "Doctor's appointment", date: "2016-10-06", time: "12:30" }
        ],
        rollCallPresent: false
      },
      {
        lastName: "Cage",
        firstName: "Luke",
        id: "8ze6c6e0-8912-11e6-ae55-995190a07d86",
        atSchool: true,
        entries: [],
        rollCallPresent: true
      },
      {
        lastName: "Carter",
        firstName: "Sophia",
        id: "9pz3c6e0-8912-11e6-ae55-995190a07z56",
        atSchool: true,
        entries: [],
        rollCallPresent: false
      },
      {
        lastName: "Owens",
        firstName: "Terrel",
        id: "2ef3c6e0-8912-11e6-ae55-995190a07d22",
        atSchool: true,
        entries: [],
        rollCallPresent: false
      },
      {
        lastName: "McDonald",
        firstName: "Ronald",
        id: "2eg3c1e0-8912-11e6-ae55-995190a07d85",
        atSchool: true,
        entries: [],
        rollCallPresent: false
      },
      {
        lastName: "Parker",
        firstName: "Sarah",
        id: "9pq5c1e0-8912-21e6-ae53-110260a07d44",
        atSchool: true,
        entries: [],
        rollCallPresent: false
      }
    ])
  );
}

function _setStudents(students) {
  return localStorage.setItem("_students", JSON.stringify(students));
}

function _getStudents() {
  return JSON.parse(localStorage.getItem("_students")) || [];
}

// Create new student
export function newStudent(student) {
  let students;
  try {
    students = _getStudents();
  } catch (e) {
    students = [];
  }

  if (typeof students !== "object") {
    students = [];
  }

  student.id = uuid.v1();
  student.atSchool = true;
  student.entries = [];

  // students array from the 'try' or the catch adds the student to itself
  students = [...students, student];

  _setStudents(students);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(students), 750);
  });

  return promise;
}

// Get current list of students
export function getStudents() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(
      () => resolve(JSON.parse(localStorage.getItem("_students")) || []),
      180
    );
  });

  return promise;
}

// Remove student with id in argument
export async function removeStudent(studentId) {
  const students = await getStudents();
  const newStudents = _.reject(students, student => student.id === studentId);
  _setStudents(newStudents);
  return newStudents;
}

// Add entry to a student
export async function addEntry(studentId, entry, atSchool) {
  const students = await getStudents();
  const student = students.find(student => student.id === studentId);
  if (!student) {
    throw new Error("Student ID not found");
  }

  student.atSchool = JSON.parse(atSchool.toLowerCase());
  student.entries = student.entries || [];
  student.entries = [...student.entries, entry];
  _setStudents(students);
  return students;
}

export async function toggleRollCallPresent(studentId) {
  const students = await getStudents();
  const student = students.find(student => student.id === studentId);
  if (!student) {
    throw new Error("Student ID not found");
  }
  student.rollCallPresent = !student.rollCallPresent;
  _setStudents(students);
  return students;
}
