import { FC } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { debugLog, LogType, generateSHA1Hash } from '../../utils';
import { useAppDispatch } from '../../store';
import {
  increaseScore,
  decreaseChances,
  saveAnsweredQuestion,
  saveFailedQuestion,
} from '../../store/userSlice';
import { QuizQuestion } from '../../types';
import './Form.css';

type FormProps = {
  question: QuizQuestion
  onSubmit?: SubmitHandler<FieldValues>
}

const Form: FC<FormProps> = ({ question }) => {
  const { questionHash, answerSha1 } = question;
  const dispatch = useAppDispatch();

  const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm({
    defaultValues: {
      answer: '',
    }
  });

  const isCorrectAnswer = async (answer: string) => {
    const currentAnswerSha1 = await generateSHA1Hash(answer);
    return currentAnswerSha1 === answerSha1;
  }

  // Handle only user answer here, set corresponding user score/chances and save answen to state
  const handleFormSubmit = async (): Promise<void> => {
    if (errors.answer) {
      debugLog(JSON.stringify(errors), LogType.Error)
      return;
    }

    const isCorrect = await isCorrectAnswer(getValues('answer'));
    if (isCorrect) {
      dispatch(increaseScore());
    } else {
      dispatch(decreaseChances());
      dispatch(saveFailedQuestion(questionHash));
    }
    dispatch(saveAnsweredQuestion(questionHash));
    setValue('answer', '');
  };

  return (
    <form className='qz-form' onSubmit={handleSubmit(handleFormSubmit)}>
      <input type='text' placeholder='Answer...' {...register('answer', { required: true, maxLength: 300 })} required />
      <input type='submit' value={'Submit'} />
    </form>
  );
}

export default Form;
