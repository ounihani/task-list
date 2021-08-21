let mongoose = require('mongoose');

//Task schema
let TaskSchema = mongoose.Schema({
  task_name: {
    type: String,
    required: true
  }
});

//   Task List Schema
let TaskListSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tasks: [TaskSchema]
});


module.exports = mongoose.model('TaskList', TaskListSchema);
