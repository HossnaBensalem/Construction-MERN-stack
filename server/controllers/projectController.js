import Project from '../models/Project.js'
// Créer un projet
const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer tous les projets
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un Project par ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    console.log(project);
    if (!project) return res.status(404).json({ message: 'Project non trouvée' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Mettre à jour  Project
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Project non trouvée' });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Supprimer  Project
const deleteProject = async (req, res) => {
  try {
    console.log("Hello Delete");
    const project = await Project.findByIdAndDelete(req.params.id);
    console.log(project);
    if (!project) return res.status(404).json({ message: 'Project non trouvée' });
    res.json({ message: 'Project supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export default {getProjects, createProject,updateProject,deleteProject,getProjectById};