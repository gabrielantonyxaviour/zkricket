import { createClient } from "@/utils/supabase/server";

export default async function getUser(address: string) {
  const supabase = createClient();

  let { data: userDetails, error } = await supabase
    .from("userDetails")
    .select("*")
    .eq("address", address);

  if (error) throw new Error(error.message);
  return userDetails;
}
