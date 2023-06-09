import { FC } from 'react';
import Form from '../form/Form';
import { useCurrentQuestion } from '../../hooks';
import { FetchQuestionStatus } from '../../types';
import Loader from '../loader/Loader';
import { debugLog, LogType } from '../../utils';
import './Page.css';

const Overlay: FC = () => {
  return (
    <section className='qz-card' data-test-id='qz-quiz-loader'>
      <span>Loading...</span>
      <Loader />
    </section>
  )
}

const ErrorPlaceholder: FC = () => {
  return (
    <section className='qz-card' data-test-id='qz-quiz-error'>
      <span>An error has occurred, please try again later...</span>
    </section>
  )
}

const QuizPage: FC = () => {
  const { currentQuestion, status } = useCurrentQuestion();

  if (status === FetchQuestionStatus.Failed) {
    debugLog(`Error page rendered: [status:${status}]`, LogType.Error);
    return <ErrorPlaceholder />;
  }

  if (status === FetchQuestionStatus.Loading || !currentQuestion) {
    return <Overlay />;
  }

  const { question } = currentQuestion;

  return (
    <section className='qz-card' data-test-id='qz-quiz-card'>
      <div className='gz-card__title'>
        <h3 data-test-id='qz-quiz-question'>{question}</h3>
      </div>
      <Form question={currentQuestion}/>
    </section>
  );
};

export default QuizPage;