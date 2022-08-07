import * as _lodash from 'lodash';
import * as _React from 'react';
import * as _moment from 'moment';

declare global {
  declare const React: _React;
  declare const _: _lodash;
  declare const moment: _moment;
  declare const DEV_MODE: boolean;

  declare interface ifsApi<T> {
    code: number;
    data: T;
    msg: string | null;
  }

  declare interface ifsAction<T = Record<string, unknown>> {
    type: string;
    payload?: T;
    callback?: (value?: unknown) => void;
  }

  interface Window {
    $success: (successStr: string) => void;
  }
}
