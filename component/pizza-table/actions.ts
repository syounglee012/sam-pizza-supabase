"use server";
import { createClient } from "../../utils/supabase/server";

export async function fetchPizza() {
  const supabase = createClient();
  const { data, error } = await supabase.from("pizza").select("*");

  if (error) console.error("Error fetching pizza:", error);

  return data;
}

export async function addPizza(value: String) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("pizza")
    .insert([{ name: value }])
    .select();

  if (error) console.error("Error adding pizza:", error);
}

export async function addPizzaTopping(id: number, newTopping: string) {
  const supabase = createClient();

  const { data: pizzaData, error: fetchError } = await supabase
    .from("pizza")
    .select("toppings")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("Error fetching pizza toppings:", fetchError);
    return;
  }

  const updatedToppings = pizzaData.toppings
    ? [...pizzaData.toppings, newTopping]
    : [newTopping];

  const { data, error } = await supabase
    .from("pizza")
    .update({ toppings: updatedToppings })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error adding topping:", error);
  } else {
    console.log("Topping added:", data);
  }
}

export async function editPizza(id: number, value: String) {
  const supabase = createClient();

  const { error } = await supabase
    .from("pizza")
    .update({ name: value })
    .eq("id", id);

  if (error) console.error("Error editing pizza:", error);
}

export async function removePizza(id: number) {
  const supabase = createClient();

  const { error } = await supabase.from("pizza").delete().eq("id", id);

  if (error) console.error("Error deleting pizza:", error);
}

export async function removePizzaTopping(id: number, toppingToRemove: string) {
  const supabase = createClient();

  const { data: pizzaData, error: fetchError } = await supabase
    .from("pizza")
    .select("toppings")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("Error fetching pizza toppings:", fetchError);
    return;
  }

  const updatedToppings = pizzaData.toppings
    ? pizzaData.toppings.filter(
        (topping: string) => topping !== toppingToRemove
      )
    : [];

  const { data, error } = await supabase
    .from("pizza")
    .update({ toppings: updatedToppings })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error removing topping:", error);
  } else {
    console.log("Topping removed:", data);
  }
}
