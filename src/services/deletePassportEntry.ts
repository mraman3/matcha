import { supabase } from "../lib/supabase";
import { deleteEntryPhotosForEntry } from "./deleteEntryPhotosForEntry";

export async function deletePassportEntry(entryId: string) {
  await deleteEntryPhotosForEntry(entryId);

  const { error } = await supabase
    .from("passport_entries")
    .delete()
    .eq("id", entryId);

  if (error) {
    console.error("deletePassportEntry error:", error);
    throw error;
  }
}