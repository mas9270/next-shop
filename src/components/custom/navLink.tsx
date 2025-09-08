"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { appRoutes } from "@/constants/routes";
import { useAppSelector } from "@/store/hooks";

export default function NavLink() {
  const path = usePathname();
  const { lang, dictionary } = useAppSelector((state) => state.lang);

  function convertTitle(title: string) {
    let content = "";
    switch (title) {
      case "home":
        content = dictionary.home;
        break;
      case "products":
        content = dictionary.products;
        break;
      case "about-us":
        content = dictionary.aboutUs;
        break;
      case "contact-us":
        content = dictionary.contactUs;
        break;

      default:
        break;
    }
    return content;
  }

  return (
    <div className="flex">
      <div className="hidden gap-4 lg:flex">
        {appRoutes.map((item) => {
          const href = item.path === "/" ? `/${lang}` : `/${lang}${item.path}`;
          return (
            <Link
              key={item.path}
              href={href}
              className={`text-sm flex items-center  ${
                href === path ? "text-sky-500" : ""
              }`}
            >
              {convertTitle(item.title)}
            </Link>
          );
        })}
      </div>
      <div className="lg:hidden">ساید بار</div>
    </div>
  );
}
