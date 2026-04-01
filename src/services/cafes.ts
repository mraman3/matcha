import { supabase } from "../lib/supabase";
import { Cafe } from "../types/database";

export async function getCafes(): Promise<Cafe[]> {
  const { data, error } = await supabase
    .from("cafes")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return data as Cafe[];
}