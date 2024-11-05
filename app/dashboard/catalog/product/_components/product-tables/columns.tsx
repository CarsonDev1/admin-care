'use client';
import { Product } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'photo_url',
    header: 'IMAGE',
    cell: ({ row }) => (
      <div className="relative aspect-square">
        <Image
          src={row.getValue('photo_url')}
          alt={row.getValue('name')}
          fill
          className="rounded-lg"
        />
      </div>
    )
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'category',
    header: 'CATEGORY'
  },
  {
    accessorKey: 'price',
    header: 'PRICE'
  },
  {
    accessorKey: 'discount_price',
    header: 'DISCOUNT PRICE'
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION',
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">
        {row.getValue('description')}
      </div>
    )
  },
  {
    accessorKey: 'warranty_info',
    header: 'WARRANTY INFO',
    cell: ({ row }) => {
      const warranty = row.getValue(
        'warranty_info'
      ) as Product['warranty_info'];
      return (
        <div className="space-y-1 text-sm">
          {warranty.map((item, index) => (
            <div key={index}>
              <strong>Info {index + 1}:</strong> {item.content}
            </div>
          ))}
        </div>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
