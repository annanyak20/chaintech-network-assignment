const express = require('express');
const router = express.Router();
const db = require('../models/db.config.js')


router.get('/', async(req, res)=>{
  try {
        const [rows] = await db.query("SELECT * FROM tasks ORDER BY createdAt DESC;");
        return res.status(200).json(rows); 
    } catch (e) {
        return res.status(500).json({ error: "Server error.No rows found." });
    }
});
router.post('/addTask', async (req,res) => {
    const {title, desc, completed, category, due } = req.body; 
    if(title !== undefined && title.trim() === ""){
      return res.status(400).json({error: 'Task title cannot be empty'});
    }
    try{
      const [result] = await db.query("INSERT INTO tasks (title, description, category, dueDate) VALUES (?,?,?,?)",[title, desc, category|| 'General', due]);
      return res.status(200).json({id: result.insertId, title, desc });
    }catch(e){
      return res.status(500).json({error: 'Task could not be added'});
    }
    
});
router.patch('/completeTask/:id', async(req,res)=>{

  try{
    const { id } = req.params;
    const [rows] = await db.query("SELECT completed FROM tasks WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(500).json({ error: "Task not found" });
        }

        if (rows[0].completed) {
            return res.status(400).json({ error: "Task is already marked as completed." });
        }
        await db.query("UPDATE tasks SET completed = true WHERE id = ?", [id]);
        return res.status(200).json({ result: "Task marked as complete" });
  }catch(e){
    return res.status(500).json({error: "Could not update task status. Please try again."});
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
      return res.status(500).json({ error: "Task not found" });
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
    values.push(id);
    
    const sql = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`;
    await db.query(sql, values);

    res.json({ result: "Task updated successfully", updatedFields: updates.length });
  } catch (err) {
    res.status(500).json({ error: "Database error occurred while updating" });
  }
});

router.delete('/deleteTask/:id', async (req,res) => {
  const { id } = req.params;
const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [ id ]);
  if (result.affectedRows === 0) return res.status(500).json({ error: "Task not found" });
  res.json({ result: "Task deleted successfully" });
});

module.exports = router;