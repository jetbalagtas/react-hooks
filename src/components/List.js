import React from 'react';

const list = props => {
  console.log('Rendering the list...');
  
  return (
    <ul>
      {props.items.map(item => (
        <li key={item.id} onClick={props.onClick(item.id)}>{item.name}</li>
      ))}
    </ul>
  );
};

export default list;
