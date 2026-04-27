import type { Product } from "@/types"

export const localProducts: Product[] = [
  // MEN'S PRODUCTS - Replace with your actual watch photos
  {
    _id: "1",
    name: "Classic Men's Chronograph",
    brand: "Rolex",
    description: "Elegant men's chronograph with stainless steel case and leather strap. Perfect for business and casual wear.",
    price: 1299.99,
    category: "Luxury",
    gender: "MEN",
    image: "/assets/watches/men/men-watch1.jpg", // Replace with your photo
    stock: 15,
    rating: 4.8,
    numReviews: 124,
  },
  {
    _id: "2",
    name: "Sport Men's Diver Watch",
    brand: "Omega",
    description: "Professional men's dive watch with 200m water resistance and luminous hands. Built for adventure.",
    price: 899.99,
    category: "Sport",
    gender: "MEN",
    image: "/assets/watches/men/men-watch2.jpg", // Replace with your photo
    stock: 22,
    rating: 4.6,
    numReviews: 89,
  },
  {
    _id: "3",
    name: "Men's Classic Timepiece",
    brand: "Tag Heuer",
    description: "Timeless men's watch with Roman numerals and premium leather strap. Versatile elegance.",
    price: 699.99,
    category: "Classic",
    gender: "MEN",
    image: "/assets/watches/men/men-watch3.jpg", // Replace with your photo
    stock: 18,
    rating: 4.7,
    numReviews: 156,
  },
  {
    _id: "4",
    name: "Men's Smart Watch Pro",
    brand: "Seiko",
    description: "Advanced smartwatch with health tracking, GPS, and 7-day battery life. Compatible with iOS and Android.",
    price: 449.99,
    category: "Smart",
    gender: "MEN",
    image: "/assets/watches/men/men-watch4.jpg", // Replace with your photo
    stock: 31,
    rating: 4.5,
    numReviews: 203,
  },
  {
    _id: "5",
    name: "Minimalist Men's Watch",
    brand: "Casio",
    description: "Clean and minimalist design with Japanese movement and mesh strap. Modern sophistication.",
    price: 299.99,
    category: "Minimalist",
    gender: "MEN",
    image: "/assets/watches/men/men-watch5.jpg", // Replace with your photo
    stock: 45,
    rating: 4.4,
    numReviews: 178,
  },
  {
    _id: "6",
    name: "Luxury Men's Automatic",
    brand: "Tudor",
    description: "Premium automatic watch with exhibition case back and Swiss movement. Timeless design.",
    price: 1599.99,
    category: "Luxury",
    gender: "MEN",
    image: "/assets/watches/men/men-watch6.jpg", // Replace with your photo
    stock: 8,
    rating: 4.9,
    numReviews: 67,
  },
  {
    _id: "7",
    name: "Sport Men's Chronograph",
    brand: "Longines",
    description: "Multi-function chronograph with stopwatch, tachymeter, and sporty design. Perfect for timing activities.",
    price: 1199.99,
    category: "Sport",
    gender: "MEN",
    image: "/assets/watches/men/men-watch7.jpg", // Replace with your photo
    stock: 12,
    rating: 4.7,
    numReviews: 94,
  },
  {
    _id: "8",
    name: "Men's Vintage Mechanical",
    brand: "Breitling",
    description: "Vintage-inspired mechanical watch with automatic movement and sapphire crystal. Classic styling.",
    price: 1899.99,
    category: "Classic",
    gender: "MEN",
    image: "/assets/watches/men/men-watch8.jpg", // Replace with your photo
    stock: 5,
    rating: 4.8,
    numReviews: 45,
  },

  // WOMEN'S PRODUCTS - Replace with your actual watch photos
  {
    _id: "9",
    name: "Elegant Women's Rose Gold",
    brand: "Cartier",
    description: "Delicate women's watch with mother-of-pearl dial and rose gold case. Perfect for special occasions.",
    price: 1399.99,
    category: "Luxury",
    gender: "WOMEN",
    image: "/assets/watches/women/women-watch1.jpg", // Replace with your photo
    stock: 18,
    rating: 4.9,
    numReviews: 203,
  },
  {
    _id: "10",
    name: "Sport Women's Fitness Watch",
    brand: "Rolex",
    description: "Active women's sports watch with stopwatch function and comfortable rubber strap. Built for performance.",
    price: 999.99,
    category: "Sport",
    gender: "WOMEN",
    image: "/assets/watches/women/women-watch2.jpg", // Replace with your photo
    stock: 25,
    rating: 4.6,
    numReviews: 142,
  },
  {
    _id: "11",
    name: "Classic Women's Timepiece",
    brand: "Omega",
    description: "Timeless women's watch with Roman numerals and expandable bracelet. Versatile elegance.",
    price: 799.99,
    category: "Classic",
    gender: "WOMEN",
    image: "/assets/watches/women/women-watch3.jpg", // Replace with your photo
    stock: 20,
    rating: 4.7,
    numReviews: 167,
  },
  {
    _id: "12",
    name: "Women's Smart Watch Elegant",
    brand: "Tag Heuer",
    description: "Elegant smartwatch with health tracking, sleep monitoring, and 5-day battery life. Stylish and functional.",
    price: 549.99,
    category: "Smart",
    gender: "WOMEN",
    image: "/assets/watches/women/women-watch4.jpg", // Replace with your photo
    stock: 28,
    rating: 4.5,
    numReviews: 189,
  },
  {
    _id: "13",
    name: "Minimalist Women's Watch",
    brand: "Seiko",
    description: "Clean and minimalist design with mesh band and rose gold finish. Contemporary style meets functionality.",
    price: 349.99,
    category: "Minimalist",
    gender: "WOMEN",
    image: "/assets/watches/women/women-watch5.jpg", // Replace with your photo
    stock: 35,
    rating: 4.4,
    numReviews: 234,
  },
  {
    _id: "14",
    name: "Fashion Women's Crystal Watch",
    brand: "Casio",
    description: "Trendy women's watch with crystal-studded bezel and pink dial. Water resistant and stylish.",
    price: 449.99,
    category: "Luxury",
    gender: "WOMEN",
    image: "/assets/watches/women/women-watch6.jpg", // Replace with your photo
    stock: 15,
    rating: 4.6,
    numReviews: 123,
  },
  {
    _id: "15",
    name: "Sport Women's Diver Watch",
    brand: "Tudor",
    description: "Professional women's dive watch with 200m water resistance and luminous hands. Built for adventure.",
    price: 749.99,
    category: "Sport",
    gender: "WOMEN",
    image: "/assets/watches/women/women-watch7.jpg", // Replace with your photo
    stock: 22,
    rating: 4.7,
    numReviews: 98,
  },
  {
    _id: "16",
    name: "Women's Pearl Dial Watch",
    brand: "Longines",
    description: "Luxurious watch with genuine pearl dial and stainless steel bracelet. Sophisticated and beautiful.",
    price: 1099.99,
    category: "Classic",
    gender: "WOMEN",
    image: "/assets/watches/women/women-watch8.jpg", // Replace with your photo
    stock: 10,
    rating: 4.8,
    numReviews: 76,
  },

  // UNISEX PRODUCTS - Replace with your actual watch photos
  {
    _id: "17",
    name: "Unisex Luxury Watch",
    brand: "Hamilton",
    description: "Premium luxury timepiece suitable for any gender. Built with durable materials and precision movement.",
    price: 999.99,
    category: "Luxury",
    gender: "UNISEX",
    image: "/assets/watches/unisex/unisex-watch1.jpg", // Replace with your photo
    stock: 30,
    rating: 4.5,
    numReviews: 145,
  },
  {
    _id: "18",
    name: "Unisex Sport Chronograph",
    brand: "Breitling",
    description: "Multi-function chronograph with stopwatch and tachymeter. Perfect for active lifestyles.",
    price: 1299.99,
    category: "Sport",
    gender: "UNISEX",
    image: "/assets/watches/unisex/unisex-watch2.jpg", // Replace with your photo
    stock: 18,
    rating: 4.7,
    numReviews: 176,
  },
  {
    _id: "19",
    name: "Unisex Classic Timepiece",
    brand: "Cartier",
    description: "Timeless design with modern reliability. Automatic movement and classic styling.",
    price: 1599.99,
    category: "Classic",
    gender: "UNISEX",
    image: "/assets/watches/unisex/unisex-watch3.jpg", // Replace with your photo
    stock: 12,
    rating: 4.8,
    numReviews: 89,
  },
  {
    _id: "20",
    name: "Unisex Smart Watch",
    brand: "Rolex",
    description: "Versatile smartwatch with fitness tracking and notifications. Perfect for modern lifestyles.",
    price: 899.99,
    category: "Smart",
    gender: "UNISEX",
    image: "/assets/watches/unisex/unisex-watch4.jpg", // Replace with your photo
    stock: 25,
    rating: 4.4,
    numReviews: 267,
  },
  {
    _id: "21",
    name: "Unisex Minimalist Watch",
    brand: "Omega",
    description: "Clean, minimalist design suitable for any gender. Japanese movement and comfortable leather strap.",
    price: 599.99,
    category: "Minimalist",
    gender: "UNISEX",
    image: "/assets/watches/unisex/unisex-watch5.jpg", // Replace with your photo
    stock: 40,
    rating: 4.3,
    numReviews: 134,
  },
  {
    _id: "22",
    name: "Unisex Vintage Watch",
    brand: "Tag Heuer",
    description: "Vintage-inspired design with modern reliability. Classic styling meets contemporary functionality.",
    price: 1199.99,
    category: "Classic",
    gender: "UNISEX",
    image: "/assets/watches/unisex/unisex-watch6.jpg", // Replace with your photo
    stock: 16,
    rating: 4.6,
    numReviews: 198,
  },
  {
    _id: "23",
    name: "Unisex Sport Watch",
    brand: "Seiko",
    description: "Durable sport watch with chronograph function and water resistance. Built for performance.",
    price: 699.99,
    category: "Sport",
    gender: "UNISEX",
    image: "/assets/watches/unisex/unisex-watch7.jpg", // Replace with your photo
    stock: 28,
    rating: 4.7,
    numReviews: 156,
  },
  {
    _id: "24",
    name: "Unisex Casual Watch",
    brand: "Casio",
    description: "Everyday watch with simple dial and comfortable strap. Perfect for daily wear.",
    price: 399.99,
    category: "Minimalist",
    gender: "UNISEX",
    image: "/assets/watches/unisex/unisex-watch8.jpg", // Replace with your photo
    stock: 35,
    rating: 4.5,
    numReviews: 223,
  }
]

// Helper functions for filtering and sorting
export const getLocalProducts = (filters?: {
  minPrice?: number
  maxPrice?: number
  sort?: string
  category?: string
  gender?: string
  search?: string
}) => {
  let filtered = [...localProducts]

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

export const getLocalProductById = (id: string) => {
  const product = localProducts.find(p => p._id === id)
  if (!product) {
    throw new Error("Product not found")
  }
  return {
    success: true,
    data: product,
    message: "Product fetched successfully"
  }
}
