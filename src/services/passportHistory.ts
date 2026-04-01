import { supabase } from "../lib/supabase";

type PassportHistoryCafe = {
  id: string;
  name: string;
  address_line_1: string | null;
  city: string | null;
};

type EntryPhotoRow = {
  id: string;
  entry_id: string;
  storage_path: string;
  created_at: string;
};

export type PassportHistoryItem = {
  id: string;
  profile_id: string;
  cafe_id: string;
  visited_at: string;
  rating_overall: number;
  rating_matcha: number | null;
  rating_vibe: number | null;
  rating_mannys: number | null;
  price_level?: number | null;
  would_return?: boolean | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  cafe: PassportHistoryCafe | null;
  entryPhotoUrl: string | null;
};

type PassportEntryRow = {
  id: string;
  profile_id: string;
  cafe_id: string;
  visited_at: string;
  rating_overall: number;
  rating_matcha: number | null;
  rating_vibe: number | null;
  rating_mannys: number | null;
  price_level?: number | null;
  would_return?: boolean | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export async function getPassportHistory(
  profileId: string
): Promise<PassportHistoryItem[]> {
  const { data: entries, error: entriesError } = await supabase
    .from("passport_entries")
    .select(`
      id,
      profile_id,
      cafe_id,
      visited_at,
      rating_overall,
      rating_matcha,
      rating_vibe,
      rating_mannys,
      price_level,
      would_return,
      notes,
      created_at,
      updated_at
    `)
    .eq("profile_id", profileId)
    .order("visited_at", { ascending: false });

  if (entriesError) {
    console.error("passport_entries query error:", entriesError);
    throw entriesError;
  }

  const typedEntries = (entries ?? []) as PassportEntryRow[];

  if (typedEntries.length === 0) {
    return [];
  }

  const cafeIds = [...new Set(typedEntries.map((entry) => entry.cafe_id))];
  const entryIds = typedEntries.map((entry) => entry.id);

  const { data: cafes, error: cafesError } = await supabase
    .from("cafes")
    .select("id, name, address_line_1, city")
    .in("id", cafeIds);

  if (cafesError) {
    console.error("cafes query error:", cafesError);
    throw cafesError;
  }

  const { data: entryPhotos, error: entryPhotosError } = await supabase
    .from("entry_photos")
    .select("id, entry_id, storage_path, created_at")
    .in("entry_id", entryIds)
    .order("created_at", { ascending: false });

  if (entryPhotosError) {
    console.error("entry_photos query error:", entryPhotosError);
    throw entryPhotosError;
  }

  const cafeMap = new Map<string, PassportHistoryCafe>();
  for (const cafe of (cafes ?? []) as PassportHistoryCafe[]) {
    cafeMap.set(String(cafe.id), cafe);
  }

  const photoMap = new Map<string, EntryPhotoRow>();
  for (const photo of (entryPhotos ?? []) as EntryPhotoRow[]) {
    if (!photoMap.has(photo.entry_id)) {
      photoMap.set(photo.entry_id, photo);
    }
  }

  return typedEntries.map((entry) => ({
    ...entry,
    cafe: cafeMap.get(String(entry.cafe_id)) ?? null,
    entryPhotoUrl: photoMap.get(entry.id)?.storage_path ?? null,
  }));
}