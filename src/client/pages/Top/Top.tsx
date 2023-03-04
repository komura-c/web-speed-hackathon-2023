import type { FC } from 'react';
import { Helmet } from 'react-helmet';

import { Layout } from '../../components/application/Layout';
import { ProductList } from '../../components/feature/ProductList';
import { ProductHeroImage } from '../../components/product/ProductHeroImage';
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

const ProductListWrapperComponent = () => {
  const { features } = useFeatures();
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

export const Top: FC = () => {
  return (
    <>
      <Helmet>
        <title>買えるオーガニック</title>
      </Helmet>
      <Layout>
        <div>
          <ProductHeroImageWrapperComponent />
          <ProductListWrapperComponent />
        </div>
      </Layout>
    </>
  );
};
