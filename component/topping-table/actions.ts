"use server";
import { createClient } from "../../utils/supabase/server";

const supabase = createClient();

export async function fetchTopping() {
  const { data, error } = await supabase.from("toppings").select("*");

  if (error) console.error("Error fetching toppings:", error);

  return data;
}

export async function addTopping(value: String) {
  const { data, error } = await supabase
    .from("toppings")
    .insert([{ name: value }])
    .select();

  if (error) console.error("Error adding toppings:", error);
}

export async function editTopping(id: number, value: String) {
  const { error } = await supabase
    .from("toppings")
    .update({ name: value })
    .eq("id", id);

  if (error) console.error("Error editing toppings:", error);
}

export async function removeTopping(id: number) {
  const { error } = await supabase.from("toppings").delete().eq("id", id);

  if (error) console.error("Error deleting toppings:", error);
}
