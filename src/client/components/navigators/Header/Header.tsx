import type { FC } from 'react';

import { useOpenModal } from '../../../store/modal';
import { useAuthUserContext } from '../../application/Providers/AuthProvider';
import { AnchorLink } from '../../foundation/AnchorLink';
import { Icon } from '../../foundation/Icon';
import { Image } from '../../foundation/Image';

import * as styles from './Header.styles';

export const Header: FC = () => {
  const { isAuthUser } = useAuthUserContext();
  const handleOpenModal = useOpenModal();

  return (
    <header className={styles.container()}>
      <AnchorLink href="/">
        <div className={styles.logo()}>
          <Image src="/icons/logo.svg" />
        </div>
      </AnchorLink>
      {isAuthUser ? (
        <AnchorLink data-testid="navigate-order" href={'/order'}>
          <div className={styles.orderLink()}>
            <Icon color="#222222" height={20} type="FaShoppingCart" width={20} />
          </div>
        </AnchorLink>
      ) : (
        <button
          className={styles.signInButton()}
          data-testid="navigate-signin"
          onClick={() => handleOpenModal('SIGN_IN')}
        >
          <Icon color="#222222" height={20} type="FaUser" width={20} />
        </button>
      )}
    </header>
  );
};
