import React from "react";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* معرفی فروشگاه */}
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
          درباره فروشگاه ما
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          ما یک فروشگاه آنلاین پیشرو هستیم که با تمرکز بر کیفیت و تجربه خرید،
          بهترین محصولات را به مشتریان ارائه می‌دهیم. ماموریت ما ساده است: رضایت
          کامل مشتری و تجربه‌ای آسان و لذت‌بخش از خرید آنلاین.
        </p>
      </section>

      {/* ارزش‌ها */}
      <section className="max-w-6xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          {
            title: "کیفیت بی‌نظیر",
            description:
              "تمام محصولات پیش از ارسال با دقت بررسی می‌شوند تا بالاترین کیفیت را ارائه دهیم.",
          },
          {
            title: "ارسال سریع و مطمئن",
            description:
              "سفارشات در کمترین زمان پردازش و به دست شما می‌رسند، بدون هیچ تأخیر اضافی.",
          },
          {
            title: "پشتیبانی 24/7",
            description:
              "تیم پشتیبانی ما همیشه آماده پاسخگویی به سوالات و مشکلات شماست، در هر ساعت از شبانه‌روز.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </section>

      {/* داستان و مأموریت */}
      <section className="max-w-7xl mx-auto mt-28 flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            داستان ما
          </h2>
          <p className="text-lg leading-relaxed">
            ما با الهام از نیاز مشتریان و بازار آنلاین شروع کردیم و هدفمان ایجاد
            تجربه‌ای است که خرید آنلاین را ساده، مطمئن و لذت‌بخش کند. تیم ما با
            شور و اشتیاق در تلاش است تا هر روز بهتر شود.
          </p>
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            مأموریت ما
          </h2>
          <p className="text-lg leading-relaxed">
            هدف ما ارائه محصولاتی با کیفیت عالی، پشتیبانی بی‌نظیر و تجربه خریدی
            امن و سریع است. ما باور داریم که مشتریان راضی، بهترین سفیر برند ما
            هستند.
          </p>
        </div>
      </section>

      {/* تیم */}
      <section className="max-w-6xl mx-auto mt-28">
        <h2 className="text-4xl font-extrabold text-center mb-12">تیم ما</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {[
            {
              name: "مسعود",
              role: "مدیر بخش توسعه",
              src: "/images/logo2.png",
            },
            { name: "رسا", role: "مدیر سازمان", src: "/images/logo2.png" },
          ].map((member, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-center items-center p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300  "
            >
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src={member.src}
                  alt="User Avatar"
                  quality={100}
                  width={200}
                  height={200}
                  className={`object-cover w-full h-full ${
                    member.name === "مسعود" ? "scale-130" : ""
                  }`}
                />
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
