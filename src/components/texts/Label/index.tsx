import { HTMLProps, memo } from 'react';
import style from './style.module.css';

export interface ILabel extends HTMLProps<HTMLLabelElement> {
    label: string;
}

function Label({ label, ...props }: ILabel) {
    return (
        <label className={style.label} {...props}>
            {label}
        </label>
    );
}

export default memo(Label);
