import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  projectName: {
    type: String,
    required: true,
    trim: true
  }

});

const Task = mongoose.model('Task', taskSchema);

export default Task;