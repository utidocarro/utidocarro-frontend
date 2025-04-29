import { PropsWithChildren, memo } from 'react';

import Modal, { IModalProps } from '../Modal';
import style from './style.module.css';
import Paragraph from '@components/texts/Paragraph';
import IconRounded from '@components/icons/IconRounded';
import { Close } from '@assets/icons';
import { Colors } from '@styles/Colors';

export interface IModalTitleProps extends IModalProps, PropsWithChildren {
  title: string;
  onClose: VoidFunction;
}

function ModalTitle({ title, onClose, children, ...props }: IModalTitleProps) {
  return (
    <Modal {...props}>
      <div className={style.container}>
        <div className={style.headerContainer}>
          <Paragraph size='medium' text={title} />
          <div className={style.buttonIcon} onClick={onClose}>
            <IconRounded type='tertiary' size={36}>
              <Close width={18} height={18} fill={Colors.white} />
            </IconRounded>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </Modal>
  );
}

export default memo(ModalTitle);
