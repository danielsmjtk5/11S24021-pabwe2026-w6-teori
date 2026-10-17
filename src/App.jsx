import { useState, useEffect } from 'react';

export default function App() {
  // PERBAIKAN KF-07: Menggunakan Lazy Initialization pada useState
  // React hanya akan menjalankan fungsi ini sekali saat pertama kali dimuat
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tuntas_tasks');
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (error) {
        console.error("Gagal membaca data dari localStorage", error);
        return [];
      }
    }
    return []; // Jika kosong, kembalikan array kosong
  });

  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Efek ini sekarang murni hanya untuk menyimpan data saat ada perubahan pada state 'tasks'
  useEffect(() => {
    localStorage.setItem('tuntas_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const newTaskObj = {
      id: crypto.randomUUID(),
      text: newTask,
      completed: false
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleStartEdit = (task) => {
    setEditingId(task.id);
    setEditValue(task.text);
  };

  const handleSaveEdit = (id) => {
    if (!editValue.trim()) return;
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: editValue } : task
    ));
    setEditingId(null);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; 
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans text-gray-800">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Tuntas</h1>
        
        <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Apa yang ingin Anda kerjakan?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Tambah
          </button>
        </form>

        <div className="flex justify-center gap-2 mb-6 border-b pb-4">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                filter === f 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {f === 'all' ? 'Semua' : f === 'active' ? 'Belum Selesai' : 'Selesai'}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-500 py-4">Tidak ada tugas yang ditemukan.</p>
          ) : (
            filteredTasks.map(task => (
              <div 
                key={task.id} 
                className={`flex items-center justify-between p-3 border rounded-lg transition ${
                  task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
                }`}
              >
                {editingId === task.id ? (
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      className="flex-1 border-b border-blue-500 focus:outline-none bg-transparent"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      autoFocus
                    />
                    <button onClick={() => handleSaveEdit(task.id)} className="text-green-600 text-sm font-medium">Simpan</button>
                    <button onClick={() => setEditingId(null)} className="text-gray-500 text-sm font-medium">Batal</button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 overflow-hidden">
                      <input 
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id)}
                        className="w-5 h-5 accent-blue-600 cursor-pointer"
                      />
                      <span className={`truncate ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {task.text}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 ml-4">
                      <button 
                        onClick={() => handleStartEdit(task)}
                        className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Hapus
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}