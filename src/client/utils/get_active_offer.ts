import type { LimitedTimeOfferFragmentResponse } from '../graphql/fragments';

export function getActiveOffer(
  offers: LimitedTimeOfferFragmentResponse[],
): LimitedTimeOfferFragmentResponse | undefined {
  if (offers && offers.length) {
    const activeOffer = offers.find((offer) => {
      const now = new Date();
      const startDate = new Date(offer.startDate);
      const endDate = new Date(offer.endDate);

      return startDate.getTime() < now.getTime() && now.getTime() < endDate.getTime();
    });

    return activeOffer;
  }
  return undefined;
}
