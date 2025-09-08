import Header from "./header";
import Main from "./main";
import Footer from "./footer";
import React from "react";
import LangConfig from "../custom/LangConfig";
import UserInfoConfig from "../custom/userInfoConfig";
import { ToastContainer } from "react-toastify";

export default function Layout(props: {
  children: React.ReactNode;
  lang: "en" | "fa";
}) {
  const { children, lang } = props;
  return (
    <>
      <LangConfig lang={lang} />
      <UserInfoConfig/>
      <ToastContainer />
      <div className="w-full flex flex-col min-h-screen">
        <Header />
        <Main>{children}</Main>
        <Footer />
      </div>
    </>
  );
}
