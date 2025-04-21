import Paragraph, { IParagraph } from '@components/texts/Paragraph';

export interface IPressableText extends Pick<IParagraph, 'text' | 'textStyle'> {
    onClick?: VoidFunction;
}

export default function PressableText({ onClick, ...props }: IPressableText) {
    return (
        <a onClick={onClick}>
            <Paragraph
                weight="medium"
                {...props}
                textStyle={{ textDecoration: 'underline' }}
            />
        </a>
    );
}
