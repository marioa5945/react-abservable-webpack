import React from 'react';
import style from './loading-style.scss';

const Loading = (props: { logoUrl: string }) => {
  return (
    <div className={style.loading}>
      <div>
        <img src={props.logoUrl} className={style.logo} />
        <img src={require('./img/loading.svg')} className={style.circle} />
      </div>
    </div>
  );
};

export default Loading;
