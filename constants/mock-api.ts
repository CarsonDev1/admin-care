////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter'; // For filtering

type Gender = 'male' | 'female';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude: number;
  latitude: number;
  gender: Gender;
  date_of_birth: string;
  job: string;
  profile_picture: string;
};

// Mock user data store
export const fakeUsers = {
  records: [] as User[],

  initialize() {
    const sampleUsers: User[] = [];
    function generateRandomUserData(id: number): User {
      const genders = ['male', 'female'];
      const jobs = [
        'Software Engineer',
        'Data Scientist',
        'Marketing Manager',
        'Graphic Designer',
        'Sales Manager',
        'Product Manager'
      ];
      const cities = [
        'San Francisco',
        'New York City',
        'Los Angeles',
        'Chicago',
        'Houston',
        'Phoenix',
        'Philadelphia',
        'San Antonio',
        'San Diego',
        'Dallas',
        'San Jose',
        'Austin',
        'Jacksonville'
      ];
      const states = [
        'California',
        'New York',
        'Texas',
        'Florida',
        'Illinois',
        'Pennsylvania',
        'Ohio',
        'Georgia',
        'North Carolina',
        'Michigan'
      ];

      return {
        id,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: `${faker.internet.email()}`,
        phone: `001-${Math.floor(Math.random() * 900) + 100}-${
          Math.floor(Math.random() * 900) + 100
        }-${Math.floor(Math.random() * 10000)}`,
        street: `${Math.floor(
          Math.random() * 1000
        )} ${faker.location.street()}`,
        city: faker.helpers.arrayElement(cities),
        state: faker.helpers.arrayElement(states),
        country: 'USA',
        zipcode: faker.location.zipCode(),
        longitude: faker.location.longitude(),
        latitude: faker.location.latitude(),
        gender: faker.helpers.arrayElement(genders) as Gender,
        date_of_birth: faker.date
          .between({ from: '1980-01-01', to: '2000-01-01' })
          .toISOString()
          .split('T')[0],
        job: faker.helpers.arrayElement(jobs),
        profile_picture: `https://api.slingacademy.com/public/sample-users/${id}.png`
      };
    }

    for (let i = 1; i <= 20; i++) {
      sampleUsers.push(generateRandomUserData(i));
    }

    this.records = sampleUsers;
  },

  async getAll({
    genders = [],
    search
  }: {
    genders?: string[];
    search?: string;
  }) {
    let users = [...this.records];
    if (genders.length > 0) {
      users = users.filter((user) => genders.includes(user.gender));
    }
    if (search) {
      users = matchSorter(users, search, {
        keys: [
          'first_name',
          'last_name',
          'email',
          'job',
          'city',
          'street',
          'state',
          'country'
        ]
      });
    }
    return users;
  },

  async getUsers({
    page = 1,
    limit = 10,
    genders,
    search
  }: {
    page?: number;
    limit?: number;
    genders?: string;
    search?: string;
  }) {
    const gendersArray = genders ? genders.split('.') : [];
    const allUsers = await this.getAll({ genders: gendersArray, search });
    const totalUsers = allUsers.length;
    const offset = (page - 1) * limit;
    const paginatedUsers = allUsers.slice(offset, offset + limit);
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_users: totalUsers,
      offset,
      limit,
      users: paginatedUsers
    };
  }
};

fakeUsers.initialize();

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
  discount_price: number;
  warranty_info: Array<{ content: string }>;
};

export const fakeProducts = {
  records: [] as Product[],

  initialize() {
    const sampleProducts: Product[] = [];
    function generateRandomProductData(id: number): Product {
      const categories = [
        'Electronics',
        'Furniture',
        'Clothing',
        'Toys',
        'Groceries',
        'Books',
        'Jewelry',
        'Beauty Products'
      ];

      return {
        id,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        created_at: faker.date
          .between({ from: '2022-01-01', to: '2023-12-31' })
          .toISOString(),
        price: parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 })),
        discount_price: parseFloat(
          faker.commerce.price({ min: 5, max: 500, dec: 2 })
        ),
        photo_url: `https://api.slingacademy.com/public/sample-products/${id}.png`,
        category: faker.helpers.arrayElement(categories),
        updated_at: faker.date.recent().toISOString(),
        warranty_info: [
          { content: '12 months for manufacturing defects' },
          { content: '6 months for display issues' },
          {
            content:
              'Physical damage, water damage, unauthorized repairs are not covered'
          },
          { content: 'Repair time is 1-3 hours' },
          {
            content:
              'Special offer: 50% off screen replacement if broken within the first year'
          },
          { content: 'Warranty period is 12 months' },
          { content: 'Repair duration is 30-60 minutes' }
        ]
      };
    }

    for (let i = 1; i <= 20; i++) {
      sampleProducts.push(generateRandomProductData(i));
    }

    this.records = sampleProducts;
  },

  async getAll({
    categories = [],
    search
  }: {
    categories?: string[];
    search?: string;
  }) {
    let products = [...this.records];
    if (categories.length > 0) {
      products = products.filter((product) =>
        categories.includes(product.category)
      );
    }
    if (search) {
      products = matchSorter(products, search, {
        keys: ['name', 'description', 'category']
      });
    }
    return products;
  },

  async getProducts({
    page = 1,
    limit = 10,
    categories,
    search
  }: {
    page?: number;
    limit?: number;
    categories?: string;
    search?: string;
  }) {
    await delay(1000);
    const categoriesArray = categories ? categories.split('.') : [];
    const allProducts = await this.getAll({
      categories: categoriesArray,
      search
    });
    const totalProducts = allProducts.length;
    const offset = (page - 1) * limit;
    const paginatedProducts = allProducts.slice(offset, offset + limit);
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_products: totalProducts,
      offset,
      limit,
      products: paginatedProducts
    };
  },

  async getProductById(id: number) {
    await delay(1000);
    const product = this.records.find((product) => product.id === id);

    if (!product) {
      return {
        success: false,
        message: `Product with ID ${id} not found`
      };
    }

    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Product with ID ${id} found`,
      product
    };
  }
};

fakeProducts.initialize();

export type Category = {
  id: number;
  name: string;
  products?: Product[];
  subcategories?: Category[];
};

export const fakeCategories = {
  records: [] as Category[],

  initialize() {
    this.records = [
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
                products: fakeProducts.records.slice(0, 2) // Example products
              },
              {
                id: 5,
                name: 'iPhone',
                products: fakeProducts.records.slice(2, 4)
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
                products: fakeProducts.records.slice(4, 6)
              },
              {
                id: 8,
                name: 'Xiaomi',
                products: fakeProducts.records.slice(6, 8)
              }
            ]
          }
        ]
      }
    ];
  },

  async getCategoryById(id: number) {
    await delay(1000);
    const category = this.records.find((category) => category.id === id);

    if (!category) {
      return {
        success: false,
        message: `Category with ID ${id} not found`
      };
    }

    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Category with ID ${id} found`,
      category
    };
  },

  async getAll({ search }: { search?: string }) {
    let categories = [...this.records];
    if (search) {
      categories = matchSorter(categories, search, { keys: ['name'] });
    }
    return categories;
  },

  async getCategories({
    page = 1,
    limit = 5,
    search
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    await delay(1000);
    const allCategories = await this.getAll({ search });
    const totalCategories = allCategories.length;
    const offset = (page - 1) * limit;
    const paginatedCategories = allCategories.slice(offset, offset + limit);
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_categories: totalCategories,
      offset,
      limit,
      categories: paginatedCategories
    };
  }
};

fakeCategories.initialize();
