import type { Review } from '../../model/review';

import type { GraphQLModelResolver } from './model_resolver';

export const reviewResolver: GraphQLModelResolver<Review> = {
  user: (parent) => {
    return parent.user;
  },
};
