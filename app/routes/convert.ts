import { ActionFunctionArgs, json } from "@remix-run/node";
import { convert } from "utils/converter";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.json();

  return json(convert(formData));
}
