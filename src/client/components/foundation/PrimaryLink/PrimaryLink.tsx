import classNames from 'classnames';
import type { FC } from 'react';

import { AnchorLink } from '../AnchorLink';

import * as styles from './PrimaryLink.styles';

type Size = 'base' | 'lg';
type Props = {
  size: Size;
  href: string;
  children: string;
};

export const PrimaryLink: FC<Props> = ({ children, href, size }) => (
  <AnchorLink href={href}>
    <span
      className={classNames(styles.inner(), {
        [styles.container__lg()]: size === 'lg',
        [styles.container__base()]: size === 'base',
      })}
    >
      {children}
    </span>
  </AnchorLink>
);
