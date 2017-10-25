import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Menu from './presentational/menu';
import Routes from './presentational/routes';

const App = () => {
  
  return (
    <div>
      <BrowserRouter >
        <div>
          <Menu />
          <Routes />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;