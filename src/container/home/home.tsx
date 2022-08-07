import homeStyle from './home-style.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { baseType } from '@type';
import { useSelector, useDispatch } from 'react-redux';

const HomePage = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const base = useSelector<{ base: baseType.ifsBase }, baseType.ifsBase>(
    (state) => state.base
  );

  useEffect(() => {
    dispatch({
      type: baseType.BASE_HOME_NAV_GET_EPIC,
    });
  }, []);

  return (
    <div className={homeStyle.home}>
      <main>
        <h1>
          hell<span>o</span> word
        </h1>
        <p>react + redux-observable + webpack</p>
        <img src={'/img/logo.png'} />
        <nav>
          {base.homeNav.map((n) =>
            n.url.indexOf('http') === 0 ? (
              <a key={n.name} href={n.url}>
                {n.name}
              </a>
            ) : (
              <a key={n.name} onClick={() => navigate(`/${n.name}`)}>
                {n.name}
              </a>
            )
          )}
        </nav>
      </main>
    </div>
  );
};

export default HomePage;
