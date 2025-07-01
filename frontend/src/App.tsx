import { useEffect, useState } from 'react';
import axios from 'axios';

type Task = {
  id: number;
  name: string;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/tasks')
      .then((res) => setTasks(res.data))
      .catch((err) => console.error('Erro ao buscar tarefas:', err));
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const res = await axios.post('http://localhost:3000/tasks', { name: newTask });
      setTasks([...tasks, res.data]);
      setNewTask('');
    } catch (err) {
      console.error('Erro ao adicionar tarefa:', err);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error('Erro ao remover tarefa:', err);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Lista de Tarefas</h1>

      <input
        type="text"
        value={newTask}
        placeholder="Digite uma tarefa"
        onChange={(e) => setNewTask(e.target.value)}
        style={{ marginRight: '0.5rem' }}
      />
      <button onClick={addTask}>Adicionar</button>

      <ul style={{ marginTop: '1rem' }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: '0.5rem' }}>
            {task.name}{' '}
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '0.5rem' }}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
