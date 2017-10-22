import React from 'react';

import Menu from './presentational/menu';
import {BrowserRouter} from 'react-router-dom';
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