import { EventItem } from "@/data/events";

const FAVORITES_KEY = "best-hobby-event:favorites";
const CUSTOM_EVENTS_KEY = "best-hobby-event:custom-events";

export function getFavoriteBrands(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function setFavoriteBrands(brands: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(brands));
}

export function getCustomEvents(): EventItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(CUSTOM_EVENTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCustomEvent(event: EventItem) {
  if (typeof window === "undefined") return;

  const current = getCustomEvents();
  const next = [event, ...current.filter((item) => item.id !== event.id)];
  window.localStorage.setItem(CUSTOM_EVENTS_KEY, JSON.stringify(next));
}

export function getMergedEvents(baseEvents: EventItem[]): EventItem[] {
  const customEvents = getCustomEvents();
  return [...customEvents, ...baseEvents.filter((base) => !customEvents.some((item) => item.id === base.id))];
}
