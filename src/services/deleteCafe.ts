import { supabase } from "../lib/supabase";

function getStoragePathFromPublicUrl(
  publicUrl: string,
  bucketName: string
): string | null {
  try {
    const url = new URL(publicUrl);
    const marker = `/storage/v1/object/public/${bucketName}/`;
    const index = url.pathname.indexOf(marker);

    if (index === -1) return null;

    return decodeURIComponent(url.pathname.slice(index + marker.length));
  } catch {
    return null;
  }
}

export async function deleteCafe(cafeId: string, heroImageUrl?: string | null) {
  if (heroImageUrl) {
    const path = getStoragePathFromPublicUrl(heroImageUrl, "cafe-images");

    if (path) {
      const { error: removeError } = await supabase.storage
        .from("cafe-images")
        .remove([path]);

      if (removeError) {
        console.error("deleteCafe storage remove error:", removeError);
        throw removeError;
      }
    }
  }

  const { error } = await supabase.from("cafes").delete().eq("id", cafeId);

  if (error) {
    console.error("deleteCafe row delete error:", error);
    throw error;
  }
}