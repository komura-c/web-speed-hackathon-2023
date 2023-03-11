import { useAuthUserContext } from '../components/application/Providers/AuthProvider';

export const useOrder = () => {
  const { authUser } = useAuthUserContext();
  const order = authUser?.orders.find((order) => order.isOrdered === false);

  return { order };
};
