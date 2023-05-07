import { useState, FC } from 'react';
import Loader from '../../components/loader/Loader'
import { generateHash } from '../../utils';

const QuizPage: FC = () => {
  const [input, setInput] = useState('');

  const handleInputChange = (event: any) => {
    setInput(event.target.value);
  }

  const handleSubmit = async () => {
    const hash = await generateHash(input);
    console.log('SUBMIT: ', input, hash);
    setInput('');
  }

  return (
    <>
      <h3>quiz</h3>
      <Loader />

      <input value={input} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default QuizPage;