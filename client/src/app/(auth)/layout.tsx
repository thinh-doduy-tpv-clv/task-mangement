import { Inter } from "next/font/google";
import "../../asset/globals.css";
import { getSession } from "../action";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect("/");
  }

  return <>{children}</>;
}
