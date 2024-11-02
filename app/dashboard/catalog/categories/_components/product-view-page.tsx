import { fakeProducts, Product } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import ProductForm from './product-form';

type TProductViewPageProps = {
  categoriesId: string;
};

export default async function ProductViewPage({
  categoriesId
}: TProductViewPageProps) {
  let product = null;
  let pageTitle = 'Create New Product';

  if (categoriesId !== 'new') {
    const data = await fakeProducts.getProductById(Number(categoriesId));
    product = data.product as Product;
    if (!product) {
      notFound();
    }
    pageTitle = `Edit Product`;
  }

  return <ProductForm initialData={product} pageTitle={pageTitle} />;
}
