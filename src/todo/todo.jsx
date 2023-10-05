import React, { useState } from 'react';
import './todo.css';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedValue, setEditedValue] = useState('');

  
  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const timestamp = new Date().getTime();
      const item = {
        id: timestamp,
        value: newTodo,
      };

      setTodos([...todos, item]);
      setNewTodo('');
    }
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  
    if (editingTodo === id) {
      setEditingTodo(null);
     setEditedValue('');
    }
  };
  
  const startEditing = (id, value) => {
    setEditingTodo(id);
    setEditedValue(value);
  };

  const saveEditedTodo = () => {
    if (editedValue.trim() !== '') {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingTodo ? { ...todo, value: editedValue } : todo
      );
      setTodos(updatedTodos);
      setEditingTodo(null);
      setEditedValue('');
    }
  };
  

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodo === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                />
                <button onClick={saveEditedTodo}>Save</button>
               
              </>
            ) : (
              <>
                {todo.value}
                <button onClick={() => startEditing(todo.id, todo.value)}>
                  Edit
                </button>
                <button onClick={() => removeTodo(todo.id)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
