import { memo, ReactNode } from "react";

import style from "./style.module.css";
import Button from "@components/buttons/Button";
import Circle from "@components/icons/Circle";
import Paragraph, { IParagraph } from "@components/texts/Paragraph";
import { Colors } from "@styles/Colors";

export interface IMenuCard extends Pick<IParagraph, "text"> {
  isSelected: boolean;
  icon: ReactNode;
  onClick: () => void;
}

function MenuCard({ isSelected, icon, onClick, text }: IMenuCard) {
  return (
    <Button
      cardType={isSelected ? "secondary" : "transparent"}
      onClick={onClick}
      type="button"
    >
      <div className={style.container}>
        <Circle color={isSelected ? Colors.shape : Colors.white} size={30}>
          {icon}
        </Circle>
        <Paragraph
          size="medium"
          text={text}
          color={isSelected ? "black" : "white"}
        />
      </div>
    </Button>
  );
}

export default memo(MenuCard);
