import React, { useState } from 'react';

const todo = props => {
  const [todoName, setTodoName] = useState('');

  const handleInputChange = e => {
    setTodoName(e.target.value);
  }

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        onChange={handleInputChange}
        value={todoName}
      />
      <button type="button">Add</button>
      <ul />
    </React.Fragment>
  )
}

export default todo;
