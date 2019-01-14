import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import * as db from '../endpoints';

const todo = props => {
  const [todoName, setTodoName] = useState('');
  const [submittedTodo, setSubmittedTodo] = useState(null);
  // const [todoList, setTodoList] = useState([]);

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return state.concat(action.payload);
      case 'SET':
        return action.payload;
      case 'REMOVE':
        return state.filter(todo => todo.id !== action.payload);
      default:
        return state;
    }
  };

  const [todoList, dispatch] = useReducer(todoListReducer, []);

  useEffect(() => {
    axios.get(db.POSTS_DB)
    .then(result => {
      console.log(result);
      const todoData = result.data;
      const todos = [];
      for (const key in todoData) {
        todos.push({id: key, name: todoData[key].name})
      }
      dispatch({type: 'SET', payload: todos});
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
      dispatch({type: 'ADD', payload: submittedTodo});
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
