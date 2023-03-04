import type { FC } from 'react';

import type { FeatureItemFragmentResponse } from '../../../graphql/fragments';
import { ProductCard } from '../ProductCard';

import * as styles from './ProductGridList.styles';

type Props = {
  items: FeatureItemFragmentResponse[];
};

export const ProductGridList: FC<Props> = ({ items }) => {
  const products = items.map((item) => item.product);

  return (
    <ul className={styles.cardList()}>
      {products.map((product) => {
        return (
          <li key={product.id} className={styles.cardListItem()}>
            <ProductCard product={product} />
          </li>
        );
      })}
    </ul>
  );
};
