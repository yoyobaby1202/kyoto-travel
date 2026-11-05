/** Every fresh launch opens the December 10 itinerary; navigation after launch keeps dates linked. */
export function initialTripHash(_hash: string): string {
  return "#/?day=1";
}
