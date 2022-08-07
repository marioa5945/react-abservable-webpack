import { ajaxGetJSON } from '@ajax';
import { Observable } from 'rxjs';
import { baseType } from '@type';

export const apiHomeNavGet = (): Observable<baseType.ifsHomeNav> => {
  return ajaxGetJSON('/api/home-nav.json');
};
