import * as userService from '../data/user_service.js';
import * as taskService from '../data/task_service.js';

// ---- User Controllers ----
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userService.registerUser(username, password);
    res.status(201).json({ id: user._id, username: user.username, role: user.role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await userService.loginUser(username, password);
    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const promote = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await userService.promoteUser(username);
    res.json({ id: user._id, username: user.username, role: user.role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ---- Task Controllers ----
export const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: 'Invalid Task ID' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid Task ID' });
  }
};
