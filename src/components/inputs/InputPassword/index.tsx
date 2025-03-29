import { memo, useState } from 'react';
import InputBaseIcon, { IInputBaseIcon } from '../InputBaseIcon';
import { Eye, EyeHide } from '@assets/icons';

export interface IInputPassword extends Omit<IInputBaseIcon, 'children'> {}

function InputPassword({ ...props }: IInputPassword) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <InputBaseIcon type={showPassword ? 'text' : 'password'} {...props}>
            <div
                style={{ cursor: 'pointer' }}
                onClick={() => setShowPassword((c) => !c)}>
                {showPassword ? <EyeHide width={25} /> : <Eye width={25} />}
            </div>
        </InputBaseIcon>
    );
}

export default memo(InputPassword);
