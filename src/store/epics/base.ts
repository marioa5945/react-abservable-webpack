import { mergeMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { baseType } from '@type';
import { baseApi } from '../api';

const baseHomeNavGetEpic = (
  action$
): Observable<{
  type: string;
  payload: {
    directoryList: unknown;
  };
}> => {
  return action$.pipe(
    ofType(baseType.BASE_HOME_NAV_GET_EPIC),
    mergeMap(() =>
      baseApi.apiHomeNavGet().pipe(
        map((res) => {
          return { type: baseType.BASE_REDUCER, payload: { homeNav: res } };
        })
      )
    )
  );
};

export default [baseHomeNavGetEpic] as any;
