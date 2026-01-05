import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

useEffect(() => {
  inputRef.current.focus();
}, []);
  

  // Add new task
  const addTodo = () => {
    const trimmed = task.trim();
    if (!trimmed) return;

    const newTodo = {
      id: Date.now(),
      title: trimmed,
      done: false,
    };

    setTodos([newTodo, ...todos]);
    setTask("");
  };

  // Toggle completed
  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  // Delete task
  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const pending = todos.filter((t) => !t.done);
  const completed = todos.filter((t) => t.done);

  return (
    <div className="app">
      <h1>📝 My To-Do List</h1>

      <div className="input-box">
        <input
          ref={inputRef}
          type="text"
          value={task}
          placeholder="Enter a new task"
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="tasks-section">
        <h2>Pending Tasks ({pending.length})</h2>
        {pending.length === 0 ? (
          <p className="empty">No pending tasks!</p>
        ) : (
          <ul>
            {pending.map((t) => (
              <li key={t.id} className="pending">
                <span>{t.title}</span>
                <div>
                  <button onClick={() => toggleTodo(t.id)}>✔</button>
                  <button onClick={() => deleteTodo(t.id)}>❌</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="tasks-section">
        <h2>Completed Tasks ({completed.length})</h2>
        {completed.length === 0 ? (
          <p className="empty">No completed tasks yet.</p>
        ) : (
          <ul>
            {completed.map((t) => (
              <li key={t.id} className="completed">
                <span>{t.title}</span>
                <div>
                  <button onClick={() => toggleTodo(t.id)}>↩</button>
                  <button onClick={() => deleteTodo(t.id)}>❌</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
