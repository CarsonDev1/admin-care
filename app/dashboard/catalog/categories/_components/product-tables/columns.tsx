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
    header: 'DESCRIPTION'
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
          <div>
            <strong>Conditions:</strong> {warranty.warranty_conditions}
          </div>
          <div>
            <strong>Duration:</strong> {warranty.warranty_duration}
          </div>
          <div>
            <strong>Non-Warranty Cases:</strong> {warranty.non_warranty_cases}
          </div>
          <div>
            <strong>Repair Time:</strong> {warranty.repair_time}
          </div>
          <div>
            <strong>Special Offer:</strong> {warranty.special_offer}
          </div>
          <div>
            <strong>Warranty Period:</strong> {warranty.warranty_period}
          </div>
          <div>
            <strong>Repair Duration:</strong> {warranty.repair_duration}
          </div>
        </div>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
