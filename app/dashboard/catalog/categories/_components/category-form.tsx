'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import Select, { MultiValue, ActionMeta } from 'react-select';
import { useEffect, useState } from 'react';
import { fakeProducts, Product } from '@/constants/mock-api';

const formSchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters.'),
  products: z.array(
    z.object({
      name: z.string().min(1, 'Product name is required'),
      description: z.string().optional(),
      photo_url: z.string().url('Photo URL must be valid'),
      created_at: z.string().optional(),
      price: z.number().positive().optional(),
      discount_price: z.number().positive().optional(),
      category: z.string().optional(),
      updated_at: z.string().optional(),
      warranty_info: z.array(z.object({ content: z.string() })).optional()
    })
  )
});

type FormData = z.infer<typeof formSchema>;

type ProductOption = {
  value: string;
  label: string;
  description?: string;
  photo_url?: string;
  created_at?: string;
  price?: number;
  discount_price?: number;
  category?: string;
  updated_at?: string;
  warranty_info?: { content: string }[];
};

export default function CategoryForm({
  initialData,
  pageTitle
}: {
  initialData: {
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
  } | null;
  pageTitle: string;
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      products: initialData?.products || []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'products'
  });

  const [productOptions, setProductOptions] = useState<ProductOption[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<ProductOption[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const result = await fakeProducts.getProducts({ page: 1, limit: 50 });
      const formattedOptions = result.products.map((product) => ({
        value: product.id.toString(),
        label: product.name,
        description: product.description,
        photo_url: product.photo_url,
        discount_price: product.discount_price,
        created_at: product.created_at,
        price: product.price,
        category: product.category,
        updated_at: product.updated_at,
        warranty_info: product.warranty_info
      }));
      setProductOptions(formattedOptions);
    }
    fetchProducts();
  }, []);

  function onSubmit(values: FormData) {
    console.log(values);
  }

  function handleAddProducts() {
    const selectedProductDetails = selectedProducts.map((selected) => {
      return {
        name: selected.label,
        description: selected.description,
        photo_url: selected.photo_url || '',
        created_at: selected.created_at,
        price: selected.price,
        discount_price: selected.discount_price,
        category: selected.category,
        updated_at: selected.updated_at,
        warranty_info: selected.warranty_info
      };
    });

    selectedProductDetails.forEach((product) => {
      append(product);
    });

    setSelectedProducts([]);
  }

  function handleSelectChange(
    newValue: MultiValue<ProductOption>,
    actionMeta: ActionMeta<ProductOption>
  ) {
    setSelectedProducts([...newValue]);
  }

  return (
    <Card className="mx-auto w-full rounded-lg shadow-xl">
      <CardHeader className="rounded-t-lg bg-opacity-80 px-6 py-4 backdrop-blur-md">
        <CardTitle className="text-left text-3xl font-semibold">
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="rounded-b-lg bg-white p-6 text-gray-800">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium text-gray-700">
                    Category Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category name"
                      {...field}
                      className="w-full rounded-lg border p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel className="text-lg font-medium text-gray-700">
                Products in Category
              </FormLabel>
              <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      {[
                        'Product Name',
                        'Photo',
                        'Description',
                        'Discount Price',
                        'Price',
                        'Category',
                        'Updated At',
                        'Warranty Info',
                        'Actions'
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
                    {fields.map((field, index) => (
                      <tr key={field.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{field.name}</td>
                        <td className="px-4 py-2">
                          <img
                            src={field.photo_url}
                            alt={field.name}
                            className="h-12 w-12 rounded-lg"
                          />
                        </td>
                        <td className="line-clamp-2 max-w-xs overflow-hidden px-4">
                          {field.description}
                        </td>
                        <td className="px-4 py-2">{field.discount_price}</td>
                        <td className="px-4 py-2">
                          {field.price ? `$${field.price}` : ''}
                        </td>
                        <td className="px-4 py-2">{field.category}</td>
                        <td className="px-4 py-2">{field.updated_at}</td>
                        <td className="line-clamp-4 max-w-60 px-4">
                          {field.warranty_info?.map((info, idx) => (
                            <div key={idx} className="text-sm text-gray-600">
                              {info.content.substring(0, 50) + '...'}
                            </div>
                          ))}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <Button
                            variant="ghost"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-6 rounded-full bg-gradient-to-r from-green-400 to-teal-500 px-4 py-2 text-white hover:from-green-500 hover:to-teal-600">
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-lg bg-white p-8 shadow-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold text-gray-800">
                    Select Products to Add
                  </DialogTitle>
                </DialogHeader>
                <Select
                  options={productOptions}
                  value={selectedProducts}
                  onChange={handleSelectChange}
                  isMulti
                  isSearchable
                  placeholder="Choose products"
                  className="mt-2 rounded-lg"
                />
                <Button
                  onClick={handleAddProducts}
                  className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-3 text-white hover:bg-blue-600"
                >
                  Add to Category
                </Button>
              </DialogContent>
            </Dialog>

            <Button
              type="submit"
              className="mt-6 w-full rounded-lg bg-[#DDB49F] px-4 py-3 font-semibold text-white hover:bg-[#f0c9b6]"
            >
              Save Category
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
