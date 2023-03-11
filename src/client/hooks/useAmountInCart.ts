import { useAuthUserContext } from '../components/application/Providers/AuthProvider';

export const useAmountInCart = (productId: number) => {
  const { authUser } = useAuthUserContext();

  const order = authUser?.orders.find((order) => order.isOrdered === false);
  const shoppingCartItems = order?.items ?? [];
  const amountInCart = shoppingCartItems.find((item) => item.product.id === productId)?.amount ?? 0;

  return { amountInCart };
};
