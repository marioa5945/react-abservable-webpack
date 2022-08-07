import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import store from './store/reducers/';
import './utils/window-fun';

const HomePage = React.lazy(() => import('./container/home/home'));
const NotFound = React.lazy(
  () => import('./container/status-page/not-found/not-found')
);

import Loading from '@src/components/loading/loading';

const PageRouter = (): JSX.Element => {
  return (
    <Suspense fallback={<Loading logoUrl={'./img/logo.png'} />}>
      <Provider store={store as never}>
        <Routes>
          <Route path={'/'} element={<HomePage />} />
          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </Provider>
    </Suspense>
  );
};

export default PageRouter;
