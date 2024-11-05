import { fakeCategories, Category } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import CategoryForm from './category-form';

type TCategoryViewPageProps = {
  categoriesId: string;
};

export default async function CategoryViewPage({
  categoriesId
}: TCategoryViewPageProps) {
  let category: {
    name: string;
    products: {
      name: string;
      description: string;
      photo_url: string;
      created_at?: string;
      discount_price?: number;
      price?: number;
      category?: string;
      updated_at?: string;
      warranty_info?: { content: string }[];
    }[];
  } | null = null;

  let pageTitle = 'Create New Category';

  if (categoriesId !== 'new') {
    const data = await fakeCategories.getCategoryById(Number(categoriesId));
    const foundCategory = data.category as Category | null;

    if (!foundCategory) {
      notFound();
    } else {
      category = {
        name: foundCategory.name,
        products: foundCategory.products ?? []
      };
      pageTitle = `Edit Category - ${category.name}`;
    }
  }

  return <CategoryForm initialData={category} pageTitle={pageTitle} />;
}
