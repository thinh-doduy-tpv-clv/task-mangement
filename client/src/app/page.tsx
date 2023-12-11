import { getSession } from "./action";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("sign-in");
  } else {
    redirect("task-management");
  }

  return undefined;
}
