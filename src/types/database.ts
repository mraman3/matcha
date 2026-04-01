export type Cafe = {
  id: string;
  name: string;
  address_line_1: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  postal_code: string | null;
  latitude: number | null;
  longitude: number | null;
  instagram_url: string | null;
  website_url: string | null;
  description: string | null;
  hero_image_url: string | null;
  tags: string[] | null;
  source_type: "seed" | "user_added";
  created_at: string;
  updated_at?: string;
};

export type PassportEntry = {
  id: string;
  profile_id: string;
  cafe_id: string;
  visited_at: string;
  rating_overall: number;
  rating_matcha: number | null;
  rating_vibe: number | null;
  rating_mannys: number | null; // ← add this
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type EntryPhoto = {
  id: string;
  entry_id: string;
  storage_path: string;
  created_at: string;
};