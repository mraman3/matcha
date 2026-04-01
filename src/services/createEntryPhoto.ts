import { supabase } from "../lib/supabase";

type CreateEntryPhotoInput = {
  entry_id: string;
  storage_path: string;
};

export async function createEntryPhoto(input: CreateEntryPhotoInput) {
  const { data, error } = await supabase
    .from("entry_photos")
    .insert({
      entry_id: input.entry_id,
      storage_path: input.storage_path,
    })
    .select()
    .single();

  if (error) {
    console.error("createEntryPhoto error:", error);
    throw error;
  }

  return data;
}