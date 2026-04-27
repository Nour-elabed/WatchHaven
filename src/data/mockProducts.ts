import type { Product } from "@/types"

export const mockProducts: Product[] = [
  // MEN'S PRODUCTS
  {
    _id: "1",
    name: "Rolex Luxury Series 1",
    brand: "Rolex",
    description: "A premium luxury timepiece designed for men customers. Built with durable materials, precision movement, and modern styling.",
    price: 1299.99,
    category: "Luxury",
    gender: "MEN",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11644a13?auto=format&fit=crop&q=80&w=900",
    stock: 15,
    rating: 4.8,
    numReviews: 124,
  },
  {
    _id: "2",
    name: "Omega Sport Series 2",
    brand: "Omega",
    description: "A premium sport timepiece designed for men customers. Built with durable materials, precision movement, and modern styling.",
    price: 899.99,
    category: "Sport",
    gender: "MEN",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=900",
    stock: 22,
    rating: 4.6,
    numReviews: 89,
  },
  {
    _id: "3",
    name: "Tag Heuer Classic Series 3",
    brand: "Tag Heuer",
    description: "A premium classic timepiece designed for men customers. Built with durable materials, precision movement, and modern styling.",
    price: 699.99,
    category: "Classic",
    gender: "MEN",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=900",
    stock: 18,
    rating: 4.7,
    numReviews: 156,
  },
  {
    _id: "4",
    name: "Seiko Smart Series 4",
    brand: "Seiko",
    description: "A premium smart timepiece designed for men customers. Built with durable materials, precision movement, and modern styling.",
    price: 449.99,
    category: "Smart",
    gender: "MEN",
    image: "https://images.unsplash.com/photo-1548178397-51c5e071d4d7?auto=format&fit=crop&q=80&w=900",
    stock: 31,
    rating: 4.5,
    numReviews: 203,
  },
  {
    _id: "5",
    name: "Casio Minimalist Series 5",
    brand: "Casio",
    description: "A premium minimalist timepiece designed for men customers. Built with durable materials, precision movement, and modern styling.",
    price: 299.99,
    category: "Minimalist",
    gender: "MEN",
    image: "https://images.unsplash.com/photo-1508685096489-7aac29a8a244?auto=format&fit=crop&q=80&w=900",
    stock: 45,
    rating: 4.4,
    numReviews: 178,
  },
  {
    _id: "6",
    name: "Tudor Luxury Series 6",
    brand: "Tudor",
    description: "A premium luxury timepiece designed for men customers. Built with durable materials, precision movement, and modern styling.",
    price: 1599.99,
    category: "Luxury",
    gender: "MEN",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=80&w=900",
    stock: 8,
    rating: 4.9,
    numReviews: 67,
  },
  {
    _id: "7",
    name: "Longines Sport Series 7",
    brand: "Longines",
    description: "A premium sport timepiece designed for men customers. Built with durable materials, precision movement, and modern styling.",
    price: 1199.99,
    category: "Sport",
    gender: "MEN",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=900",
    stock: 12,
    rating: 4.7,
    numReviews: 94,
  },
  {
    _id: "8",
    name: "Breitling Classic Series 8",
    brand: "Breitling",
    description: "A premium classic timepiece designed for men customers. Built with durable materials, precision movement, and modern styling.",
    price: 1899.99,
    category: "Classic",
    gender: "MEN",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11644a13?auto=format&fit=crop&q=80&w=900",
    stock: 5,
    rating: 4.8,
    numReviews: 45,
  },

  // WOMEN'S PRODUCTS
  {
    _id: "9",
    name: "Cartier Luxury Series 9",
    brand: "Cartier",
    description: "A premium luxury timepiece designed for women customers. Built with durable materials, precision movement, and modern styling.",
    price: 1399.99,
    category: "Luxury",
    gender: "WOMEN",
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50bd?auto=format&fit=crop&q=80&w=900",
    stock: 18,
    rating: 4.9,
    numReviews: 203,
  },
  {
    _id: "10",
    name: "Rolex Sport Series 10",
    brand: "Rolex",
    description: "A premium sport timepiece designed for women customers. Built with durable materials, precision movement, and modern styling.",
    price: 999.99,
    category: "Sport",
    gender: "WOMEN",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=900",
    stock: 25,
    rating: 4.6,
    numReviews: 142,
  },
  {
    _id: "11",
    name: "Omega Classic Series 11",
    brand: "Omega",
    description: "A premium classic timepiece designed for women customers. Built with durable materials, precision movement, and modern styling.",
    price: 799.99,
    category: "Classic",
    gender: "WOMEN",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=900",
    stock: 20,
    rating: 4.7,
    numReviews: 167,
  },
  {
    _id: "12",
    name: "Tag Heuer Smart Series 12",
    brand: "Tag Heuer",
    description: "A premium smart timepiece designed for women customers. Built with durable materials, precision movement, and modern styling.",
    price: 549.99,
    category: "Smart",
    gender: "WOMEN",
    image: "https://images.unsplash.com/photo-1548178397-51c5e071d4d7?auto=format&fit=crop&q=80&w=900",
    stock: 28,
    rating: 4.5,
    numReviews: 189,
  },
  {
    _id: "13",
    name: "Seiko Minimalist Series 13",
    brand: "Seiko",
    description: "A premium minimalist timepiece designed for women customers. Built with durable materials, precision movement, and modern styling.",
    price: 349.99,
    category: "Minimalist",
    gender: "WOMEN",
    image: "https://images.unsplash.com/photo-1508685096489-7aac29a8a244?auto=format&fit=crop&q=80&w=900",
    stock: 35,
    rating: 4.4,
    numReviews: 234,
  },
  {
    _id: "14",
    name: "Casio Luxury Series 14",
    brand: "Casio",
    description: "A premium luxury timepiece designed for women customers. Built with durable materials, precision movement, and modern styling.",
    price: 449.99,
    category: "Luxury",
    gender: "WOMEN",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=80&w=900",
    stock: 15,
    rating: 4.6,
    numReviews: 123,
  },
  {
    _id: "15",
    name: "Tudor Sport Series 15",
    brand: "Tudor",
    description: "A premium sport timepiece designed for women customers. Built with durable materials, precision movement, and modern styling.",
    price: 749.99,
    category: "Sport",
    gender: "WOMEN",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=900",
    stock: 22,
    rating: 4.7,
    numReviews: 98,
  },
  {
    _id: "16",
    name: "Longines Classic Series 16",
    brand: "Longines",
    description: "A premium classic timepiece designed for women customers. Built with durable materials, precision movement, and modern styling.",
    price: 1099.99,
    category: "Classic",
    gender: "WOMEN",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11644a13?auto=format&fit=crop&q=80&w=900",
    stock: 10,
    rating: 4.8,
    numReviews: 76,
  },

  // UNISEX PRODUCTS
  {
    _id: "17",
    name: "Hamilton Luxury Series 17",
    brand: "Hamilton",
    description: "A premium luxury timepiece designed for unisex customers. Built with durable materials, precision movement, and modern styling.",
    price: 999.99,
    category: "Luxury",
    gender: "UNISEX",
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50bd?auto=format&fit=crop&q=80&w=900",
    stock: 30,
    rating: 4.5,
    numReviews: 145,
  },
  {
    _id: "18",
    name: "Breitling Sport Series 18",
    brand: "Breitling",
    description: "A premium sport timepiece designed for unisex customers. Built with durable materials, precision movement, and modern styling.",
    price: 1299.99,
    category: "Sport",
    gender: "UNISEX",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=900",
    stock: 18,
    rating: 4.7,
    numReviews: 176,
  },
  {
    _id: "19",
    name: "Cartier Classic Series 19",
    brand: "Cartier",
    description: "A premium classic timepiece designed for unisex customers. Built with durable materials, precision movement, and modern styling.",
    price: 1599.99,
    category: "Classic",
    gender: "UNISEX",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=900",
    stock: 12,
    rating: 4.8,
    numReviews: 89,
  },
  {
    _id: "20",
    name: "Rolex Smart Series 20",
    brand: "Rolex",
    description: "A premium smart timepiece designed for unisex customers. Built with durable materials, precision movement, and modern styling.",
    price: 899.99,
    category: "Smart",
    gender: "UNISEX",
    image: "https://images.unsplash.com/photo-1548178397-51c5e071d4d7?auto=format&fit=crop&q=80&w=900",
    stock: 25,
    rating: 4.4,
    numReviews: 267,
  },
  {
    _id: "21",
    name: "Omega Minimalist Series 21",
    brand: "Omega",
    description: "A premium minimalist timepiece designed for unisex customers. Built with durable materials, precision movement, and modern styling.",
    price: 599.99,
    category: "Minimalist",
    gender: "UNISEX",
    image: "https://images.unsplash.com/photo-1508685096489-7aac29a8a244?auto=format&fit=crop&q=80&w=900",
    stock: 40,
    rating: 4.3,
    numReviews: 134,
  },
  {
    _id: "22",
    name: "Tag Heuer Luxury Series 22",
    brand: "Tag Heuer",
    description: "A premium luxury timepiece designed for unisex customers. Built with durable materials, precision movement, and modern styling.",
    price: 1199.99,
    category: "Luxury",
    gender: "UNISEX",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=80&w=900",
    stock: 16,
    rating: 4.6,
    numReviews: 198,
  },
  {
    _id: "23",
    name: "Seiko Sport Series 23",
    brand: "Seiko",
    description: "A premium sport timepiece designed for unisex customers. Built with durable materials, precision movement, and modern styling.",
    price: 699.99,
    category: "Sport",
    gender: "UNISEX",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=900",
    stock: 28,
    rating: 4.7,
    numReviews: 156,
  },
  {
    _id: "24",
    name: "Casio Classic Series 24",
    brand: "Casio",
    description: "A premium classic timepiece designed for unisex customers. Built with durable materials, precision movement, and modern styling.",
    price: 399.99,
    category: "Classic",
    gender: "UNISEX",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11644a13?auto=format&fit=crop&q=80&w=900",
    stock: 35,
    rating: 4.5,
    numReviews: 223,
  }
]

export const getMockProducts = (filters?: {
  minPrice?: number
  maxPrice?: number
  sort?: string
  category?: string
  gender?: string
  search?: string
}) => {
  let filtered = [...mockProducts]

  // Price filter
  if (filters?.minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.minPrice!)
  }
  if (filters?.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= filters.maxPrice!)
  }

  // Category filter
  if (filters?.category) {
    const categories = filters.category.split(',')
    filtered = filtered.filter(p => categories.includes(p.category))
  }

  // Gender filter
  if (filters?.gender && filters.gender !== 'ALL') {
    filtered = filtered.filter(p => p.gender === filters.gender)
  }

  // Search filter
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.brand.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    )
  }

  // Sort
  if (filters?.sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price)
  } else if (filters?.sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price)
  } else {
    filtered.sort((a, b) => parseInt(a._id) - parseInt(b._id))
  }

  return {
    success: true,
    data: filtered,
    message: "Products fetched successfully"
  }
}

export const getMockProductById = (id: string) => {
  const product = mockProducts.find(p => p._id === id)
  if (!product) {
    throw new Error("Product not found")
  }
  return {
    success: true,
    data: product,
    message: "Product fetched successfully"
  }
}
