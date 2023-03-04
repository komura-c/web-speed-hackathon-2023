import classNames from 'classnames';
import type { FC } from 'react';
import { FaArrowLeft,FaArrowRight, FaCheckCircle, FaPlay, FaShoppingCart, FaUser } from 'react-icons/fa';

const Icons = {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaPlay,
  FaShoppingCart,
  FaUser,
}

import * as styles from './Icon.styles';

type Props = {
  type: keyof typeof Icons;
  width: number;
  height: number;
  color: string;
};

export const Icon: FC<Props> = ({ color, height, type, width }) => {
  const Icon = Icons[type];
  return (
    <span className={classNames(type, styles.container({ color, height, width }))}>
      <Icon />
    </span>
  );
};
