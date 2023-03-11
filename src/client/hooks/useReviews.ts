import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import type { GetProductReviewsQueryResponse } from '../graphql/queries';
import { GetProductReviewsQuery } from '../graphql/queries';

export const useReviews = (productId: number | undefined) => {
  const handleError = useErrorHandler();

  const [loadReviews, reviewsResult] = useLazyQuery<GetProductReviewsQueryResponse>(GetProductReviewsQuery, {
    onError: handleError,
    variables: {
      productId,
    },
  });

  useEffect(() => {
    loadReviews();
  }, [loadReviews, productId]);

  const reviews = reviewsResult.data?.product.reviews;

  return { reviews };
};
