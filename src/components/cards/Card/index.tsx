import { HTMLProps, memo } from 'react';
import style from './style.module.css';

export interface ICard extends HTMLProps<HTMLDivElement> {
  cardType?: keyof typeof EType;
  height?: string;
  width?: string;
}

export enum EType {
  primary,
  secondary,
  tertiary,
  transparent,
}

function Card({
  cardType = 'primary',
  children,
  height,
  width,
  ...props
}: ICard) {
  return (
    <div
      style={{ height, width }}
      className={[style['container'], style[cardType]].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}

export default memo(Card);
