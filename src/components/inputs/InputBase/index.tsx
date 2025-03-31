import { memo } from 'react';
import Input, { IInput } from '../Input';
import style from './style.module.css';
import Label, { ILabel } from '@components/texts/Label';

export interface IInputBase extends IInput, Pick<ILabel, 'label'> {}

function InputBase({ label, ...props }: IInputBase) {
    return (
        <div className={style.container}>
            <Label label={label} />

            <Input {...props} />
        </div>
    );
}

export default memo(InputBase);
