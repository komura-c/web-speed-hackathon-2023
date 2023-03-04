import { Temporal } from '@js-temporal/polyfill';

import type { LimitedTimeOfferFragmentResponse } from '../graphql/fragments';

export function getActiveOffer(
  offers: LimitedTimeOfferFragmentResponse[],
): LimitedTimeOfferFragmentResponse | undefined {
  const activeOffer = offers.find((offer) => {
    const now = Temporal.Now.instant();
    const startDate = Temporal.Instant.from(offer.startDate);
    const endDate = Temporal.Instant.from(offer.endDate);

    return Temporal.Instant.compare(startDate, now) < 0 && Temporal.Instant.compare(now, endDate) < 0;
  });

  return activeOffer;
}
