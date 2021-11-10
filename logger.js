// app.use(express.json());
// app.use(express.json({ extended: true }));

const express = require("express");

const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

console.log(`Node_ENV: ${process.env.Node_ENV}`);
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("morgan enabled.");
}

dbDebugger("connected to database.....");

const port = process.env.port || 3006;
app.listen(port, () => console.log(`listening port num ${port} ....`));
