import type { FC } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';

import { NotFound } from '../../../pages/NotFound';
import { Order } from '../../../pages/Order';
import { OrderComplete } from '../../../pages/OrderComplete';
import { ProductDetail } from '../../../pages/ProductDetail';
import { Top } from '../../../pages/Top';

import { useScrollToTop } from './hooks';

export const Routes: FC = () => {
  useScrollToTop();

  return (
    <ReactRoutes>
      <Route element={<Top />} path="/" />
      <Route element={<ProductDetail />} path="/product/:productId" />
      <Route element={<Order />} path="/order" />
      <Route element={<OrderComplete />} path="/order/complete" />
      <Route element={<NotFound />} path="*" />
    </ReactRoutes>
  );
};
