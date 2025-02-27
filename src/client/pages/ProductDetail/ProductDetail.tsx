import type { FC } from 'react';
import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';

import { Layout } from '../../components/application/Layout';
import { useAuthUserContext } from '../../components/application/Providers/AuthProvider';
import { WidthRestriction } from '../../components/foundation/WidthRestriction';
import { ProductMediaListPreviewer } from '../../components/product/ProductMediaListPreviewer';
import { ProductOverview } from '../../components/product/ProductOverview';
import { ProductPurchaseSection } from '../../components/product/ProductPurchaseSeciton';
import { useActiveOffer } from '../../hooks/useActiveOffer';
import { useAmountInCart } from '../../hooks/useAmountInCart';
import { useProduct } from '../../hooks/useProduct';
import { useSendReview } from '../../hooks/useSendReview';
import { useUpdateCartItem } from '../../hooks/useUpdateCartItems';
import { useOpenModal } from '../../store/modal';
import { normalizeCartItemCount } from '../../utils/normalize_cart_item';

import * as styles from './ProductDetail.styles';

const ReviewSection = lazy(() => import('../../components/review/ReviewSection'));

export const ProductDetail: FC = () => {
  const { productId } = useParams();

  const { product } = useProduct(Number(productId));
  const { isAuthUser } = useAuthUserContext();
  const { sendReview } = useSendReview();
  const { updateCartItem } = useUpdateCartItem();
  const handleOpenModal = useOpenModal();
  const { amountInCart } = useAmountInCart(Number(productId));
  const { activeOffer } = useActiveOffer(product);

  const handleSubmitReview = ({ comment }: { comment: string }) => {
    sendReview({
      variables: {
        comment,
        productId: Number(productId),
      },
    });
  };

  const handleUpdateItem = (productId: number, amount: number) => {
    updateCartItem({
      variables: { amount: normalizeCartItemCount(amount), productId },
    });
  };

  document.title = product ? product.name : '';
  return (
    <>
      <Layout>
        <WidthRestriction>
          <div className={styles.container()}>
            <section className={styles.details()}>
              <ProductMediaListPreviewer product={product} />
              <div className={styles.overview()}>
                <ProductOverview activeOffer={activeOffer} product={product} />
              </div>
              <div className={styles.purchase()}>
                <ProductPurchaseSection
                  amountInCart={amountInCart}
                  isAuthUser={isAuthUser}
                  onOpenSignInModal={() => handleOpenModal('SIGN_IN')}
                  onUpdateCartItem={handleUpdateItem}
                  product={product}
                />
              </div>
            </section>

            <section className={styles.reviews()}>
              <h2 className={styles.reviewsHeading()}>レビュー</h2>
              <Suspense fallback="">
                <ReviewSection
                  hasSignedIn={isAuthUser}
                  onSubmitReview={handleSubmitReview}
                  productId={productId ? productId : ''}
                />
              </Suspense>
            </section>
          </div>
        </WidthRestriction>
      </Layout>
    </>
  );
};
