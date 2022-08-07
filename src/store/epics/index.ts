import { combineEpics } from 'redux-observable';
import { catchError } from 'rxjs/operators';

import base from './base';

const rootEpic = (
  action$: unknown,
  store$: unknown,
  dependencies: unknown
): unknown => {
  return combineEpics(...base)(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.log(error);
      return source;
    })
  );
};

export default rootEpic;
