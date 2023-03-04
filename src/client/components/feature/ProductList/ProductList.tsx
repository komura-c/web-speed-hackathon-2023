import type { FC } from 'react';
import { memo } from 'react';

import type { FeatureSectionFragmentResponse } from '../../../graphql/fragments';
import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType/GetDeviceType';
import { ProductGridList } from '../ProductGridList';
import { ProductListSlider } from '../ProductListSlider';

type Props = {
  featureSection: FeatureSectionFragmentResponse;
};

export const ProductList: FC<Props> = memo(({ featureSection }) => {
  return (
    <GetDeviceType>
      {({ deviceType }) => {
        switch (deviceType) {
          case DeviceType.DESKTOP: {
            return <ProductListSlider items={featureSection.items} />;
          }
          case DeviceType.MOBILE: {
            return <ProductGridList items={featureSection.items} />;
          }
        }
      }}
    </GetDeviceType>
  );
}, (prevProps, nextProps) => prevProps.featureSection.id === nextProps.featureSection.id);

ProductList.displayName = 'ProductList';
