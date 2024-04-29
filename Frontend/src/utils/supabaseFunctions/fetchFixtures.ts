import { createClient } from "@/utils/supabase/server";

export default async function fetchFixtures() {
  const supabase = createClient();
  const { data: fixture, error } = await supabase.from("fixture").select("*");
  if (error) throw new Error(error.message);
  return fixture;
}
