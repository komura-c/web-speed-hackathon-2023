import { useSuspenseQuery_experimental as useSuspenseQuery } from '@apollo/client';

import type { GetFeatureSectionsQueryResponse } from '../graphql/queries';
import { GetFeatureSectionsQuery } from '../graphql/queries';

export const useFeatures = (featureIds: number[]) => {
  const featuresResult = useSuspenseQuery<GetFeatureSectionsQueryResponse>(GetFeatureSectionsQuery, {
    variables: {
      featureIds,
    }
  });

  const features = featuresResult.data?.features;

  return { features };
};
