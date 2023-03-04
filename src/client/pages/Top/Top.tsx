import type { FC} from 'react';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';

import { Layout } from '../../components/application/Layout';
import { ProductList } from '../../components/feature/ProductList';
import { ProductHeroImage } from '../../components/product/ProductHeroImage';
import { ProductHeroImageSkelton } from '../../components/product/ProductHeroImageSkelton';
import { useFeatures } from '../../hooks/useFeatures';
import { useRecommendation } from '../../hooks/useRecommendation';

import * as styles from './Top.styles';

const ProductHeroImageWrapperComponent = () => {
  const { recommendation } = useRecommendation();
  if (recommendation === undefined) {
    return null;
  }
  return <ProductHeroImage product={recommendation.product} title="今週のオススメ" />;
}

const ProductListWrapperComponent = ({featureIds}: {featureIds: number[]}) => {
  const { features } = useFeatures(featureIds);
  if (features === undefined) {
    return null;
  }
  return (
    <div className={styles.featureList()}>
      {features.map((featureSection) => {
        return (
          <div key={featureSection.id} className={styles.feature()}>
            <h2 className={styles.featureHeading()}>{featureSection.title}</h2>
            <ProductList featureSection={featureSection} />
          </div>
        );
      })}
    </div>
  )
}

const LazyProductListWrapperComponent = ({featureIds}: {featureIds: number[]}) => {
  const [ids, setIds] = useState<number[]>([]);
  const elemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            observer.disconnect();
          };
          if (!entry.target || !elemRef.current || !elemRef) return;
          setIds(featureIds);
          observer.unobserve(elemRef.current);
        });
      },
      {
        rootMargin: "20px",
      }
    );

    if (!elemRef.current) return;
    observer.observe(elemRef.current);

    return () => {
      if (!elemRef.current) return;
      observer.unobserve(elemRef.current);
    };
  }, [featureIds]);

  return (
    <div ref={elemRef}>
      {ids &&
        <ProductListWrapperComponent featureIds={ids} />
      }
    </div>
  );
};

export const Top: FC = () => {
  return (
    <>
      <Helmet>
        <title>買えるオーガニック</title>
      </Helmet>
      <Layout>
        <div>
          <Suspense fallback={<ProductHeroImageSkelton />}>
            <ProductHeroImageWrapperComponent />
          </Suspense>
          <ProductListWrapperComponent featureIds={[1,2]} />
          <LazyProductListWrapperComponent featureIds={[3,4,5,6]} />
          <LazyProductListWrapperComponent featureIds={[7,8,9,10]} />
        </div>
      </Layout>
    </>
  );
};
