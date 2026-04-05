const express = require('express');
const router = express.Router();
const db = require('../models/db.config.js')


const { getDept, addTask, getAllTask, getTaskById, getTaskByName, getTaskBySal, updateTask, deleteTask } = require('../services/taskServices.js');

router.get('/', async(req, res)=>{
  const [rows] = await db.query("SELECT * FROM tasks ORDER BY createdAt DESC;");
  return res.send(200).json(rows);
});
router.post('/addTask', async (req,res) => {
    const {title, desc, completed, category, due } = req.body; 
    if(title !== undefined && title.trim() === ""){
      return res.send(404).json({error: 'Task title cannot be empty'});
    }
    try{
      const res = db.query("INSERT INTO tasks (title, description, category, dueDate) VALUES (?,?,?,?)",[title, desc, completed, category|| 'General', due]);
      res.send(200).json({id: result.insertId, title, description, result: "Task added successfully"});
    }catch(e){
      return res.send(404).json({error: 'Task could not be added'});
    }
    
});
router.patch('/completeTask/:id', async(req,res)=>{

  try{
    const { id } = req.params;
    if (rows.length === 0) return res.status(404).json({ error: "Task not found" });
    
    if (rows[0].completed) {
      return res.status(400).json({ error: "Task is already marked as completed." });
    }else{
    const res = db.query("UPDATE TABLE tasks SET completed = true WHERE id = ?",[id]);
    res.send(200).json({result: "Task marked as complete"});
    }
  }catch(e){
    return res.send(404).json({error: "Could not update task status. Please try again."});
  }
});
router.put('/updateTask/:id', async (req,res) => {
  const { id } = req.params;
  const { title, description, category, dueDate } = req.body;

  try {
    if (title !== undefined && title.trim() === "") {
      return res.status(400).json({ error: "Task title cannot be empty" });
    }

    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    const updates = [];
    const values = [];

    if (title) { updates.push('title = ?'); values.push(title); }
    if (description !== undefined) { updates.push('description = ?'); values.push(description); }
    if (category) { updates.push('category = ?'); values.push(category); }
    if (dueDate) { updates.push('dueDate = ?'); values.push(dueDate); }

    if (updates.length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }
    
    const sql = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`;
    await db.query(sql, values);

    res.json({ result: "Task updated successfully", updatedFields: updates.length });
  } catch (err) {
    res.status(500).json({ error: "Database error occurred while updating" });
  }
});

router.delete('/deleteTask/:id', async (req,res) => {
  const { id } = req.params.id;
const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [ id ]);
  if (result.affectedRows === 0) return res.status(404).json({ error: "Task not found" });
  res.json({ result: "Task deleted successfully" });
});

module.exports = router;