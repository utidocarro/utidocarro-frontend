import { Colors } from "@styles/Colors";
import style from "./style.module.css";
import { PropsWithChildren } from "react";

export interface IIconRoundedProps extends PropsWithChildren {
  size: number;
  type?: "primary" | "secondary" | "tertiary";
}

export default function IconRounded({
  size,
  type = "primary",
  children,
}: IIconRoundedProps) {
  const color = {
    primary: Colors.shape,
    secondary: Colors.white,
    tertiary: Colors.lightShape,
  };
  return (
    <div
      className={style.container}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color[type],
      }}
    >
      {children}
    </div>
  );
}
