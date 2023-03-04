import classNames from 'classnames';
import type { FC } from 'react';

import { AspectRatio } from '../../foundation/AspectRatio';
import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType/GetDeviceType';
import { WidthRestriction } from '../../foundation/WidthRestriction';

import * as styles from './ProductHeroImageSkelton.style';

export const ProductHeroImageSkelton: FC = (() => {
  return (
    <GetDeviceType>
      {({ deviceType }) => {
        return (
          <WidthRestriction>
            <div className={styles.container()}>
              <AspectRatio ratioHeight={9} ratioWidth={16}>
                <div className={styles.image()}/>
              </AspectRatio>

              <div className={styles.overlay()}>
                <p
                  className={classNames(styles.title(), {
                    [styles.title__desktop()]: deviceType === DeviceType.DESKTOP,
                    [styles.title__mobile()]: deviceType === DeviceType.MOBILE,
                  })}
                >
                </p>
                <p
                  className={classNames(styles.description(), {
                    [styles.description__desktop()]: deviceType === DeviceType.DESKTOP,
                    [styles.description__mobile()]: deviceType === DeviceType.MOBILE,
                  })}
                >
                </p>
              </div>
            </div>
          </WidthRestriction>
        );
      }}
    </GetDeviceType>
  )
});
ProductHeroImageSkelton.displayName = 'ProductHeroImageSkelton';
