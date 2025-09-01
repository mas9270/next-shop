import Header from "./header";
import Main from "./main";
import Footer from "./footer";
import React from "react";

export default function Layout(props: {
  children: React.ReactNode;
  lang: "en" | "fa";
}) {
  const { children, lang } = props;
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header lang={lang} />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
