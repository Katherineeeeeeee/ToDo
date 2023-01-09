const express = require("express");
const path = require("path");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.pluralize(null);
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static("frontend/build/"));

const PORT = process.env.PORT || 3000;
const url = process.env.DB_HOST;

const connection = mongoose.connect(url, { dbName: "ToDo" });

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );

const {
  addTodo,
  getTodos,
  removeTodo,
  toggle,
  clear,
} = require("./repository");

app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});

app.get("/todos", async (req, res, next) => {
  const todos = await getTodos();
  res.status(200).json(todos);
});

//toggle
app.patch("/todos", async (req, res, next) => {
  const todos = await toggle(req);
  res.status(200).json(todos);
});

//add
app.post("/todos", async (req, res) => {
  const todos = await addTodo(req);
  res.status(201).json(todos);
});

//delete todo
app.delete("/todos", async (req, res) => {
  const todos = await removeTodo(req);
  res.status(200).json(todos);
});

//delete all
app.delete("/todos-all", async (req, res) => {
  const todos = await clear();
  res.status(200).json(todos);
});
