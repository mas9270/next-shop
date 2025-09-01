// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "fa"];

function getLocale(request: NextRequest) {
  const acceptLang = request.headers.get("accept-language") || "";
  if (acceptLang.includes("fa")) return "fa";
  return "en"; // پیش‌فرض
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // بررسی کن مسیر زبان داره یا نه
  const pathnameLocale = pathname.split("/")[1];

  // اگر مسیر درست بود (fa یا en) → ادامه بده
  if (locales.includes(pathnameLocale)) {
    return NextResponse.next();
  }

  // اگر مسیر اصلاً زبان نداشت → ریدایرکت به زبان کاربر
  if (pathnameLocale === "") {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }

  // اگر مسیر زبان اشتباه داشت (مثل /fadwd) → ریدایرکت به پیش‌فرض
  return NextResponse.redirect(new URL(`/fa`, request.url));
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|images).*)"], 
};
