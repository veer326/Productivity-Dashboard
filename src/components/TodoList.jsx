import React, { useState, useEffect } from 'react';

export default function TodoList() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: task, done: false }]);
    setTask('');
  };

  const handleToggle = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="widget todo-list">
      <h2>📝 To-Do List</h2>
      <div className="input-group">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul>
        {tasks.map((t) => (
          <li key={t.id} className={t.done ? 'done' : ''}>
            <span onClick={() => handleToggle(t.id)}>{t.text}</span>
            <button onClick={() => handleDelete(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
