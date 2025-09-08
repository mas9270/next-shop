import { Suspense } from "react";
import Products from "./products";
import { Loader2 } from "lucide-react";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex justify-center items-center">
          {" "}
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <Products />
    </Suspense>
  );
}
