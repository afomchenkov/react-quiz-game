import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import QuizPage from '../pages/QuizPage';
import ResultPage from '../pages/ResultPage';
import './Layout.css';

const Layout: FC = () => {
  return (
    <main className='qz-main'>
      <Routes>
        <Route
          path='/'
          element={<QuizPage />}
        />
        <Route path='/result' element={<ResultPage />} />
      </Routes>
    </main>
  );
}

export default Layout;
