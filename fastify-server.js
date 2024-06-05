const fastify = require("fastify")();
const students = [
  {
    id: 1,
    last: "Last1",
    first: "First1",
  },
  {
    id: 2,
    last: "Last2",
    first: "First2",
  },
  {
    id: 3,
    last: "Last3",
    first: "First3",
  },
];

//Get route and JSON/object reply
fastify.get("/cit", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; chatset = utf-8")
    .send({ test: "This is a test" });
});

fastify.post("/cit/student", (request, reply) => {
    const {first = "", last = ""} = request.body;
    const newStudent = {
        id: students.length + 1,
        first,
        last
    }
    students.push(newStudent)
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(newStudent);
  });

fastify.get("/cit/student", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset = utf-8")
    .send(students);
});

function findStudentByID(id) {
    return students.find(s => s.id === id)
}

fastify.get("/cit/student/:id", (request, reply) => {
  const { id } = request.params;
  if (id.length > 0) {
    let student = findStudentByID(parseInt(id));
    if (student !== undefined) {
      reply
        .code(200)
        .header("Content-Type", "application/json; charset = utf-8")
        .send(student);
    } else {
      reply
        .code(404)
        .header("Content-Type", "application/json; charset = utf-8")
        .send({ error: "No student ID found" });
    }
  } else {
    reply
      .code(404)
      .header("Content-Type", "application/json; charset = utf-8")
      .send({ error: "No student ID provided" });
  }
});

fastify.get("*", (request, reply) => {
  reply
    .code(404)
    .header("Content-Type", "text/html; charset = utf-8")
    .send("<h1>Unsupported request or page!</h1>");
});

//Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8082;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
