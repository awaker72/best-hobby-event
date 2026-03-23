import { EventItem } from "@/data/events";
import { getEventStatus } from "@/lib/utils";

export function filterEventsByBrands(events: EventItem[], brandIds: string[]) {
  return events.filter((event) => brandIds.includes(event.brand));
}

export function sortEventsByPriority(events: EventItem[]) {
  const rank = {
    today: 0,
    "ending-soon": 1,
    ongoing: 2,
    upcoming: 3,
    ended: 4,
  } as const;

  return [...events].sort((a, b) => {
    const aStatus = getEventStatus(a.startDate, a.endDate) as keyof typeof rank;
    const bStatus = getEventStatus(b.startDate, b.endDate) as keyof typeof rank;

    if (rank[aStatus] !== rank[bStatus]) return rank[aStatus] - rank[bStatus];
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
}
