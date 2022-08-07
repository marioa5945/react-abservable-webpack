export interface ifsBase {
  homeNav: ifsHomeNav[];
}

export interface ifsHomeNav {
  name: string;
  url: string;
}

export const BASE_REDUCER = 'BASE_REDUCER';
export const BASE_HOME_NAV_GET_EPIC = 'BASE_HOME_NAV_GET_EPIC';
