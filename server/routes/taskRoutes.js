import express from 'express';
const router = express.Router();
import taskController from '../controllers/taskController.js';

router.post('/tasks', taskController.createTask);   
router.get('/tasks', taskController.getTasks);      
router.get('/tasks/:id', taskController.getTaskById); 
router.put('/tasks/:id', taskController.updateTask);  
router.delete('/tasks/:id', taskController.deleteTask); 
export default router;