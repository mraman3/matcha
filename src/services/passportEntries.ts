import { supabase } from "../lib/supabase";

type CreatePassportEntryInput = {
    profile_id: string;
    cafe_id: string;
    visited_at: string;
    rating_overall: number;
    rating_matcha?: number | null;
    rating_vibe?: number | null;
    rating_mannys?: number | null;
    price_level?: number | null;
    would_return?: boolean | null;
    notes?: string | null;
};

export async function createPassportEntry(input: CreatePassportEntryInput) {
    const { data, error } = await supabase
        .from("passport_entries")
        .insert({
            profile_id: input.profile_id,
            cafe_id: input.cafe_id,
            visited_at: input.visited_at,
            rating_overall: input.rating_overall,
            rating_matcha: input.rating_matcha ?? null,
            rating_vibe: input.rating_vibe ?? null,
            rating_mannys: input.rating_mannys ?? null,
            price_level: input.price_level ?? null,
            would_return: input.would_return ?? null,
            notes: input.notes ?? null,
        })
        .select()
        .single();

    if (error) {
        console.error("createPassportEntry error:", error);
        throw error;
    }

    return data;
}