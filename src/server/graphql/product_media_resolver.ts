import type { ProductMedia } from '../../model/product_media';

import type { GraphQLModelResolver } from './model_resolver';

export const productMediaResolver: GraphQLModelResolver<ProductMedia> = {
  file: (parent) => {
    return parent.file;
  },
};
