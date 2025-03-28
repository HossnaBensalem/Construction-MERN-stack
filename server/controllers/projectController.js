import Project from '../models/Project.js';
import Task from '../models/Task.js';
import Resource from '../models/Resource.js'; 

// Create a project
const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    console.log(project);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a project and its associated tasks and resources
const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    // 1. First delete all tasks associated with this project
    await Task.deleteMany({ project: projectId });
    
    // 2. Delete all resources associated with this project
    await Resource.deleteMany({ project: projectId });
    
    // 3. Then delete the project itself
    const project = await Project.findByIdAndDelete(projectId);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json({ 
      message: 'Project, its associated tasks, and resources deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectById
};