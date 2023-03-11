import type { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import * as styles from './AnchorLink.styles';

type Props = {
  href: string;
  children: ReactNode;
};
export const AnchorLink: FC<Props> = ({ children, href }) => (
  <Link className={styles.container()} to={href}>
    {children}
  </Link>
);
