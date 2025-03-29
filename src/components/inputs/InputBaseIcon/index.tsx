import { memo, ReactNode } from 'react';
import style from './style.module.css';
import { Colors } from '@styles/Colors';
import InputIcon, { IInputIcon } from '../InputIcon';

export interface IInputBaseIcon extends IInputIcon {
    label: string;
    children: ReactNode;
}

function InputBaseIcon({ label, children, ...props }: IInputBaseIcon) {
    return (
        <div className={style.container}>
            <label className={style.label} style={{ color: Colors.white }}>
                {label}
            </label>
            <InputIcon {...props}>{children}</InputIcon>
        </div>
    );
}

export default memo(InputBaseIcon);
