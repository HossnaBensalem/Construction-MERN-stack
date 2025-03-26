import Resource from '../models/Resource.js';

// Créer une ressource
const createResource = async (req, res) => {
  try {
    const resource = new Resource(req.body);
    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer toutes les ressources
const getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer une ressource par ID
const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Ressource non trouvée' });
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une ressource
const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resource) return res.status(404).json({ message: 'Ressource non trouvée' });
    res.json(resource);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une ressource
const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Ressource non trouvée' });
    res.json({ message: 'Ressource supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {createResource,getResources,getResourceById,updateResource,deleteResource}