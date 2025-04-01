import { InputHTMLAttributes, memo } from 'react';
import style from './style.module.css';
import { Colors } from '@styles/Colors';

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
}

function Input({ ...props }: IInput) {
    console.log('Input renderizou!', props.placeholder);
    return (
        <input
            {...props}
            className={style.input}
            style={{
                backgroundColor: Colors.lightShape,
                color: Colors.white,
                border: 'none',
            }}
        />
    );
}

export default memo(Input);
