import { memo } from 'react';
import Label, { ILabel } from '@components/texts/Label';
import InputRadio, { IInputRadioProps } from '../InputRadio';
import style from './style.module.css';

export interface IRadioGroupOptions
  extends Pick<IInputRadioProps, 'label' | 'value'> {}

export interface IRadioGroupProps
  extends Pick<ILabel, 'text'>,
    Pick<IInputRadioProps, 'name' | 'register'> {
  options: Array<IRadioGroupOptions>;
  selectedValue?: string;
}

function RadioGroup({
  text,
  name,
  register,
  selectedValue,
  options,
}: IRadioGroupProps) {
  return (
    <div className={style.container}>
      <Label text={text} fontWeight={500} />
      <div className={style.radioGroupContainer}>
        {options?.length > 0 &&
          options.map(({ label, value }, index) => (
            <InputRadio
              key={`input-radio-${index}-${value}`}
              register={register}
              id={value.toString()}
              name={name}
              value={value}
              label={label}
              defaultChecked={
                (Boolean(selectedValue) && selectedValue == value) ||
                index === 0
              }
            />
          ))}
      </div>
    </div>
  );
}
export default memo(RadioGroup);
