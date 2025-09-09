"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

// ساختار Zod برای اعتبارسنجی فرم
const contactSchema = z.object({
  name: z.string().min(2, "نام باید حداقل 2 کاراکتر باشد"),
  email: z.string().email("ایمیل معتبر وارد کنید"),
  subject: z.string().min(5, "موضوع باید حداقل 5 کاراکتر باشد"),
  message: z.string().min(10, "پیام باید حداقل 10 کاراکتر باشد"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    alert("پیام شما با موفقیت ارسال شد!");
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* معرفی صفحه */}
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
          با ما در ارتباط باشید
        </h1>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
          هر سوال، پیشنهاد یا نظری دارید، تیم ما آماده پاسخگویی به شماست. لطفاً
          از فرم زیر استفاده کنید یا از اطلاعات تماس ما بهره ببرید.
        </p>
      </section>

      {/* فرم تماس */}
      <section className="max-w-3xl mx-auto mt-20">
        <form
          className="grid grid-cols-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Label className="mb-2">نام شما</Label>
            <Input {...register("name")} placeholder="نام کامل" />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">ایمیل شما</Label>
            <Input
              {...register("email")}
              type="email"
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label className="mb-2">موضوع</Label>
            <Input {...register("subject")} placeholder="موضوع پیام" />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <Label className="mb-2">پیام شما</Label>
            <Textarea
              {...register("message")}
              rows={15}
              placeholder="پیام خود را وارد کنید..."
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full py-4 font-bold text-lg">
            ارسال پیام
          </Button>
        </form>
      </section>

      {/* اطلاعات تماس */}
      <section className="max-w-6xl mx-auto mt-28 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div>
          <Mail className="mx-auto mb-2 w-6 h-6" />
          <h3 className="text-2xl font-bold mb-2">ایمیل</h3>
          <p className="text-gray-600 dark:text-gray-300">
            mas.ahm92@gmail.com
          </p>
        </div>
        <div>
          <Phone className="mx-auto mb-2 w-6 h-6" />
          <h3 className="text-2xl font-bold mb-2">تلفن</h3>
          <p className="text-gray-600 dark:text-gray-300">09152238077</p>
        </div>
        <div>
          <MapPin className="mx-auto mb-2 w-6 h-6" />
          <h3 className="text-2xl font-bold mb-2">آدرس</h3>
          <p className="text-gray-600 dark:text-gray-300">ایران , مشهد</p>
        </div>
      </section>

      {/* شبکه‌های اجتماعی */}
      <section className="max-w-3xl mx-auto mt-28 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
          ما را در شبکه‌های اجتماعی دنبال کنید
        </h2>
        <p className="text-lg leading-relaxed mb-8">
          برای دریافت اخبار، تخفیف‌ها و اطلاع‌رسانی‌ها ما را دنبال کنید.
        </p>
        <div className="flex justify-center gap-6 text-2xl">
          <a href="#" aria-label="Facebook">
            <Facebook className="hover:text-indigo-600 transition-colors" />
          </a>
          <a href="#" aria-label="Instagram">
            <Instagram className="hover:text-pink-500 transition-colors" />
          </a>
          <a href="#" aria-label="Twitter">
            <Twitter className="hover:text-blue-400 transition-colors" />
          </a>
          <a href="#" aria-label="LinkedIn">
            <Linkedin className="hover:text-blue-700 transition-colors" />
          </a>
        </div>
      </section>
    </div>
  );
}
