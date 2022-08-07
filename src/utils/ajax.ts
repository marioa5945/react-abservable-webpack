import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Observable } from 'rxjs';

interface headersIfs {
  'Content-Type': string;
  'Authorization'?: string;
}

const handleHeadersGet = (info?: {
  headerInfo?: Record<string, unknown>;
  noAuthorization?: boolean;
}) => {
  const headerInfo = _.get(info, 'headerInfo');

  let headers: headersIfs = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': localStorage.getItem('token') || '',
  };

  if (headerInfo) {
    headers = { ...headers, ...headerInfo };
  }

  return headers;
};

export const ajaxGetJSON = <T>(url: string): Observable<T> => {
  return ajax.getJSON(url, handleHeadersGet());
};

export const ajaxPost = (
  url: string,
  body: unknown
): Observable<AjaxResponse> => {
  return ajax.post(
    url,
    body,
    handleHeadersGet({ headerInfo: { 'Content-Type': 'application/json' } })
  );
};

export const ajaxPostForm = (
  url: string,
  body: unknown
): Observable<AjaxResponse> => {
  return ajax.post(url, body, handleHeadersGet({ noAuthorization: true }));
};

export const ajaxPut = (
  url: string,
  body: unknown
): Observable<AjaxResponse> => {
  return ajax.put(
    url,
    body,
    handleHeadersGet({ headerInfo: { 'Content-Type': 'application/json' } })
  );
};

export const ajaxDelete = (url: string): Observable<AjaxResponse> => {
  return ajax.delete(url, handleHeadersGet());
};

export const ajaxSubmit = (
  url: string,
  body: unknown
): Observable<AjaxResponse> => {
  return ajax({
    method: 'POST',
    url,
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    body,
  });
};
