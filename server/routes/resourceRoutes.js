import express from 'express';
const router = express.Router();
import resourceController from '../controllers/resourceController.js';

router.post('/resources', resourceController.createResource);   
router.get('/resources', resourceController.getResources);        
router.get('/resources/:id', resourceController.getResourceById); 
router.put('/resources/:id', resourceController.updateResource);  
router.delete('/resources/:id', resourceController.deleteResource); 

export default router;