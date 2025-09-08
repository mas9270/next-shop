import Header from "./header";
import Main from "./main";
import Footer from "./footer";
import React from "react";
import LangConfig from "../custom/LangConfig";
import { ToastContainer } from "react-toastify";

export default function Layout(props: {
  children: React.ReactNode;
  lang: "en" | "fa";
}) {
  const { children, lang } = props;
  return (
    <>
      <LangConfig lang={lang} />
      <ToastContainer />
      <div className="w-full flex flex-col min-h-screen">
        <Header lang={lang} />
        <Main>{children}</Main>
        <Footer />
      </div>
    </>
  );
}
