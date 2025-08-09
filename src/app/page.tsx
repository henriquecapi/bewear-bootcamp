import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import Mark from "@/components/common/mark-list";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";
const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
      category: true,
    },
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            width={0}
            height={0}
            className="h-auto w-full"
            sizes="100vw"
          />
        </div>

        <p className="space-y-6 px-5 font-semibold">Marcas Parceiras</p>
        <Mark />

        <ProductList products={products} title="Mais vendicdos" />

        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5">
          <Image
            src="/banner-02.png"
            alt="Leve uma vida com estilo"
            width={0}
            height={0}
            className="h-auto w-full"
            sizes="100vw"
          />
        </div>
        <div className="flex w-full gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <ProductList products={newlyCreatedProducts} title="Novidades" />
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Home;
