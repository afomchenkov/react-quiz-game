import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store';
import { getCurrentUser, flushScore } from '../../store/userSlice';
import './Page.css';

const ResultPage: FC = () => {
  const { score } = useAppSelector(getCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    dispatch(flushScore());
    navigate('/');
  }

  return (
    <section className='qz-card'>
      <h3>Your final result:</h3>
      <div className='gz-card__result-card'>
        <span>Gathered points: {score}</span>
        <br/>
        <br/>
        <a href='/#' onClick={handleNavigateBack}>Start new quiz</a>
      </div>
    </section>
  );
};

export default ResultPage;