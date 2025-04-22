import Button from '@components/buttons/Button';
import style from './style.module.css';
import { ReactNode } from 'react';
import IconRounded from '@components/icons/IconRounded';
import Paragraph from '@components/texts/Paragraph';

export interface ICardMenuProps {
    title: string;
    icon: ReactNode;
    isSelected: boolean;
    onClick: VoidFunction;
}

export default function CardMenu({
    title,
    icon,
    isSelected,
    ...props
}: ICardMenuProps) {
    return (
        <Button
            cardType={isSelected ? 'secondary' : 'transparent'}
            style={{ width: '100%' }}
            {...props}>
            <div className={style.container}>
                <IconRounded
                    type={isSelected ? 'primary' : 'secondary'}
                    size={30}>
                    {icon}
                </IconRounded>
                <Paragraph
                    text={title}
                    size="medium"
                    color={isSelected ? 'black' : 'white'}
                />
            </div>
        </Button>
    );
}
