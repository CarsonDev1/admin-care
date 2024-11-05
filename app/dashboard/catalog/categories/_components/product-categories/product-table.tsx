'use client';
import { Product } from '@/constants/data';

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {[
              'ID',
              'Name',
              'Description',
              'Price',
              'Category',
              'Created At',
              'Updated At'
            ].map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-sm font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{product.id}</td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.description}</td>
              <td className="px-4 py-2">${product.price}</td>
              <td className="px-4 py-2">{product.category}</td>
              <td className="px-4 py-2">{product.created_at}</td>
              <td className="px-4 py-2">{product.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
