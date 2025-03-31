import { HTMLProps, memo } from 'react';
import style from './style.module.css';
import Label, { ILabel } from '@components/texts/Label';

export interface ICheckbox
    extends HTMLProps<HTMLInputElement>,
        Pick<ILabel, 'text'> {}

function Checkbox({ text, ...props }: ICheckbox) {
    return (
        <div className={style.container}>
            <input type="checkbox" className={style.checkbox} {...props} />
            <Label text={text} />
        </div>
    );
}

export default memo(Checkbox);
