import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDark,
  setLight,
  getCurrentTheme,
} from '../../store/themeSlice';
import {
  getCurrentUser
} from '../../store/userSlice'
import { Theme } from '../../types';
import './NavBar.css';

const NavBar = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(getCurrentTheme);
  const { score, chances } = useSelector(getCurrentUser);

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
      <section>
        <span>Score: {score}</span>
        <span>Chances: {chances}</span>
      </section>
      <nav>
        <button className='qz-navbar__button' onClick={handleThemeToggle}>
          {getThemeToToggleText()}
        </button>
      </nav>
    </header>
  );
};

export default NavBar;
