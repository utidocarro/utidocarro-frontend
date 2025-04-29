import Paragraph, { IParagraph } from '../Paragraph';

export interface ITextError extends Omit<IParagraph, 'size' | 'color'> {}

function TextError({ ...props }: ITextError) {
  return (
    <div style={{ minHeight: '1.5rem' }}>
      <Paragraph {...props} size='small' color='red' />
    </div>
  );
}

export default TextError;
