import { memo } from 'react';
import style from './style.module.css';
import Input, { IInput } from '../Input';

export interface IInputIcon extends IInput {}

function InputIcon({ children, ...props }: IInputIcon) {
  return (
    <div className={style.container}>
      <Input {...props} />
      <div className={style.icon}>{children}</div>
    </div>
  );
}

export default memo(InputIcon);
