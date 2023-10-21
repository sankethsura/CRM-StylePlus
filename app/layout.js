import "./globals.css";
import { Inter } from "next/font/google";
import ToastProvider from "./UI/toastProvider";
import VerticalNav from "@/components/VerticalNav";
import Title from "./UI/Title";
import TitleNav from "@/components/TitleNav";
import CustomCssBG from "@/components/customCssBG";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomCssBG />
        <div className="w-[100vw] h-[100vh] flex bg-darkColor1/10 ">
          <section className="h-full hidden sm:flex">
            <VerticalNav />
          </section>
          <section className="h-full flex flex-col gap-5 flex-grow py-5 sm:pr-5 sm:pl-0 px-5 ">
            <div className="h-16 w-full rounded flex items-center justify-center bg-gradient-to-br from-25% from-customColorPurple">
              <Title className={`sm:flex hidden`}>Contacts</Title>
              <div className="flex items-center justify-between w-full px-4 sm:hidden">
                <Title>Contacts</Title>
                <TitleNav />
              </div>
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
