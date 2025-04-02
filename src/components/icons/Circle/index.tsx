import { HTMLProps, memo } from 'react';
import style from './style.module.css';

export interface ICircle extends Omit<HTMLProps<HTMLDivElement>, 'style'> {
    size: number;
    color: string;
}

function Circle({ size, color, children, ...props }: ICircle) {
    return (
        <div
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
            }}
            className={style.container}
            {...props}>
            {children}
        </div>
    );
}

export default memo(Circle);
