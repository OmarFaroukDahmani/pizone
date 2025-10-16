import { useState, useEffect, useRef } from 'react';
import '../style/todo.css';
import Navbar from '../components/Navbar';
import { Helmet } from 'react-helmet-async'

const STORAGE_KEY = 'simple_todos_v2';

const getInitialTodos = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export default function TodoApp() {
  const [todos, setTodos] = useState(getInitialTodos);
  const [filter, setFilter] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setTodos([{ id: Date.now(), text: trimmed, completed: false }, ...todos]);
    setInputValue('');
    inputRef.current?.focus();
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => setTodos(todos.filter(t => t.id !== id));

  const editTodo = (id, newText) => {
    const trimmed = newText.trim();
    if (!trimmed) {
      deleteTodo(id);
      return;
    }
    setTodos(todos.map(t => t.id === id ? { ...t, text: trimmed } : t));
  };

  const clearCompleted = () => setTodos(todos.filter(t => !t.completed));

  const toggleAll = () => {
    const allCompleted = todos.every(t => t.completed);
    setTodos(todos.map(t => ({ ...t, completed: !allCompleted })));
  };

  const filteredTodos = todos.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed
  );

  const activeCount = todos.filter(t => !t.completed).length;
  const todosExist = todos.length > 0;

  const TodoItem = ({ todo }) => {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(todo.text);
    const itemInputRef = useRef(null);

    useEffect(() => setText(todo.text), [todo.text]);
    useEffect(() => { if (editing) itemInputRef.current?.focus(); }, [editing]);

    const save = () => {
      editTodo(todo.id, text);
      setEditing(false);
    };

    return (
      <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
        {editing ? (
          <input
            ref={itemInputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={save}
            className="edit-input"
            onKeyDown={(e) => { 
              if (e.key === 'Enter') save(); 
              if (e.key === 'Escape') setEditing(false); 
            }}
          />
        ) : (
          <div className="todo-display-wrapper">
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => toggleTodo(todo.id)} 
            />
            <span 
              className="todo-text"
              onDoubleClick={() => setEditing(true)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
              &times;
            </button>
          </div>
        )}
      </li>
    );
  };

  return (
    <>
      <Helmet>
        <title>Pizone: To-Do List & Task Manager for Students</title>
        <meta name="description" content="Use the Pizone To-Do List to plan your study sessions, set priorities, and keep track of daily and weekly learning goals efficiently." />
      </Helmet>
      <Navbar/>
      <div className="todo-container">
        <div className="page-header">
          <h1>To-Do List 📝</h1>
          <p>Keep track of your tasks throughout the day.</p>
        </div>
        
        <div className="todo-box">
          <h3 className="todo-title">Task List</h3>
          
          <form onSubmit={addTodo} className="todo-input-form">
            <button 
              type="button" 
              onClick={toggleAll} 
              className="toggle-all-btn"
              disabled={!todosExist}
            >
              &#x2195;
            </button>
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add a new task..."
            />
          </form>

          {filteredTodos.length > 0 ? (
            <ul className="todo-list">
              {filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
            </ul>
          ) : (
            <div className="empty-state">
              {todosExist ? "No tasks match the current filter." : "You're all caught up! Add a new task above."}
            </div>
          )}
          
          <div className="todo-footer">
            <div className="items-left">{activeCount} items left</div>
            
            <div className="todo-filters">
              {['All', 'Active', 'Completed'].map(f => (
                <button 
                  key={f} 
                  onClick={() => setFilter(f.toLowerCase())} 
                  className={filter === f.toLowerCase() ? 'active' : ''}
                >
                  {f}
                </button>
              ))}
            </div>
            
            <button 
              onClick={clearCompleted} 
              disabled={activeCount === todos.length} 
              className="clear-completed-btn"
            >
              Clear Completed
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
