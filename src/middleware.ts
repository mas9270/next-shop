import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "./lib/tokenConfig";

const locales = ["en", "fa"];

// مسیرهایی که فقط کاربر لاگین کرده می‌تونه دسترسی داشته باشه
const protectedRoutes = ["/dashboard", "/profile"];

function getLocale(request: NextRequest) {
  const acceptLang = request.headers.get("accept-language") || "";
  if (acceptLang.includes("fa")) return "fa";
  return "fa"; // پیش‌فرض
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- مدیریت Locale ---
  const pathnameLocale = pathname.split("/")[1];

  // اگر مسیر زبان درست بود ادامه بده
  if (!locales.includes(pathnameLocale)) {
    // مسیر زبان اشتباه یا خالی
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  // مسیر فعلی بدون locale
  const pathWithoutLocale = pathname.replace(/^\/(fa|en)/, "");

  // --- بررسی مسیر محافظت‌شده ---
  const isProtected = protectedRoutes.some((route) =>
    pathWithoutLocale.startsWith(route)
  );

  if (isProtected) {
    // توکن از کوکی یا header میاد
    const token = request.cookies.get("rasmastoken")?.value; // یا از Authorization header
    const valid = await verifyAccessToken(token);

    if (!valid) {
      // اگر توکن نامعتبر یا خالی بود → هدایت به صفحه لاگین
      return NextResponse.redirect(new URL(`/${pathnameLocale}`, request.url));
    } else {
      if (valid?.role === "ADMIN") {
        return NextResponse.next();
      } else {
        if (pathWithoutLocale.startsWith("/dashboard")) {
          return NextResponse.redirect(
            new URL(`/${pathnameLocale}`, request.url)
          );
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|images).*)"], // API و _next و images از middleware رد نمیشن
};
