import { Inter } from "next/font/google";
import "../../asset/globals.css";
import App from "../App";
import { getSession } from "../action";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("sign-in");
  }

  return (
    <App>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </App>
  );
}
