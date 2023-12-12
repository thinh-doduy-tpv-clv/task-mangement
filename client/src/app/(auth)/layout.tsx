import { Inter } from "next/font/google";
import "../../asset/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
