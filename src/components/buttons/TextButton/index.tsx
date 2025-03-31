import { memo } from 'react';
import Button, { IButton } from '../Button';
import Subtitle, { ISubtitle } from '@components/texts/Subtitle';
import style from './style.module.css';

export interface ITextButton
    extends IButton,
        Pick<ISubtitle, 'text' | 'subtitleType'> {}

function TextButton({ text, subtitleType, ...props }: ITextButton) {
    return (
        <Button {...props}>
            <div className={style.container}>
                <Subtitle subtitleType={subtitleType} text={text} />
            </div>
        </Button>
    );
}

export default memo(TextButton);
