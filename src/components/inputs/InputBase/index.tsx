import { memo } from "react";
import Input, { IInput } from "../Input";
import style from "./style.module.css";
import Label, { ILabel } from "@components/texts/Label";

export interface IInputBase extends IInput, Pick<ILabel, "text"> {}

function InputBase({ text, ...props }: IInputBase) {
  return (
    <div className={style.container}>
      <Label text={text} />

      <Input {...props} />
    </div>
  );
}

export default memo(InputBase);
