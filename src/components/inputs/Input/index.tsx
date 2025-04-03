import { InputHTMLAttributes, memo } from "react";
import style from "./style.module.css";
import { Colors } from "@styles/Colors";

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

function Input({ ...props }: IInput) {
  return (
    <input
      {...props}
      className={style.input}
      style={{
        backgroundColor: Colors.lightShape,
        color: Colors.white,
      }}
    />
  );
}

export default memo(Input);
