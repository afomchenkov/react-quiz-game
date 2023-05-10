import { useEffect, useState } from 'react';
import { getCurrentUser } from '../store/userSlice';
import { useAppSelector } from '../store';
import { useAppDispatch } from '../store';
import { QuizQuestion, FetchQuestionStatus } from '../types';
import {
  loadQuestions,
  removeQuestion,
  selectQuestions,
} from '../store/questionsSlice';
import { hasUserAnsweredQuestion } from '../utils';

type UseCurrentQuestion = () => {
  currentQuestion: QuizQuestion | null
  status: FetchQuestionStatus
}

export const useCurrentQuestion: UseCurrentQuestion = () => {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const { score, chances, answeredQuestions } = useAppSelector(getCurrentUser);
  const { remainingQuestions, status } = useAppSelector(selectQuestions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === FetchQuestionStatus.Idle) {
      const nextQuestion = remainingQuestions[0];

      if (nextQuestion) {
        const { questionHash } = nextQuestion;

        // remove question if already answered
        if (hasUserAnsweredQuestion(answeredQuestions, questionHash)) {
          dispatch(removeQuestion(questionHash));
        }
      }

      setCurrentQuestion(nextQuestion);
    }
  }, [remainingQuestions, status, dispatch])

  useEffect(() => {
    if (currentQuestion) {
      const { questionHash } = currentQuestion;
      dispatch(removeQuestion(questionHash));
    }
  }, [score, chances, dispatch])

  useEffect(() => {
    const shouldLoad = !remainingQuestions.length;

    if (shouldLoad) {
      dispatch(loadQuestions());
    }
  }, [remainingQuestions, dispatch])

  return { currentQuestion, status };
}
