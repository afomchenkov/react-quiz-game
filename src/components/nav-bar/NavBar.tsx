import {
  setDark,
  setLight,
  getCurrentTheme,
} from '../../store/themeSlice';
import { getCurrentUser } from '../../store/userSlice';
import { useAppSelector, useAppDispatch } from '../../store';
import { Theme } from '../../types';
import { capitalise } from '../../utils';
import './NavBar.css';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(getCurrentTheme);
  const { score, chances } = useAppSelector(getCurrentUser);

  const handleThemeToggle = () => {
    if (currentTheme === Theme.Dark) {
      dispatch(setLight());
    } else if (currentTheme === Theme.Light) {
      dispatch(setDark());
    }
  }

  const getThemeToToggleText = (): string => {
    return capitalise(currentTheme === Theme.Dark ? Theme.Light : Theme.Dark);
  }

  return (
    <header className='qz-navbar' data-test-id='qz-nav-bar'>
      <section data-test-id='qz-score-bar'>
        <span>Score: {score}</span>
        <span>Chances: {chances}</span>
      </section>
      <nav>
        <button className='qz-navbar__button' onClick={handleThemeToggle} data-test-id='qz-theme-toggler'>
          {getThemeToToggleText()}
        </button>
      </nav>
    </header>
  );
};

export default NavBar;
