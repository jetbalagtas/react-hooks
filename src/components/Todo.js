import React, { useState } from 'react';
import axios from 'axios';
import * as db from '../endpoints';

const todo = props => {
  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleInputChange = e => {
    setTodoName(e.target.value);
  }

  const handleAddTodo = () => {
    setTodoList(todoList.concat(todoName));
    axios.post(db.POST_DB, {name: todoName})
    .then(res => {
      console.log(res);
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
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </React.Fragment>
  )
}

export default todo;
