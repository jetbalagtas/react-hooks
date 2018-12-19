import React, { useState } from 'react';

import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';

const app = props => {
  const [page, setpage] = useState('auth');

  const switchPage = pageName => {
    setpage(pageName);
  };

  return (
    <div className="App">
      <Header
        onLoadTodos={switchPage.bind(this, 'todos')}
        onLoadAuth={switchPage.bind(this, 'auth')}
      />
      <hr />
      {page === 'auth' ? <Auth /> : <Todo />}
    </div>
  );
}

export default app;
