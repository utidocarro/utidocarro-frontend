import Paragraph, { IParagraph } from '../Paragraph';

export interface ITextError extends Omit<IParagraph, 'size' | 'color'> {}

function TextError({ ...props }: ITextError) {
    return <Paragraph {...props} size="small" color="red" />;
}

export default TextError;
