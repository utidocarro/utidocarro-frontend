import { HTMLProps, memo } from 'react';
import style from './style.module.css';

export interface ITitle extends HTMLProps<HTMLHeadingElement> {
  title: string;
}

function Title({ title, ...props }: ITitle) {
  return (
    <h1 className={style.title} {...props}>
      {title}
    </h1>
  );
}

export default memo(Title);
