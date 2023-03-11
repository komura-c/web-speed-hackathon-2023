import { Temporal } from '@js-temporal/polyfill';
import type { FC } from 'react';
import { memo } from 'react';

import type { LimitedTimeOfferFragmentResponse, ProductFragmentResponse } from '../../../graphql/fragments';
import { ProductOfferLabel } from '../ProductOfferLabel';

import * as styles from './ProductOverview.styles';

type Props = {
  product: ProductFragmentResponse | undefined;
  activeOffer: LimitedTimeOfferFragmentResponse | undefined;
};

export const ProductOverview: FC<Props> = memo(({ activeOffer, product }) => {
  if (product === undefined) {
    return null;
  }

  const renderActiveOffer = () => {
    if (activeOffer === undefined) {
      return;
    }

    const endTime = Temporal.Instant.from(activeOffer.endDate).toLocaleString('ja-jp', {
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      month: '2-digit',
      second: '2-digit',
      year: 'numeric',
    });

    return (
      <div className={styles.offerLabel()}>
        <ProductOfferLabel size="lg">
          <time>{endTime}</time> までタイムセール
        </ProductOfferLabel>
      </div>
    );
  };

  return (
    <div className={styles.container()}>
      {renderActiveOffer()}
      <p className={styles.productName()}>{product.name}</p>
      <p className={styles.productDescription()}>{product.description}</p>

      <div className={styles.priceWrapper()}>
        {activeOffer !== undefined ? (
          <span className={styles.priceWithoutOffer()}>
            {new Intl.NumberFormat('ja-JP', { currency: 'JPY', style: 'currency' }).format(product.price)}
          </span>
        ) : null}
        <span className={styles.price()}>
          {new Intl.NumberFormat('ja-JP', { currency: 'JPY', style: 'currency' }).format(
            activeOffer?.price ?? product.price,
          )}
        </span>
      </div>
    </div>
  );
});

ProductOverview.displayName = 'ProductOverview';
