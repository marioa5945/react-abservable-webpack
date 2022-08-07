import { baseType } from '@type';

const initData: baseType.ifsBase = {
  homeNav: [],
};

export default (
  state = initData,
  action: {
    type: string;
    payload: baseType.ifsBase;
  }
): baseType.ifsBase => {
  switch (action.type) {
    case baseType.BASE_REDUCER: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
