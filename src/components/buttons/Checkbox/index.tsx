import { HTMLProps, memo } from 'react';

import Label, { ILabel } from '@components/texts/Label';
import style from './style.module.css';

export interface ICheckbox
  extends HTMLProps<HTMLInputElement>,
    Pick<ILabel, 'text'> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Checkbox({ text, onChange, ...props }: ICheckbox) {
  return (
    <div className={style.container}>
      <input
        type='checkbox'
        className={style.checkbox}
        onChange={onChange}
        {...props}
      />
      <Label text={text} />
    </div>
  );
}

export default memo(Checkbox);
