import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },

  resourceName: {
    type: String,
    required: true,
    trim: true
  },
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Matériel', 'Logiciel', 'Humain', 'Autre','Equipment','Software'] // Liste de types possibles
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  supplier: {
    type: String,
    required: true,
    trim: true
  }
});

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;