var mongo = require("mongodb");

const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const morgan = require("morgan");
// const helmet = require("helmet");
const Joi = require("joi");
const express = require("express");
const app = express();
// const app = express();
const ObjectId = require("mongodb");
const bodyParser = require("body-parser");
const mongodb = require("./library/mongodb");
const usersModel = require("./methods/users");
const { ObjectID } = require("bson");
const { date } = require("joi");

console.log(`Node_ENV: ${process.env.Node_ENV}`);
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.json());
app.use(express.json({ extended: true }));
app.use(express.static("public"));
const courses = [
  {
    id: 1,
    name: "priti",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "rinkal",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "piyush",
    status: "ACTIVE",
  },
  /* {
    id: 4,
    name: "shailesh",
    status: 'ACTIVE'
  }
  */
];

// app.get("/", (req, res) => {
//   res.send("helloword");
// });

// app.get("/api/courses", (req, res) => {
//   res.send([1, 2, 3]);
// });

// app.get("/gett", (req, res) => {
//   res.send(courses);
// });

// app.get("/api/courses/id", (req, res) => {
//   res.send(req.params.id);

// });

// app.get("/users/:id", async (req, res) => {
//   const userInfo = await usersModel.find({ id: req.params.id });
//   res.json(userInfo);
// });

app.post("/users", async (req, res) => {
  var userInfo = {
    firstname: req.body.firstname,
    // id: req.body.id,
    lastname: req.body.lastname,
    email: req.body.email,
    birthdate: req.body.birthdate,
    joindate: req.body.joindate,
  };
  // courses.push(userInfo);
  // console.log(">>>> courses >>>>", courses);

  await usersModel.insert(userInfo);
  res.json(userInfo);
});

app.get("/users", async (req, res) => {
  console.log(">>>>>", req.query._id);
  const userInfo = await usersModel.findOne({
    _id: ObjectID(req.query._id),
  });
  res.json(userInfo);
});

app.patch("/users", async (req, res) => {
  console.log(">>>>", req.body);
  const userInfo = await usersModel.update(
    { _id: ObjectID(req.body._id) },
    { $set: { lastname: req.body.lastname } }
  );
  res.json(userInfo);
});

app.put("/users", async (req, res) => {
  console.log(">>>>>", req.body);
  const userInfo = await usersModel.findOneAndUpdate(
    { _id: ObjectID(req.body._id) },
    { $set: { status: "active" } }
  );
  res.json(userInfo);
});

app.delete("/users/demo", async (req, res) => {
  console.log(">>>>", req.body);
  const userInfo = await usersModel.remove({ _id: ObjectID(req.body._id) });

  res.json(userInfo);
});

app.delete("/users", async (req, res) => {
  console.log(">>>>", req.body);
  const userInfo = await usersModel.deleteMany(
    { _id: ObjectID(req.body._id) },
    { lastname: null }
  );
});

// app.patch("/users/demo", (req, res) => {
//   const id = req.body.id;
//   const name = req.body.name;

//   courses.map((course) => {
//     if (course.id == id) course.name = name;
//   });
//   console.log(">>>>", courses);

//   res.send({ status: "active/deactive" });
// });

// app.put("/put", (req, res) => {
//   res.send({ courses, id: 4, name: "shailesh", status: "active" });
// });

// app.put("/api/courses/:_id", (req, res) => {
//   const course = courses.find((c) => c._id === parseInt(req.params._id));
//   console.log(course);
//   if (!course) res.status(404).send("the course of given id was not found");
//   const { error } = validateCourse(req.body);

//   if (error) {
//     res.status(400).send(result.error.details[0].message);
//     return;
//   }
//   course.name = req.body.name;
//   res.send(course);
// });

function validateCourse(course) {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(15).required(),
    lastname: Joi.string().min(3).max(20),

    birth_year: Joi.number().integer().min(1995).max(2021),
  });
  return schema.validate(course);
}

// app.delete("/api/courses/:id", (req, res) => {
//   const course = courses.find((c) => c.id === parseInt(req.params.id));
//   console.log(course);
//   if (!course) res.status(404).send("the course of given id was not found");

//   const index = courses.indexOf(course);
//   courses.splice(index, 1);
//   res.send(course);
// });

// app.patch("/api/courses/:id", (req, res) => {
//   res.send({ status: "active/deactive" });
// });

const port = process.env.port || 3006;
app.listen(port, () => {
  mongodb.connect();
  console.log(`listening port num ${port} ....`);
});
