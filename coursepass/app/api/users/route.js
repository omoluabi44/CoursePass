// app/api/page.js
export async function GET() {
  return new Response(
    JSON.stringify({
      // app/api/courses/route.js

// Mock data for courses
courses:[
  {
    id: 1,
    name: "Math 101",
    semester: "First Semester",
    department: "Mechanical Engineering",
    college: "College of Engineering",
    level: "100 Level",
  },
  {
    id: 2,
    name: "Physics 101",
    semester: "First Semester",
    department: "Mechatronics Engineering",
    college: "College of Engineering",
    level: "100 Level",
  },
  {
    id: 3,
    name: "CHM 103",
    semester: "Second Semester",
    department: "Mechanical Engineering",
    college: "College of Applied Social Science",
    level: "100 Level",
  },
  {
    id: 4,
    name: "CHM 107",
    semester: "First Semester",
    department: "Banking and Finance",
    college: "College of Applied Social Science",
    level: "100 Level",
  },
  {
    id: 5,
    name: "GST 103",
    semester: "Second Semester",
    department: "Mechatronics Engineering",
    college: "College of Engineering",
    level: "100 Level",
  },
  {
    id: 6,
    name: "Math 201",
    semester: "First Semester",
    department: "Mechanical Engineering",
    college: "College of Engineering",
    level: "200 Level",
  },
  {
    id: 7,
    name: "Physics 201",
    semester: "Second Semester",
    department: "Mechatronics Engineering",
    college: "College of Engineering",
    level: "200 Level",
  },
  {
    id: 8,
    name: "CHM 203",
    semester: "First Semester",
    department: "Mechanical Engineering",
    college: "College of Applied Social Science",
    level: "200 Level",
  },
  {
    id: 9,
    name: "CHM 207",
    semester: "Second Semester",
    department: "Banking and Finance",
    college: "College of Applied Social Science",
    level: "200 Level",
  },
  {
    id: 10,
    name: "GST 203",
    semester: "First Semester",
    department: "Mechatronics Engineering",
    college: "College of Engineering",
    level: "200 Level",
  },
  {
    id: 11,
    name: "Math 301",
    semester: "First Semester",
    department: "Mechanical Engineering",
    college: "College of Engineering",
    level: "300 Level",
  },
  {
    id: 12,
    name: "Physics 301",
    semester: "Second Semester",
    department: "Mechatronics Engineering",
    college: "College of Engineering",
    level: "300 Level",
  },
  {
    id: 13,
    name: "CHM 303",
    semester: "First Semester",
    department: "Mechanical Engineering",
    college: "College of Applied Social Science",
    level: "300 Level",
  },
  {
    id: 14,
    name: "CHM 307",
    semester: "Second Semester",
    department: "Banking and Finance",
    college: "College of Applied Social Science",
    level: "300 Level",
  },
  {
    id: 15,
    name: "GST 303",
    semester: "First Semester",
    department: "Mechatronics Engineering",
    college: "College of Engineering",
    level: "300 Level",
  },
]



    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function POST() {
  return new Response("Method POST Not Allowed", {
    status: 405,
    headers: { Allow: "GET" },
  });
}
