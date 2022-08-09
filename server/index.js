const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

//express config
const app = express();
//cors configuration
app.use(cors());

//json conversion
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/taskmanagment");

//model
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Task = mongoose.model("task", taskSchema);

//router
// post
app.post("/", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
  } catch (error) {
    console.log(error);
  }
  res.send(task);
});

//get
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

//get by id
app.get("/task/:id", async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id });
  res.send(task);
});

//edit
app.put("/:id", async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id });
  task.title = req.body.title;
  task.description = req.body.description;
  await task.save();
  res.send(task);
});

//delete
app.delete("/:id", async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id });
  res.send(task);
});

//server
app.listen(5000, () => {
  console.log("My app is working on port number 5000");
});
