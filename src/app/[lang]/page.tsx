import { getDictionary } from "../../lib/dictionaries";
export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: "en" | "fa" }>;
}) {
  const { lang } = await params;
  // const dict = await getDictionary(lang);
  return (
    <div className="">
      <h1>خانه</h1>
    </div>
  );
}
