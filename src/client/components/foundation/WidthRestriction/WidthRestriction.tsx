import type { FC, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import * as styles from './WidthRestriction.styles';

type Props = {
  children: ReactNode;
};

export const WidthRestriction: FC<Props> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clientWidth, setClientWidth] = useState<number>(0);

  const isReady = clientWidth !== 0;

  useEffect(() => {
    const timer = setInterval(() => {
      const width = containerRef.current?.getBoundingClientRect().width ?? 0;
      // 横幅を最大 1024px にする
      setClientWidth(Math.min(width, 1024));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container()}>
      <div className={styles.inner({ width: clientWidth })}>{isReady ? children : null}</div>
    </div>
  );
};
