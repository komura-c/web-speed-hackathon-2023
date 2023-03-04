import { useEffect, useState } from 'react';

import type { OrderFragmentResponse } from '../graphql/fragments';
import { getActiveOffer } from '../utils/get_active_offer';

export function useTotalPrice(order: OrderFragmentResponse) {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      let total = 0;
      for (const item of order.items) {
        const offer = getActiveOffer(item.product.offers);
        const price = offer?.price ?? item.product.price;
        total += price * item.amount;
      }
      setTotalPrice(total);
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [order]);

  return { totalPrice };
}
