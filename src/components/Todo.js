import React, { useEffect, useReducer, useMemo } from 'react';
import axios from 'axios';
import * as db from '../endpoints';

import List from './List';
import { useFormInput } from '../hooks/forms';

const todo = props => {
  // const [inputIsValid, setInputIsValid] = useState(false);
  // const [todoName, setTodoName] = useState('');
  // const [submittedTodo, setSubmittedTodo] = useState(null);
  // const [todoList, setTodoList] = useState([]);
  // const todoInputRef = useRef();
  const todoInput = useFormInput();

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
    axios.get(db.POSTS_DB + '.json')
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
  }, []);

  // const handleMouseMove = e => {
  //   console.log(e.clientX, e.clientY);
  // }

  // useEffect(() => {
  //   document.addEventListener('mousemove', handleMouseMove);
  //   return () => {
  //     document.removeEventListener('mousemove', handleMouseMove);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (submittedTodo) {
  //     dispatch({type: 'ADD', payload: submittedTodo});
  //   }
  // }, [submittedTodo]);

  // const handleInputChange = e => {
  //   setTodoName(e.target.value);
  // }

  // const handleInputValidation = e => {
  //   if (e.target.value.trim() === '') setInputIsValid(false);
  //   setInputIsValid(true);
  // }

  const handleAddTodo = () => {
    const todoName = todoInput.value;
    axios.post(db.POSTS_DB + '.json', {name: todoName})
    .then(res => {
      setTimeout(() => {
        const todoItem = { id: res.data.name, name: todoName }
        dispatch({type: 'ADD', payload: todoItem});
      }, 0);
    })
    .catch(err => {
      console.log(err);
    });
  }

  const handleRemoveTodo = todoId => () => {
    axios.delete(db.POSTS_DB + `/${todoId}.json`)
    .then(res => {
      dispatch({type: 'REMOVE', payload: todoId});
    })
    .catch(err => console.log(err));
  }

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        // onChange={handleInputChange}
        // value={todoName}
        // ref={todoInputRef}
        // onChange={handleInputValidation}
        onChange={todoInput.onChange}
        value={todoInput.value}
        style={{backgroundColor: todoInput.validity === true ? 'transparent' : 'salmon'}}
      />
      <button type="button" onClick={handleAddTodo}>Add</button>
      {useMemo(() => (
        <List items={todoList} onClick={handleRemoveTodo} />
        ),
        [todoList]
      )}
    </React.Fragment>
  )
}

export default todo;
