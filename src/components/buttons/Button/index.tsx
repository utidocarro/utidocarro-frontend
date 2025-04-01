import Card, { ICard } from '@components/cards/Card';
import { memo } from 'react';
import style from './style.module.css';

export interface IButton extends Partial<ICard> {
    onClick?: () => void;
}

function Button({ onClick, children, ...props }: IButton) {
    return (
        <button onClick={onClick} className={style.container}>
            <Card cardType="secondary" {...props}>
                {children}
            </Card>
        </button>
    );
}
export default memo(Button);
