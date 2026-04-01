import { supabase } from "../lib/supabase";

export async function getAvailableTags(): Promise<string[]> {
  const { data, error } = await supabase.from("cafes").select("tags");

  if (error) {
    console.error("getAvailableTags error:", error);
    throw error;
  }

  const tagSet = new Set<string>();

  for (const row of data ?? []) {
    const tags = row.tags as string[] | null | undefined;
    if (!tags) continue;

    for (const tag of tags) {
      const normalized = tag.trim();
      if (normalized) {
        tagSet.add(normalized);
      }
    }
  }

  return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
}