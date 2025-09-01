import { getDictionary } from "./dictionaries";
export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: "en" | "fa" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <div className="">
      <h1>{dict.common.welcome}</h1>
      <button>{dict.products.cart}</button>
    </div>
  );
}
