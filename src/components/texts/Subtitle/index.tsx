import { HTMLProps, memo } from 'react';
import style from './style.module.css';

export interface ISubtitle extends HTMLProps<HTMLParagraphElement> {
  text: string;
  subtitleType?: keyof typeof EType;
}

export enum EType {
  primary,
  secondary,
}

function Subtitle({ text, subtitleType = 'primary', ...props }: ISubtitle) {
  return (
    <p className={[style.subtitle, style[subtitleType]].join(' ')} {...props}>
      {text}
    </p>
  );
}

export default memo(Subtitle);
