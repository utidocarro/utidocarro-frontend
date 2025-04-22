import { Colors } from '@styles/Colors';
import style from './style.module.css';
import { PropsWithChildren } from 'react';

export interface IIconRoundedProps extends PropsWithChildren {
    size: number;
    type?: 'primary' | 'secondary';
}

export default function IconRounded({
    size,
    type = 'primary',
    children,
}: IIconRoundedProps) {
    return (
        <div
            className={style.container}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor:
                    type === 'primary' ? Colors.shape : Colors.white,
            }}>
            {children}
        </div>
    );
}
