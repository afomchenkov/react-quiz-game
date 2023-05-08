import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDark,
  setLight,
  getCurrentTheme,
} from '../../store/themeSlice';
import { Theme } from '../../types';
import './NavBar.css';

const NavBar = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(getCurrentTheme);

  const handleThemeToggle = () => {
    if (currentTheme === Theme.Dark) {
      dispatch(setLight());
    } else if (currentTheme === Theme.Light) {
      dispatch(setDark());
    }
  }

  const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
  const getThemeToToggleText = (): string => {
    return capitalise(currentTheme === Theme.Dark ? Theme.Light : Theme.Dark);
  }

  return (
    <header className='qz-navbar'>
      <nav>
        <section>
          <button onClick={handleThemeToggle}>
            {getThemeToToggleText()}
          </button>
        </section>
      </nav>
    </header>
  );
};

export default NavBar;
