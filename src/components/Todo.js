import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as db from '../endpoints';

const todo = props => {
  const [todoName, setTodoName] = useState('');
  const [submittedTodo, setSubmittedTodo] = useState(null);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    axios.get(db.POSTS_DB)
    .then(result => {
      console.log(result);
      const todoData = result.data;
      const todos = [];
      for (const key in todoData) {
        todos.push({id: key, name: todoData[key].name})
      }
      setTodoList(todos);
    });
    return () => {
      console.log('Cleanup...');
    }
  }, [todoName]);

  const handleMouseMove = e => {
    console.log(e.clientX, e.clientY);
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    if (submittedTodo) {
      setTodoList(todoList.concat(submittedTodo));
    }
  }, [submittedTodo]);

  const handleInputChange = e => {
    setTodoName(e.target.value);
  }

  const handleAddTodo = () => {
    axios.post(db.POSTS_DB, {name: todoName})
    .then(res => {
      setTimeout(() => {
        const todoItem = { id: res.data.name, name: todoName }
        setSubmittedTodo(todoItem);
      }, 0);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        onChange={handleInputChange}
        value={todoName}
      />
      <button type="button" onClick={handleAddTodo}>Add</button>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </React.Fragment>
  )
}

export default todo;
