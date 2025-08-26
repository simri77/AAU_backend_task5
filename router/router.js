import express from 'express';
import * as controller from '../controllers/controller.js';
import { authenticate, authorize } from '../middleware/auth_middleware.js';

const router = express.Router();

// --- User routes ---
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/promote', authenticate, authorize(['admin']), controller.promote);

// --- Task routes ---
router.post('/', authenticate, authorize(['admin']), controller.createTask);
router.get('/', authenticate, controller.getAllTasks);
router.get('/:id', authenticate, controller.getTaskById);
router.put('/:id', authenticate, authorize(['admin']), controller.updateTask);
router.delete('/:id', authenticate, authorize(['admin']), controller.deleteTask);

export default router;
