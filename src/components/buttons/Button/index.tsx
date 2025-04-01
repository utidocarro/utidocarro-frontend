import Card, { ICard } from "@components/cards/Card";
import { memo } from "react";
import style from "./style.module.css";

export interface IButton extends Partial<ICard> {
  onClick: () => void;
}

function Button({ onClick, children, ...props }: IButton) {
  return (
    <div onClick={onClick} className={style.container}>
      <Card onClick={onClick} cardType="secondary" {...props}>
        {children}
      </Card>
    </div>
  );
}
export default memo(Button);
