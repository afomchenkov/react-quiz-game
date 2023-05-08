import { FC, useEffect } from 'react';
import Form from '../form/Form';
import { useCurrentQuestion } from '../../hooks';
import './Page.css';

const QuizPage: FC = () => {
  const { question, answer } = useCurrentQuestion();

  useEffect(() => {
    console.log('QUIZ PAGE: ', question, answer);
  }, [question, answer])

  return (
    <section className='qz-card'>
      <h3>{question}</h3>
      <Form />
    </section>
  );
};

export default QuizPage;