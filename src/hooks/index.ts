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

const hasAnsweredQuestion = (userAnsweredQuestions: string[] = [], questionHash: string): boolean => {
  return userAnsweredQuestions.includes(questionHash);
}

type UseCurrentQuestion = () => {
  currentQuestion: QuizQuestion | null
  status: FetchQuestionStatus
}

export const useCurrentQuestion: UseCurrentQuestion = () => {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const { score, chances } = useAppSelector(getCurrentUser);
  const { remainingQuestions, status } = useAppSelector(selectQuestions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('Remove question: ', { score, chances });

    if (currentQuestion) {
      const { questionHash } = currentQuestion;
      dispatch(removeQuestion(questionHash));
    }
  }, [score, chances, dispatch])

  useEffect(() => {
    if (status === FetchQuestionStatus.Idle) {
      console.log('1 ', remainingQuestions)

      const nextQuestion = remainingQuestions[0];
      // filter here from existing
      setCurrentQuestion(nextQuestion);
    }
  }, [remainingQuestions, status])

  useEffect(() => {
    const shouldLoad = !remainingQuestions.length;

    if (shouldLoad) {
      dispatch(loadQuestions());
    }
  }, [remainingQuestions, dispatch])

  return { currentQuestion, status };
}
