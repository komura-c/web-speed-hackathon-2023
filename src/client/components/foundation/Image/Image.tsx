import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';

import * as styles from './Image.styles';

type Props = Omit<ComponentProps<'img'>, 'className'> & {
  fill?: boolean;
};

export const Image: FC<Props> = ({ fill, src, ...rest }) => {
  return (
    <img
      className={classNames(styles.container(), {
        [styles.container__fill()]: fill === true,
      })}
      loading="lazy"
      src={src ?   
        convertImage(src) : ''
      }
      {...rest}
    />
  );
};

function convertImage(str: string) {
  if (str.slice(-3) === 'jpg') {
    return str.replace('jpg', 'webp')
  }
  return str
}