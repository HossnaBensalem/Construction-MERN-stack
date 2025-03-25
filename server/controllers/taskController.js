import Task  from '../models/Task.js';

// Créer une tâche
const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer toutes les tâches
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('project'); // Récupérer les détails du projet lié
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer une tâche par ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project');
    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une tâche
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une tâche
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json({ message: 'Tâche supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {createTask,getTasks,getTaskById,updateTask,deleteTask}