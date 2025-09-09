export type ProductType = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
};

export const products: ProductType[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `محصول ${i + 1}`,
  description: "این یک توضیح کوتاه برای محصول است.",
  image: `https://picsum.photos/seed/${i + 1}/300/200`,
  price: (i + 1) * 100000,
}));
