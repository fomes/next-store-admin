import prismadb from "@/lib/prismadb";

export const getStockCount = async (storeId: string) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId,
      isArchived: false,
    },
  });

  const stockSum = products.reduce((acc, product) => acc + product.stock, 0);

  return stockSum;
};
