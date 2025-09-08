import Image from "next/image";
import LanguageSwitcher from "../custom/LanguageSwitcher";
import { ToggleTheme } from "../custom/toggleTheme";
import UserConfig from "../custom/userConfig";
import NavLink from "../custom/navLink";
import CartIcon from "../custom/cartIcon";

export default function header() {
  return (
    <header className="w-full py-3 shadow flex justify-center dark:shadow-gray-700">
      <nav className="w-full flex justify-between max-w-7xl px-3">
        <div className="flex gap-5">
          <Image
            src={"/images/logo2.png"}
            alt="logo"
            width={50}
            height={50}
            className="rounded-[100%] bg-white"
          />
           <NavLink />
        </div>
        <div className="flex gap-2 items-center">
          <CartIcon/>
          <ToggleTheme />
          {/* <LanguageSwitcher /> */}
          <UserConfig  />
        </div>
      </nav>
    </header>
  );
}
