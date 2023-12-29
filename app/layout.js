"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import ToastProvider from "./UI/toastProvider";
import VerticalNav from "@/components/VerticalNav";
import Title from "./UI/Title";
import TitleNav from "@/components/TitleNav";
import CustomCssBG from "@/components/customCssBG";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Provider from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  // const router = useRouter();

  const pathname = usePathname();

  const getTitle = (pathname) => {
    if (pathname === "/") {
      return "Contacts";
    } else if (pathname === "/dashboard") {
      return "Dashboard";
    } else if (pathname === "/gallery") {
      return "Gallery";
    } else if (pathname === "/authentication/signin") {
      return "Sign in";
    } else if (pathname === "/authentication/signup") {
      return "Sign up";
    } else if (pathname === "/authentication/forgot-password") {
      return "Sign in";
    } else {
      return "Contacts";
    }
  };

  return (
    <html lang="en">
      <head>
        <title>StylePlus</title>
      </head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9594999666346846"
     crossorigin="anonymous"></script>
      <body className={`${inter.className} bg-darkColor1`}>
        <Provider>
          <CustomCssBG />
          <div className="w-[100vw] h-[100vh] flex bg-darkColor1/10 ">
            <section className="h-full hidden sm:flex">
              <VerticalNav />
            </section>
            <section className="h-full flex flex-col gap-5 flex-grow py-5 sm:pr-5 sm:pl-0 px-5 ">
              <div className="h-16 w-full rounded flex items-center justify-center bg-gradient-to-br from-25% from-customColorPurple">
                <Title className={`sm:flex hidden`}>{getTitle(pathname)}</Title>
                <div className="flex items-center justify-between w-full px-4 sm:hidden">
                  <Title>{getTitle(pathname)}</Title>
                  <TitleNav />
                </div>
              </div>
              <div className="w-full h-full overflow-y-scroll bg-gradient-to-br from-25% from-customColorPurple rounded scrollHide">
                <ToastProvider>{children}</ToastProvider>
              </div>
            </section>
          </div>
        </Provider>
      </body>
    </html>
  );
}
