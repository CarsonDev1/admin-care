import { Category, Product } from '@/constants/data';
import { fakeCategories, fakeProducts } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './categories-tables/columns';
import CategoryList from '@/app/dashboard/catalog/categories/_components/categories-tree/category-list';
import CategoryListWithProducts from '@/app/dashboard/catalog/categories/_components/categories-tree/category-list';

type ProductListingPage = {};

export default async function ProductListingPage({}: ProductListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const data = await fakeCategories.getCategories(filters);
  const categoriesDatass = data.categories;
  const totalProducts = data.total_categories;
  const categoriesData: Category[] = data.categories;

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-4 text-2xl font-bold">Product Categories</h1>
      <CategoryListWithProducts />
    </div>
    // <ProductTable
    //   columns={columns}
    //   data={categoriesData}
    //   totalItems={totalProducts}
    // />
  );
}
