import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Layout from "@/components/layout/layout";
import { ThemeProvider } from "@/providers/themeProvider";
import StoreProvider from "@/providers/storeProvider";
import LangConfig from "@/components/custom/LangConfig";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

const iranSanse = localFont({
  src: [
    {
      path: "../../../public/fonts/IranSansX/Webfonts/fonts/woff2/IRANSansX-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IranSansX/Webfonts/fonts/woff2/IRANSansX-Bold.woff2",
      weight: "bold",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IranSansX/Webfonts/fonts/woff2/IRANSansX-Heavy.woff2",
      weight: "1000",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IranSansX/Webfonts/fonts/woff2/IRANSansX-ExtraBlack.woff2",
      weight: "950",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IranSansX/Webfonts/fonts/woff2/IRANSansX-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IranSansX/Webfonts/fonts/woff2/IRANSansX-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IranSansX/Webfonts/fonts/woff2/IRANSansX-DemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IranSansX/Webfonts/fonts/woff2/IRANSansX-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IranSansX/Webfonts/fonts/woff2/IRANSansX-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IranSansX/Webfonts/fonts/woff2/IRANSansX-UltraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IranSansX/Webfonts/fonts/woff2/IRANSansX-Thin.woff2",
      weight: "100",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "rasmas",
  description: "فست فود rasmas",
};

type Lang = "en" | "fa";

// export function generateStaticParams() {
//   return [{ lang: "en" }, { lang: "fa" }];
// }

export default function RootLayout({
  children,
}: // params,
Readonly<{
  children: React.ReactNode;
  // params: { lang: Lang };
}>) {
  // const { lang } = params;

  return (
    <html
      lang={"fa"}
      // dir={lang === "fa" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={`${iranSanse.className} `}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ToastContainer />
            {/* <LangConfig lang={lang} /> */}
            <Layout lang={"fa"}>{children}</Layout>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
