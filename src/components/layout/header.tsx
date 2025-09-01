import Image from "next/image";
import LanguageSwitcher from "../custom/LanguageSwitcher";
import { ToggleTheme } from "../custom/toggleTheme";

export default function header(props: { lang: "fa" | "en" }) {
  return (
    <header className="w-full py-3 shadow flex justify-center dark:shadow-gray-700">
      <nav className="w-full flex justify-between max-w-5xl px-3">
        <div className="flex gap-5">
          <Image
            src={"/images/logo2.png"}
            alt="logo"
            width={50}
            height={25}
            className="rounded-[100%] bg-white"
          />
        </div>
        <div className="flex gap-2 items-center">
          <ToggleTheme />
          <LanguageSwitcher currentLang={props.lang} />
        </div>
      </nav>
    </header>
  );
}
