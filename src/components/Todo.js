import React, { useState } from 'react';

const todo = props => {
  const inputState = useState('');

  const handleInputChange = e => {
    inputState[1](e.target.value);
  }

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        onChange={handleInputChange}
        value={inputState[0]}
      />
      <button type="button">Add</button>
      <ul />
    </React.Fragment>
  )
}

export default todo;
