import { HTMLProps, memo } from 'react';
import * as motion from 'motion/react-client';

import Card, { ICard } from '@components/cards/Card';
import style from './style.module.css';

export interface IButton
  extends Pick<ICard, 'cardType'>,
    HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
}

function Button({ children, cardType, ...props }: IButton) {
  return (
    <button className={style.container} {...props}>
      <motion.div
        whileHover={{
          y: -2,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.40)',
        }}
        whileTap={{
          y: 0,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
        transition={{ duration: 0.2 }}
      >
        <Card cardType={cardType ?? 'secondary'}>{children}</Card>
      </motion.div>
    </button>
  );
}
export default memo(Button);
