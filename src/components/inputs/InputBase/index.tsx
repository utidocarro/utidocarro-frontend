import { memo } from 'react';
import Input, { IInput } from '../Input';
import style from './style.module.css';
import { Colors } from '@styles/Colors';

export interface IInputBase extends IInput {
    label: string;
}

function InputBase({ label, ...props }: IInputBase) {
    return (
        <div className={style.container}>
            <label className={style.label} style={{ color: Colors.white }}>
                {label}
            </label>

            <Input {...props} />
        </div>
    );
}

export default memo(InputBase);
