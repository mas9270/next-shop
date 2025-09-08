"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

export default function FooterPage() {
  return (
    <footer className="border-t py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* بخش لوگو و توضیح */}
        <div className="space-y-4">
          <div className="flex justify-center md:justify-start">
            <Image src="/images/logo2.png" alt="Logo" width={120} height={40} />
          </div>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            فروشگاه آنلاین شما برای خرید بهترین محصولات با کیفیت بالا و ارسال
            سریع. هدف ما ارائه بهترین تجربه خرید آنلاین است.
          </p>
        </div>

        {/* لینک‌های سریع */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">لینک‌های سریع</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:underline">
                خانه
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:underline">
                فروشگاه
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                درباره ما
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                ارتباط با ما
              </Link>
            </li>
          </ul>
        </div>

        {/* اطلاعات تماس */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">ارتباط با ما</h3>
          <ul className="space-y-3">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-5 h-5" /> support@example.com
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <Phone className="w-5 h-5" />
              09152238077
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <MapPin className="w-5 h-5" /> مشهد، ایران
            </li>
          </ul>
        </div>

        {/* شبکه‌های اجتماعی */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">ما را دنبال کنید</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <Link href="#" aria-label="Facebook">
              <Facebook className="w-6 h-6 hover:text-indigo-600 transition-colors" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="w-6 h-6 hover:text-pink-500 transition-colors" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="w-6 h-6 hover:text-blue-400 transition-colors" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6 hover:text-blue-700 transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* کپی‌رایت */}
      <div className="mt-12 pt-6 border-t text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} فروشگاه آنلاین. تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}
