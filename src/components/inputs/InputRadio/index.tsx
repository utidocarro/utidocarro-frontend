import { memo, InputHTMLAttributes } from 'react';

import style from './style.module.css';
import Label from '@components/texts/Label';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface IInputRadioProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string | number;
  register: UseFormRegisterReturn;
}

// = ============================================================
function InputRadio({ label, value, register, ...props }: IInputRadioProps) {
  // = ============================================================
  return (
    <div className={[style.container, style.customRadio].join(' ')}>
      <input
        type='radio'
        value={value}
        className={style.customRadio}
        {...props}
        {...register}
      />
      <Label htmlFor={props.id} text={label} fontWeight={300} />
    </div>
  );
}

export default memo(InputRadio);
