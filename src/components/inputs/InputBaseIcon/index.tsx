import { memo, ReactNode } from 'react';
import style from './style.module.css';
import InputIcon, { IInputIcon } from '../InputIcon';
import Label, { ILabel } from '@components/texts/Label';

export interface IInputBaseIcon extends IInputIcon, Pick<ILabel, 'label'> {
    children: ReactNode;
}

function InputBaseIcon({ label, children, ...props }: IInputBaseIcon) {
    return (
        <div className={style.container}>
            <Label label={label} />
            <InputIcon {...props}>{children}</InputIcon>
        </div>
    );
}

export default memo(InputBaseIcon);
