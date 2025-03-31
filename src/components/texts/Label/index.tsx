import { HTMLProps, memo } from 'react';
import style from './style.module.css';

export interface ILabel extends HTMLProps<HTMLLabelElement> {
    text: string;
}

function Label({ text, ...props }: ILabel) {
    return (
        <label className={style.label} {...props}>
            {text}
        </label>
    );
}

export default memo(Label);
