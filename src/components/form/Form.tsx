import { FC } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { debugLog, LogType } from '../../utils';
import { useAppDispatch } from '../../store';
import { increaseScore } from '../../store/userSlice';
import { QuizQuestion } from '../../types';
import './Form.css';

type FormProps = {
  onSubmit?: SubmitHandler<FieldValues>
  question: QuizQuestion
}

const Form: FC<FormProps> = ({ question, onSubmit }) => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      answer: '',
    }
  });

  const handleFormSubmit = (data: FieldValues) => {
    if (errors.answer) {
      debugLog(JSON.stringify(errors), LogType.Error)
      return;
    }
    dispatch(increaseScore());
    onSubmit?.(data);
  };

  return (
    <form className='qz-form' onSubmit={handleSubmit(handleFormSubmit)}>
      <input type='text' placeholder='Answer...' {...register('answer', { required: true, maxLength: 300 })} required />
      <input type='submit' value={'Submit'} />
    </form>
  );
}

export default Form;
