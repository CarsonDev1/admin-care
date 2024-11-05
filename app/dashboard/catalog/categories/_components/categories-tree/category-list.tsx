'use client';
import { useState, useEffect } from 'react';
import { Category, Product } from '@/constants/data';
import { fakeCategories } from '@/constants/mock-api';
import CategoryTree from '@/app/dashboard/catalog/categories/_components/categories-tree/category-tree';
import ProductTable from '@/app/dashboard/catalog/categories/_components/product-categories/product-table';

// Helper function to recursively collect all products in a category and its subcategories
const collectAllProducts = (category: Category): Product[] => {
  let products = category.products || [];
  if (category.subcategories) {
    for (const subcategory of category.subcategories) {
      products = products.concat(collectAllProducts(subcategory));
    }
  }
  return products;
};

const CategoryListWithProducts = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const data = await fakeCategories.getCategories({ page: 1, limit: 10 });
      setCategories(data.categories);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const allProducts = collectAllProducts(selectedCategory);
      setProducts(allProducts);
    }
  }, [selectedCategory]);

  return (
    <div className="flex">
      {/* Category List */}
      <div className="w-1/4 border-r p-4">
        <h2 className="mb-4 text-xl font-semibold">Categories</h2>
        {categories.map((category) => (
          <CategoryTree
            key={category.id}
            category={category}
            onSelectCategory={setSelectedCategory}
            activeCategory={selectedCategory} // Pass the activeCategory prop
          />
        ))}
      </div>

      {/* Product Table */}
      <div className="w-2/3 p-4">
        <h2 className="mb-4 text-xl font-semibold">Products in Category</h2>
        {selectedCategory ? (
          <ProductTable products={products} />
        ) : (
          <p>Select a category to view products.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryListWithProducts;
