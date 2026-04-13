import { supabase } from "../lib/supabase";
import { getStoragePathFromPublicUrl } from "./storagePaths";

export async function deleteEntryPhotosForEntry(entryId: string) {
  const { data, error } = await supabase
    .from("entry_photos")
    .select("id, storage_path")
    .eq("entry_id", entryId);

  if (error) {
    console.error("deleteEntryPhotosForEntry select error:", error);
    throw error;
  }

  const rows = data ?? [];
  const paths = rows
    .map((row) => getStoragePathFromPublicUrl(row.storage_path, "entry-photos"))
    .filter((path): path is string => Boolean(path));

  if (paths.length > 0) {
    const { error: removeError } = await supabase.storage
      .from("entry-photos")
      .remove(paths);

    if (removeError) {
      console.error("deleteEntryPhotosForEntry remove error:", removeError);
      throw removeError;
    }
  }

  const photoIds = rows.map((row) => row.id);

  if (photoIds.length > 0) {
    const { error: deleteRowsError } = await supabase
      .from("entry_photos")
      .delete()
      .in("id", photoIds);

    if (deleteRowsError) {
      console.error("deleteEntryPhotosForEntry row delete error:", deleteRowsError);
      throw deleteRowsError;
    }
  }
}