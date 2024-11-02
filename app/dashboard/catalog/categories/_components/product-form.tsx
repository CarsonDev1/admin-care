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
import { useForm, Controller, useWatch } from 'react-hook-form';
import * as z from 'zod';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

// Define toolbar options for ReactQuill
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
    .refine((files) => files?.length == 1, 'Image is required.')
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
    .object({
      warranty_conditions: z.string().min(5, {
        message: 'Warranty conditions must be at least 5 characters.'
      }),
      warranty_duration: z.string().min(5, {
        message: 'Warranty duration must be at least 5 characters.'
      }),
      non_warranty_cases: z.string().min(5, {
        message: 'Non-warranty cases must be at least 5 characters.'
      }),
      repair_time: z.string().min(5, {
        message: 'Repair time must be at least 5 characters.'
      }),
      special_offer: z.string().min(5, {
        message: 'Special offer must be at least 5 characters.'
      }),
      warranty_period: z.string().min(2, {
        message: 'Warranty period must be at least 2 characters.'
      }),
      repair_duration: z.string().min(2, {
        message: 'Repair duration must be at least 2 characters.'
      })
    })
    .optional()
});

export default function ProductForm({
  initialData,
  pageTitle
}: {
  initialData: Product | null;
  pageTitle: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      category: initialData?.category || '',
      price: initialData?.price || 0,
      discount_price: initialData?.discount_price || 0,
      description: initialData?.description || '',
      warrantyAvailable: 'no',
      warranty_info: initialData?.warranty_info || {}
    }
  });

  const warrantyAvailable = useWatch({
    control: form.control,
    name: 'warrantyAvailable'
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
              <>
                <div className="grid grid-cols-1 gap-6 rounded-md border border-slate-200 p-3 shadow-md md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="warranty_info.warranty_conditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Warranty Conditions</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter warranty conditions"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="warranty_info.warranty_duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Warranty Duration</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter warranty duration"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="warranty_info.non_warranty_cases"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Non-Warranty Cases</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter non-warranty cases"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="warranty_info.repair_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Repair Time</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter repair time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="warranty_info.special_offer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Offer</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter special offer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="warranty_info.warranty_period"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Warranty Period</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter warranty period (e.g., 12 months)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="warranty_info.repair_duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Repair Duration</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter repair duration (e.g., 30-60 mins)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            <Button type="submit">Add Product</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
