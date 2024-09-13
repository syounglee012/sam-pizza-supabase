import Topping from "../component/topping-table/topping";
import { createClient } from "../utils/supabase/server";

export default async function Home() {
  const supabase = createClient();

  let { data: toppings, error_topping } = await supabase
    .from("toppings")
    .select("*");
  let { data: pizza, error_pizza } = await supabase.from("pizza").select("*");
  if (error_pizza || error_topping) {
    console.error("Fetching data error:", error);
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Sam&apos;s Pizza</h1>
      <Topping data={toppings} pizza={pizza} />
    </div>
  );
}
