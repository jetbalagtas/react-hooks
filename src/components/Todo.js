import React, { useState } from 'react';

const todo = props => {
  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleInputChange = e => {
    setTodoName(e.target.value);
  }

  const handleAddTodo = () => {
    setTodoList(todoList.concat(todoName));
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
