'use client';
import { Category } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';

// Recursive function to render categories and products in a nested structure
const renderCategoryProducts = (category: Category) => (
  <div className="space-y-2">
    {category.products?.map((product, index) => (
      <div
        key={`product-${index}`}
        className="ml-4 flex items-center space-x-2"
      >
        <Image
          src={product.photo_url}
          alt={product.name}
          width={40}
          height={40}
          className="rounded"
        />
        <div>
          <div className="font-semibold">{product.name}</div>
          <div className="text-sm text-gray-500">{product.description}</div>
          <div className="text-sm text-gray-500">
            Created: {product.created_at}
          </div>
          <div className="text-sm text-gray-500">Price: ${product.price}</div>
          <div className="text-sm text-gray-500">
            Category: {product.category}
          </div>
          <div className="text-sm text-gray-500">
            Updated: {product.updated_at}
          </div>
          <div className="text-sm text-gray-500">
            Warranty:{' '}
            {product.warranty_info.map((info) => info.content).join(', ')}
          </div>
        </div>
      </div>
    ))}
    {category.subcategories?.map((subcategory, subIndex) => (
      <div key={`subcategory-${subIndex}`} className="ml-4">
        <div className="font-semibold">{subcategory.name}</div>
        {renderCategoryProducts(subcategory)}{' '}
        {/* Recursively render subcategories */}
      </div>
    ))}
  </div>
);

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: 'CATEGORY NAME'
  },
  {
    accessorKey: 'products',
    header: 'PRODUCTS & SUBCATEGORIES',
    cell: ({ row }) => renderCategoryProducts(row.original as Category)
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
