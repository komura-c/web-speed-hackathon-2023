import type { FC } from 'react';
import { Link } from 'react-router-dom';

import type { ProductFragmentResponse } from '../../../graphql/fragments';
import { useActiveOffer } from '../../../hooks/useActiveOffer';
import { AspectRatio } from '../../foundation/AspectRatio';
import { Image } from '../../foundation/Image';
import { ProductOfferLabel } from '../../product/ProductOfferLabel';

import * as styles from './ProductCard.styles';

type Props = {
  product: ProductFragmentResponse;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const thumbnailFile = product.media.find((productMedia) => productMedia.isThumbnail)?.file;

  const { activeOffer } = useActiveOffer(product);
  const price = activeOffer?.price ?? product.price;

  return (
    <Link to={`/product/${product.id}`}>
      <div className={styles.inner()}>
        {thumbnailFile ? (
          <div className={styles.image()}>
            <AspectRatio ratioHeight={9} ratioWidth={16}>
              <Image height={126} src={thumbnailFile.filename} width={224} />
            </AspectRatio>
          </div>
        ) : null}
        <div className={styles.description()}>
          <p className={styles.itemName()}>{product.name}</p>
          <span className={styles.itemPrice()}>
            {new Intl.NumberFormat('ja-JP', { currency: 'JPY', style: 'currency' }).format(price)}
          </span>
        </div>
        {activeOffer !== undefined && (
          <div className={styles.label()}>
            <ProductOfferLabel size="base">タイムセール中</ProductOfferLabel>
          </div>
        )}
      </div>
    </Link>
  );
};
