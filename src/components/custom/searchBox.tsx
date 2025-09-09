"use client";
import React, { useState, ChangeEvent, useEffect, KeyboardEvent } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setText } from "@/store/slices/search";
import { usePathname, useRouter } from "next/navigation";

/**
 * SearchBox Component
 * - هماهنگ با تم روشن / تیره (Tailwind dark:)
 * - آیکون جستجو در سمت چپ
 * - قابلیت ارسال فرم با Enter یا کلیک روی دکمه
 * - بدون نیاز به پراپ، همه مقادیر داخلی مدیریت می‌شوند
 */
export default function SearchBox() {
  const dispatch = useAppDispatch();
  const { text } = useAppSelector((state) => state.search);
  const [value, setValue] = useState<string>("");
  const router = useRouter();
  const path = usePathname();

  function clear(): void {
    setValue("");
    dispatch(setText({ text: "" }));
  }

  function onChange(e: ChangeEvent<HTMLInputElement>): void {
    setValue(e.target.value);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(setText({ text: value }));
      if (!(path === "/fa/products" || path === "/en/products")) {
        router.push("/products");
      }
    }
  }

  useEffect(() => {
    // dispatch(setText({ text: e.target.value }));
    // setValue()

    () => {
      setValue("");
      dispatch(setText({ text: "" }));
    };
  }, []);

  return (
    <form
      className="flex items-center w-full max-w-2xl mx-4"
      role="search"
      aria-label="Search"
    >
      <div className="relative flex-1">
        {/* آیکون جستجو */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-slate-500 dark:text-slate-300" />
        </div>

        {/* Input */}
        <Input
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="جستجو..."
          className="pl-9 pr-9 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 z-1"
          aria-label="Search input"
        />

        {/* دکمه پاک‌سازی */}
        {value.length > 0 && (
          <div className="absolute inset-y-0 right-0 flex items-center h-full pr-2 z-2">
            <X
              size={17}
              onClick={clear}
              className="cursor-pointer text-slate-500 dark:text-slate-300"
            />
          </div>
        )}
      </div>
    </form>
  );
}
