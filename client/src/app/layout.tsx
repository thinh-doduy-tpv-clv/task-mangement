import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../asset/globals.css";
import ReactQueryProvider from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Management",
  description: "Task Management",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      {/* Same as */}
      <html lang="en">
        <body className={inter.className}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {children}
        </body>
      </html>
    </ReactQueryProvider>
  );
}
