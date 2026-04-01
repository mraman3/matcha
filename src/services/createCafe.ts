import { supabase } from "../lib/supabase";
import { Cafe } from "../types/database";

export type CreateCafeInput = {
  name: string;
  address_line_1?: string | null;
  city?: string | null;
  region?: string | null;
  country?: string | null;
  postal_code?: string | null;
  instagram_url?: string | null;
  website_url?: string | null;
  description?: string | null;
  hero_image_url?: string | null;
  tags?: string[] | null;
};

export async function createCafe(input: CreateCafeInput): Promise<Cafe> {
  const { data, error } = await supabase
    .from("cafes")
    .insert({
      name: input.name.trim(),
      address_line_1: input.address_line_1?.trim() || null,
      city: input.city?.trim() || null,
      region: input.region?.trim() || null,
      country: input.country?.trim() || null,
      postal_code: input.postal_code?.trim() || null,
      instagram_url: input.instagram_url?.trim() || null,
      website_url: input.website_url?.trim() || null,
      description: input.description?.trim() || null,
      hero_image_url: input.hero_image_url?.trim() || null,
      tags: input.tags ?? [],
      source_type: "user_added",
    })
    .select("*")
    .single();

  if (error) {
    console.error("createCafe error:", error);
    throw error;
  }

  return data as Cafe;
}