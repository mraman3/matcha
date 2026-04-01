import { supabase } from "../lib/supabase";
import { getStoragePathFromPublicUrl } from "./storagePaths";

export async function deleteEntryPhotosForEntry(entryId: string) {
  const { data, error } = await supabase
    .from("entry_photos")
    .select("storage_path")
    .eq("entry_id", entryId);

  if (error) {
    console.error("deleteEntryPhotosForEntry select error:", error);
    throw error;
  }

  const paths = (data ?? [])
    .map((row) => getStoragePathFromPublicUrl(row.storage_path, "entry-photos"))
    .filter((path): path is string => Boolean(path));

  if (paths.length === 0) return;

  const { error: removeError } = await supabase.storage
    .from("entry-photos")
    .remove(paths);

  if (removeError) {
    console.error("deleteEntryPhotosForEntry remove error:", removeError);
    throw removeError;
  }
}