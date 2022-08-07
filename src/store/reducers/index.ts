import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

// Epics
import rootEpic from '../epics';

// Reducer
import base from './base';

const epicMiddleware = createEpicMiddleware();

// Combine multiple reducers
const rootReducers = combineReducers({
  base,
});

const store = createStore(
  rootReducers,
  DEV_MODE
    ? composeWithDevTools(applyMiddleware(epicMiddleware))
    : applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic as Epic);

export default store;
