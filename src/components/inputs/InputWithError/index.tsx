import { UseFormRegisterReturn } from 'react-hook-form';

import style from './style.module.css';
import InputBase from '@components/inputs/InputBase';
import InputPassword from '@components/inputs/InputPassword';
import TextError from '@components/texts/TextError';

interface IInputWithErrorProps {
  text: string;
  placeholder: string;
  type?: 'text' | 'password';
  errorMessage?: string;
  register: UseFormRegisterReturn;
}

function InputWithError({
  text,
  placeholder,
  type = 'text',
  errorMessage,
  register,
}: IInputWithErrorProps) {
  const InputComponent = type === 'password' ? InputPassword : InputBase;

  return (
    <div className={style.inputContainer}>
      <InputComponent
        text={text}
        placeholder={placeholder}
        labelFontWeight={500}
        {...register}
      />
      {errorMessage && <TextError text={errorMessage} />}
    </div>
  );
}

export default InputWithError;
