import { HTMLProps, memo } from "react";
import * as motion from "motion/react-client";

import Card, { ICard } from "@components/cards/Card";
import style from "./style.module.css";

export interface IButton
  extends Pick<ICard, "cardType">,
    HTMLProps<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
}

function Button({ onClick, children, cardType, ...props }: IButton) {
  return (
    <button className={style.container} {...props}>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Card cardType="secondary">{children}</Card>
      </motion.div>
    </button>
  );
}
export default memo(Button);
