import type { FC } from 'react';
import { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import { Layout } from '../../components/application/Layout';
import { useAuthUserContext } from '../../components/application/Providers/AuthProvider';
import { WidthRestriction } from '../../components/foundation/WidthRestriction';
import { OrderPreview } from '../../components/order/OrderPreview';
import { useOrder } from '../../hooks/useOrder';
import { useSubmitOrder } from '../../hooks/useSubmitOrder';
import { useUpdateCartItem } from '../../hooks/useUpdateCartItems';

import * as styles from './Order.styles';

const OrderForm = lazy(() => import('../../components/order/OrderForm'));

export const Order: FC = () => {
  const navigate = useNavigate();

  const { authUser, authUserLoading, isAuthUser } = useAuthUserContext();
  const { updateCartItem } = useUpdateCartItem();
  const { submitOrder } = useSubmitOrder();
  const { order } = useOrder();

  if (authUserLoading) {
    return null;
  }
  if (!isAuthUser) {
    navigate('/');
    return null;
  }

  const renderContents = () => {
    if (!authUser || order == undefined || order.items.length === 0) {
      return (
        <div className={styles.emptyContainer()}>
          <p className={styles.emptyDescription()}>商品がカートに入っていません</p>
        </div>
      );
    }

    return (
      <div className={styles.container()}>
        <div className={styles.cart()}>
          <h2 className={styles.cartHeading()}>カート</h2>
          <OrderPreview
            onRemoveCartItem={(productId) => {
              updateCartItem({
                variables: {
                  amount: 0,
                  productId,
                },
              });
            }}
            onUpdateCartItem={(productId, amount) => {
              updateCartItem({
                variables: {
                  amount,
                  productId,
                },
              });
            }}
            order={order}
          />
        </div>

        <div className={styles.addressForm()}>
          <h2 className={styles.addressFormHeading()}>お届け先</h2>
          <Suspense fallback="">
            <OrderForm
              onSubmit={(values) => {
                submitOrder({
                  variables: {
                    address: `${values.prefecture}${values.city}${values.streetAddress}`,
                    zipCode: values.zipCode,
                  },
                }).then(() => {
                  navigate('/order/complete');
                });
              }}
            />
          </Suspense>
        </div>
      </div>
    );
  };

  document.title = '購入手続き';
  return (
    <>
      <Layout>
        <WidthRestriction>{renderContents()}</WidthRestriction>
      </Layout>
    </>
  );
};
