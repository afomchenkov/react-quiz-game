import { FC, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import QuizPage from '../pages/QuizPage';
import ResultPage from '../pages/ResultPage';
import { useAppSelector } from '../../store';
import { getCurrentUser } from '../../store/userSlice';
import './Layout.css';

const Layout: FC = () => {
  const { chances } = useAppSelector(getCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (chances <= 0) {
      navigate('/result');
    }
  }, [chances, navigate])

  useEffect(() => {
    if (chances === 3) {
      navigate('/');
    }
  }, [])

  return (
    <main className='qz-main'>
      <Routes>
        <Route path='/' index element={<QuizPage />} />
        <Route path='/result' element={<ResultPage />} />
      </Routes>
    </main>
  );
}

export default Layout;
