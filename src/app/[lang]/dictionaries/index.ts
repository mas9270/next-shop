// app/[lang]/dictionaries/index.ts
import "server-only";

const dictionaries = {
  en: () => import("./en.json").then((m) => m.default),
  fa: () => import("./fa.json").then((m) => m.default),
};

export const getDictionary = async (locale: "en" | "fa") =>
  dictionaries[locale]();
