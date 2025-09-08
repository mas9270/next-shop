"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { appRoutes } from "@/constants/routes";
import { useAppSelector } from "@/store/hooks";
import { Menu, X } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";

export default function NavLink() {
  return (
    <div className="flex items-center">
      <DesktopView />
      <MobileView />
    </div>
  );
}

function convertTitle(title: string, dictionary: { [key: string]: string }) {
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

function DesktopView() {
  const path = usePathname();
  const { locale, dictionary } = useAppSelector((state) => state.lang);

  return (
    <div className="hidden gap-4 lg:flex">
      {appRoutes.map((item) => {
        const href =
          item.path === "/" ? `/${locale}` : `/${locale}${item.path}`;
        return (
          <Link
            key={item.path}
            href={href}
            className={`text-sm flex items-center  ${
              href === path ? "text-sky-500" : ""
            }`}
          >
            {convertTitle(item.title, dictionary)}
          </Link>
        );
      })}
    </div>
  );
}

function MobileView() {
  const [open, setOpen] = useState<boolean>(false);
  const { locale, dir, dictionary } = useAppSelector((state) => state.lang);
  const path = usePathname();

  return (
    <div className="lg:hidden">
      <Menu
        className="cursor-pointer hover:text-sky-300"
        onClick={() => {
          setOpen(true);
        }}
      />
      <Drawer
        modal={true}
        direction={locale === "fa" ? "right" : "left"}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DrawerContent className="right-0" dir={dir}>
          <div className="mx-auto w-full max-w-sm flex flex-col">
            <div className="w-full flex justify-between items-center p-2 mb-3  border-b">
              <Image
                src={"/images/logo2.png"}
                alt="logo"
                width={30}
                height={30}
                className="rounded-[100%] bg-white"
              />
              <X
                size={22}
                className="text-red-400 hover:text-red-300 cursor-pointer"
                onClick={() => {
                  setOpen(false);
                }}
              />
            </div>
            <div className="w-full flex flex-col">
              {appRoutes.map((item) => {
                const href =
                  item.path === "/" ? `/${locale}` : `/${locale}${item.path}`;
                return (
                  <Link
                    onClick={() => {
                      
                      setOpen(false);
                    }}
                    key={item.path}
                    href={href}
                    className={`text-sm flex items-center p-2 ${
                      href === path ? "text-sky-500" : ""
                    }`}
                  >
                    {convertTitle(item.title, dictionary)}
                  </Link>
                );
              })}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
