import { EventItem } from "@/data/events";
import { supabase } from "@/lib/supabase";

export type EventRow = {
  id: string;
  title: string;
  brand: string;
  type: EventItem["type"];
  start_date: string;
  end_date: string;
  summary: string;
  description: string;
  how_to_join: string | null;
  source_url: string;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
};

export function mapRowToEvent(row: EventRow): EventItem {
  return {
    id: row.id,
    brand: row.brand,
    title: row.title,
    type: row.type,
    startDate: row.start_date,
    endDate: row.end_date,
    summary: row.summary,
    description: row.description,
    howToJoin: row.how_to_join ?? "",
    sourceUrl: row.source_url,
  };
}

export async function fetchPublishedEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .order("start_date", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => mapRowToEvent(row as EventRow));
}

export async function fetchAllEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => mapRowToEvent(row as EventRow));
}

export async function createEvent(event: Omit<EventRow, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase.from("events").insert(event).select().single();

  if (error) throw error;
  return mapRowToEvent(data as EventRow);
}
