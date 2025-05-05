import { HTMLProps, memo } from 'react';
import style from './style.module.css';
import { Colors } from '@styles/Colors';

export interface ITitle extends HTMLProps<HTMLHeadingElement> {
  title: string;
  color?: keyof typeof Colors;
}

function Title({ title, color = 'white', ...props }: ITitle) {
  return (
    <h1 className={style.title} {...props} style={{ color: Colors[color] }}>
      {title}
    </h1>
  );
}

export default memo(Title);
