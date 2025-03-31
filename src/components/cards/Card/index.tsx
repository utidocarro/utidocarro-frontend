import { HTMLProps, memo } from 'react';
import style from './style.module.css';

export interface ICard extends HTMLProps<HTMLDivElement> {
    cardType?: keyof typeof EType;
}

export enum EType {
    primary,
    secondary,
    transparent,
    opacity,
}

function Card({ cardType = 'primary', children, ...props }: ICard) {
    return (
        <div
            className={[style['container'], style[cardType]].join(' ')}
            {...props}>
            {children}
        </div>
    );
}

export default memo(Card);
