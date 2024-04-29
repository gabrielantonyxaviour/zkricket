import { createClient } from "@/utils/supabase/server";

export default async function fetchMatchDetail(slug: string) {
  const supabase = createClient();
  const { data: fixture, error } = await supabase
    .from("fixture")
    .select("*")
    .eq("id", slug);
  if (error) throw new Error(error.message);
  return fixture;
}
