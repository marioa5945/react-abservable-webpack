import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Router from './pageRouter';
const domRoot = document.getElementById('root');
if (domRoot) {
  ReactDOM.createRoot(domRoot).render(
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

if (module.hot) {
  module.hot.accept();
}
