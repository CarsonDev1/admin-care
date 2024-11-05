import { NavItem } from '@/types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
  warranty_info: Array<{ content: string }>;
};

export type Category = {
  id: number;
  name: string;
  products?: Product[];
  subcategories?: Category[]; // Added subcategories for nested structure
};

// Mock data with hierarchical, nested categories and products
export const categories: Category[] = [
  {
    id: 2,
    name: 'Danh Mục Sản Phẩm',
    subcategories: [
      {
        id: 3,
        name: 'Điện thoại',
        subcategories: [
          {
            id: 4,
            name: 'Samsung',
            products: [
              {
                photo_url: 'https://example.com/galaxy-s10.jpg',
                name: 'Galaxy S10',
                description: 'High-performance smartphone',
                created_at: '2024-01-10',
                price: 600,
                id: 201,
                category: 'Samsung',
                updated_at: '2024-02-10',
                warranty_info: [{ content: '1-year warranty' }]
              },
              {
                photo_url: 'https://example.com/galaxy-tab-a9.jpg',
                name: 'Galaxy Tab A9',
                description: 'Affordable tablet',
                created_at: '2024-01-20',
                price: 300,
                id: 202,
                category: 'Samsung',
                updated_at: '2024-02-15',
                warranty_info: [{ content: '1-year warranty' }]
              }
            ]
          },
          {
            id: 5,
            name: 'iPhone',
            products: [
              {
                photo_url: 'https://example.com/iphone13.jpg',
                name: 'iPhone 13',
                description: 'Latest iPhone model',
                created_at: '2024-01-15',
                price: 1000,
                id: 301,
                category: 'iPhone',
                updated_at: '2024-02-25',
                warranty_info: [{ content: '2-year warranty' }]
              }
            ]
          }
        ]
      },
      {
        id: 6,
        name: 'Máy tính bảng',
        subcategories: [
          {
            id: 7,
            name: 'iPad',
            products: [
              {
                photo_url: 'https://example.com/ipad-air.jpg',
                name: 'iPad Air',
                description: 'High-performance iPad',
                created_at: '2024-01-05',
                price: 800,
                id: 401,
                category: 'iPad',
                updated_at: '2024-02-05',
                warranty_info: [{ content: '1-year warranty' }]
              }
            ]
          },
          {
            id: 8,
            name: 'Xiaomi',
            products: [
              {
                photo_url: 'https://example.com/xiaomi-pad.jpg',
                name: 'Xiaomi Pad',
                description: 'Affordable Xiaomi tablet',
                created_at: '2024-01-12',
                price: 400,
                id: 402,
                category: 'Xiaomi',
                updated_at: '2024-02-10',
                warranty_info: [{ content: '1-year warranty' }]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 9,
    name: 'Laptop',
    subcategories: [
      {
        id: 10,
        name: 'Macbook',
        products: [
          {
            photo_url: 'https://example.com/macbook-pro.jpg',
            name: 'Macbook Pro',
            description: 'Powerful Macbook Pro',
            created_at: '2024-02-15',
            price: 2000,
            id: 501,
            category: 'Macbook',
            updated_at: '2024-03-01',
            warranty_info: [{ content: '2-year warranty' }]
          }
        ]
      },
      {
        id: 11,
        name: 'Dell',
        products: [
          {
            photo_url: 'https://example.com/dell-xps.jpg',
            name: 'Dell XPS 13',
            description: 'Compact and powerful Dell laptop',
            created_at: '2024-01-25',
            price: 1500,
            id: 502,
            category: 'Dell',
            updated_at: '2024-02-10',
            warranty_info: [{ content: '1-year warranty' }]
          }
        ]
      }
    ]
  },
  {
    id: 12,
    name: 'Khuyến mãi',
    subcategories: [
      {
        id: 13,
        name: 'Giờ vàng giá sốc',
        products: [
          {
            photo_url: 'https://example.com/flash-sale.jpg',
            name: 'Flash Sale Item',
            description: 'Discounted item for a limited time',
            created_at: '2024-02-05',
            price: 100,
            id: 601,
            category: 'Giờ vàng giá sốc',
            updated_at: '2024-02-10',
            warranty_info: [{ content: 'No warranty' }]
          }
        ]
      },
      {
        id: 14,
        name: 'Thời trang giảm giá',
        products: [
          {
            photo_url: 'https://example.com/clothing-sale.jpg',
            name: 'Discounted Jacket',
            description: 'Warm jacket on discount',
            created_at: '2024-02-10',
            price: 80,
            id: 602,
            category: 'Thời trang giảm giá',
            updated_at: '2024-02-15',
            warranty_info: [{ content: '6-month warranty' }]
          }
        ]
      }
    ]
  }
];

// Additional data structure for user and other entities as per your original code
export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  }
  // Additional users...
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    items: []
  },
  {
    title: 'Employee',
    url: '/dashboard/employee',
    icon: 'user',
    isActive: false,
    items: []
  },
  {
    title: 'Catalog',
    url: '/dashboard/catalog',
    icon: 'product',
    isActive: false,
    items: [
      {
        title: 'Product',
        url: '/dashboard/catalog/product',
        icon: 'product'
      },
      {
        title: 'Categories',
        url: '/dashboard/catalog/categories',
        icon: 'login'
      }
    ]
  },
  {
    title: 'Account',
    url: '#',
    icon: 'billing',
    isActive: false,
    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen'
      },
      {
        title: 'Login',
        url: '/',
        icon: 'login'
      }
    ]
  },
  {
    title: 'Config',
    url: '/dashboard/config',
    icon: 'config',
    isActive: false,
    items: [
      {
        title: 'Detail Product',
        url: '/dashboard/config/detail-product',
        icon: 'userPen'
      },
      {
        title: 'Other',
        url: '/dashboard/config/other',
        icon: 'login'
      }
    ]
  },
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: 'kanban',
    isActive: false,
    items: []
  }
];
