import { useAppSelector } from './store';
import NavBar from './components/nav-bar/NavBar';
import Layout from './components/layout/Layout';
import { getCurrentTheme } from './store/themeSlice';
import './App.css';

const App = () => {
  const theme = useAppSelector(getCurrentTheme);

  return (
    <div data-theme={theme}>
      <NavBar />
      <Layout />
    </div>
  );
}

export default App;
