"use client";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";

export default function LanguageSwitcher() {
  const { locale } = useAppSelector((state) => state.lang);
  const router = useRouter();
  const pathname = usePathname();

  const toggleLang = () => {
    const newLang = locale === "en" ? "fa" : "en";
    const newPath = pathname.replace(`/${locale}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center cursor-pointer"
      onClick={toggleLang}
    >
      {locale === "en" ? (
        <span className="text-md">FA</span>
      ) : (
        <span className="text-md">EN</span>
      )}
    </Button>
  );
}
