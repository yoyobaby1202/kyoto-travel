import { JourneyMap } from "./JourneyMap";
/** The Day 2 diagram uses the same north-up verified layout as the other daily maps. */
export function ArashiyamaMap({ animate = false }: { animate?: boolean }) {
  return <JourneyMap day={2} animate={animate} />;
}
