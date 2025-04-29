import { HTMLProps, memo } from 'react';
import style from './style.module.css';

export interface ILabel extends HTMLProps<HTMLLabelElement> {
  text: string;
  fontWeight?: number;
}

function Label({ text, fontWeight = 900, ...props }: ILabel) {
  return (
    <label className={style.label} style={{ fontWeight }} {...props}>
      {text}
    </label>
  );
}

export default memo(Label);
