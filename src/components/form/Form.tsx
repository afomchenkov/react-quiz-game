import { FC, useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { debugLog, LogType } from '../../utils';
import './Form.css';

type FormProps = {
  onSubmit?: SubmitHandler<FieldValues>
}

const Form: FC<FormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      answer: '',
    }
  });

  const handleFormSubmit = (data: FieldValues) => {
    if (errors.answer) {
      debugLog(JSON.stringify(errors), LogType.Error)
      return;
    }
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
