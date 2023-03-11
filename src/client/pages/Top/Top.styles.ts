import { css } from '@emotion/css';

export const skelton = () => css`
  min-height: 100vh;
`;

export const featureList = () => css`
  min-height: 280px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 40px;
`;

export const feature = () => css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const featureHeading = () => css`
  font-size: 1.5rem;
  font-weight: 700;
  padding: 0 16px;
`;
