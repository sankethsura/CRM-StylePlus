import "./globals.css";
import { Inter } from "next/font/google";
import ToastProvider from "./UI/toastProvider";
import VerticalNav from "@/components/VerticalNav";
import Title from "./UI/Title";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-[100vw] h-[100vh] flex bg-darkColor1 ">
          <section className="h-full">
            <VerticalNav />
          </section>
          <section className="h-full flex flex-col gap-5 flex-grow py-5 pr-5">
            <div className="h-16 w-full rounded flex items-center justify-center bg-gradient-to-br from-25% from-customColorPurple">
              <Title>Contacts</Title>
            </div>
            <div className="w-full h-full overflow-y-scroll bg-gradient-to-br from-25% from-customColorPurple rounded p-5 scrollHide">
              <ToastProvider>{children}</ToastProvider>
            </div>
          </section>
        </div>
      </body>
    </html>
  );
}
