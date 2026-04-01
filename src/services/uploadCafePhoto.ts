import { Platform } from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import { decode } from "base64-arraybuffer";
import { supabase } from "../lib/supabase";

type UploadCafePhotoInput = {
  uri: string;
  fileName?: string | null;
};

function getFileExtension(fileName?: string | null, uri?: string) {
  const source = fileName || uri || "";
  const parts = source.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "jpg";
}

function getContentType(ext: string) {
  switch (ext) {
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "heic":
      return "image/heic";
    case "jpeg":
    case "jpg":
    default:
      return "image/jpeg";
  }
}

async function getArrayBufferFromUri(uri: string) {
  if (Platform.OS === "web") {
    const response = await fetch(uri);
    const blob = await response.blob();
    return await blob.arrayBuffer();
  }

  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return decode(base64);
}

export async function uploadCafePhoto({
  uri,
  fileName,
}: UploadCafePhotoInput): Promise<string> {
  const ext = getFileExtension(fileName, uri);
  const contentType = getContentType(ext);

  const arrayBuffer = await getArrayBufferFromUri(uri);

  const filePath = `cafes/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from("cafe-images")
    .upload(filePath, arrayBuffer, {
      contentType,
      upsert: false,
    });

  if (error) {
    console.error("uploadCafePhoto error:", error);
    throw error;
  }

  const { data } = supabase.storage.from("cafe-images").getPublicUrl(filePath);

  return data.publicUrl;
}