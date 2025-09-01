"use client"; 
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher({
  currentLang,
}: {
  currentLang: "en" | "fa";
}) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLang = () => {
    const newLang = currentLang === "en" ? "fa" : "en";
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath)
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center space-x-2"
      onClick={toggleLang}
    >
      {currentLang === "en" ? (
        <span className="text-md font-bold">FA</span>
      ) : (
        <span className="text-md font-bold">EN</span>
      )}
    </Button>
  );
}
