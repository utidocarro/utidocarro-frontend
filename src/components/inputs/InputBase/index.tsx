import { memo } from 'react';
import Input, { IInput } from '../Input';
import style from './style.module.css';
import Label, { ILabel } from '@components/texts/Label';

export interface IInputBase extends IInput, Pick<ILabel, 'text'> {
  labelFontWeight?: number;
}

function InputBase({ text, labelFontWeight, ...props }: IInputBase) {
  return (
    <div className={style.container}>
      <Label text={text} fontWeight={labelFontWeight} />

      <Input {...props} />
    </div>
  );
}

export default memo(InputBase);
