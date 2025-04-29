import { PropsWithChildren, memo } from 'react';
import * as motion from 'motion/react-client';

import style from './style.module.css';
import { Colors } from '@styles/Colors';
import { AnimatePresence } from 'motion/react';

export interface IModalProps extends PropsWithChildren {
  isVisible: boolean;
}

function Modal({ isVisible, children }: IModalProps) {
  console.log(isVisible);
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key='modal'
          style={{ backgroundColor: Colors.shape }}
          className={style.container}
          initial={{ x: '100%' }}
          animate={{ x: '0%' }}
          exit={{ x: '100%' }}
          transition={{
            type: 'tween',
            duration: 0.4,
            ease: 'easeInOut',
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(Modal);
