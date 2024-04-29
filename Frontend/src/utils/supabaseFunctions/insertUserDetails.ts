import { createClient } from "@/utils/supabase/server";

export default async function insertUserDetails(
  name: string,
  address: string,
  locality: string
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("userDetails")
    .insert([{ name: name }, { address: address }, { locality: locality }])
    .select();

  if (error) throw new Error(error.message);
  return data;
}
