import Card, { ICard } from '@components/cards/Card';
import { HTMLProps, memo } from 'react';
import style from './style.module.css';

export interface IButton
    extends Pick<ICard, 'cardType'>,
        HTMLProps<HTMLButtonElement> {
    type?: 'button' | 'submit' | 'reset';
}

function Button({
    onClick,
    children,
    cardType = 'secondary',
    ...props
}: IButton) {
    return (
        <button className={style.container} {...props}>
            <Card cardType={cardType}>{children}</Card>
        </button>
    );
}
export default memo(Button);
