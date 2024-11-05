'use client';

import { FileUploader } from '@/components/file-uploader';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Product } from '@/constants/mock-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, useWatch, useFieldArray } from 'react-hook-form';
import * as z from 'zod';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { FiTrash, FiPlus } from 'react-icons/fi';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  [{ font: [] }],
  [{ size: ['small', false, 'large', 'huge'] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ align: [] }],
  ['link', 'image', 'video'],
  ['clean']
];

const formSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length === 1, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  name: z.string().min(2, {
    message: 'Product name must be at least 2 characters.'
  }),
  category: z.string(),
  price: z.number(),
  discount_price: z.number().optional(),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.'
  }),
  warrantyAvailable: z.string().nonempty('Select if warranty is available'),
  warranty_info: z
    .array(
      z.object({
        content: z.string().min(5, {
          message: 'Content must be at least 5 characters.'
        })
      })
    )
    .optional()
});

interface ProductFormProps {
  initialData: Product | null;
  pageTitle: string;
}

export default function ProductForm({
  initialData,
  pageTitle
}: ProductFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      category: initialData?.category || '',
      price: initialData?.price || 0,
      discount_price: initialData?.discount_price || 0,
      description: initialData?.description || '',
      warrantyAvailable: 'yes',
      warranty_info: initialData?.warranty_info || []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'warranty_info'
  });

  const warrantyAvailable = useWatch({
    control: form.control,
    name: 'warrantyAvailable'
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const modules = {
    toolbar: toolbarOptions
  };

  const formats = [
    'header',
    'font',
    'list',
    'bullet',
    'bold',
    'italic',
    'underline',
    'link',
    'image',
    'align'
  ];

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="w-full space-y-6">
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                      maxFiles={4}
                      maxSize={4 * 1024 * 1024}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select categories" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beauty">Beauty Products</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="home">Home & Garden</SelectItem>
                        <SelectItem value="sports">
                          Sports & Outdoors
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Enter price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discount_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Enter discount price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <ReactQuill
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Enter product description"
                          modules={modules}
                          formats={formats}
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="warrantyAvailable"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warranty Available</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Yes or No" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {warrantyAvailable === 'yes' && (
              <div className="space-y-4 rounded-md border border-slate-200 p-3">
                <h3 className="mb-2">Warranty</h3>

                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex flex-col space-y-4 rounded-md border p-4"
                  >
                    <FormField
                      control={form.control}
                      name={`warranty_info.${index}.content`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Warranty Info {index + 1}</FormLabel>
                          <FormControl>
                            <Controller
                              control={form.control}
                              name={`warranty_info.${index}.content`}
                              render={({ field }) => (
                                <ReactQuill
                                  value={field.value}
                                  onChange={field.onChange}
                                  placeholder="Enter warranty details"
                                  modules={modules}
                                  formats={formats}
                                />
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      className="mt-4 self-end"
                    >
                      <FiTrash className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => append({ content: '' })}
                  className="mt-2"
                >
                  <FiPlus className="mr-2 h-5 w-5" /> Add Warranty Info
                </Button>
              </div>
            )}

            <div className="flex items-center justify-center">
              <Button type="submit" className="font-semibold">
                Add Product
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
