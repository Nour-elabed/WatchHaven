import type { Product } from "@/types"

export const localProducts: Product[] = [
  // MEN'S PRODUCTS - Using actual image files from women's folder (since men's folder is empty)
  {
    _id: "1",
    name: "Classic Men's Chronograph",
    brand: "Rolex",
    description: "Elegant men's chronograph with stainless steel case and leather strap. Perfect for business and casual wear.",
    price: 1299.99,
    category: "Luxury",
    gender: "MEN",
    image: "/assets/watches/women/0995062ae308ad6a0a8d16cd5e60be41.jpg",
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
    image: "/assets/watches/women/190ac9969e58d866bb76a67a7de63831.jpg",
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
    image: "/assets/watches/women/1a0c8d86e2d71a32f69ab43cf9560215.jpg",
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
    image: "/assets/watches/women/1c49b82796b4ac83adb568bc273a8b74.jpg",
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
    image: "/assets/watches/women/4d25fa27625ff4eb7a9f87670818f6a2.jpg",
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
    image: "/assets/watches/women/693a569cf0375b1ee53536faf7cd7b6c.jpg",
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
    image: "/assets/watches/women/6f26c45e0f88f044877b1fdd39647ffc.jpg",
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
    image: "/assets/watches/women/76ac800ae3340e4f18bbd6d1e80187ff.jpg",
    stock: 5,
    rating: 4.8,
    numReviews: 45,
  },

  // WOMEN'S PRODUCTS - Using actual image files
  {
    _id: "9",
    name: "Elegant Women's Rose Gold",
    brand: "Cartier",
    description: "Delicate women's watch with mother-of-pearl dial and rose gold case. Perfect for special occasions.",
    price: 1399.99,
    category: "Luxury",
    gender: "WOMEN",
    image: "/assets/watches/women/a8bed5c073ca767aead0fbb3a057838a.jpg",
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
    image: "/assets/watches/women/b54fc63d4ee979dceff3e19795a62079.jpg",
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
    image: "/assets/watches/women/d55ec4a42064147784ea92c788d39b66.jpg",
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
    image: "/assets/watches/women/d894f4b5863c0c27ca5de987a41742d.jpg",
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
    image: "/assets/watches/women/dc5c5f70154b4803ac5fcdd6c133601b.jpg",
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
    image: "/assets/watches/women/ef591d42a5a3bcc6fd1d400dea3399c8.jpg",
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
    image: "/assets/watches/women/f5d4665e751165879505719ae54c98cd.jpg",
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
    image: "/assets/watches/women/fd0891993142cb179a8ced76f39c8206.jpg",
    stock: 10,
    rating: 4.8,
    numReviews: 76,
  },

  // UNISEX PRODUCTS - Using actual image files
  {
    _id: "17",
    name: "Unisex Luxury Watch",
    brand: "Hamilton",
    description: "Premium luxury timepiece suitable for any gender. Built with durable materials and precision movement.",
    price: 999.99,
    category: "Luxury",
    gender: "UNISEX",
    image: "/assets/watches/unisex/12ad0bb13579970e7ef004581f1258a0.jpg",
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
    image: "/assets/watches/unisex/538c59a7a6e0262fa60962ef63cd3fd2.jpg",
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
    image: "/assets/watches/unisex/76ac800ae3340e4f18bbd6d1e80187ff.jpg",
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
    image: "/assets/watches/unisex/c49fbbb0b5d744f48b7d90f7d2633226.jpg",
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
    image: "/assets/watches/unisex/c653ebee41d9413909e3225d39cdb635.jpg",
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
    image: "/assets/watches/unisex/da29169512f89118cf539ddbd5331b29.jpg",
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
    image: "/assets/watches/women/1a0c8d86e2d71a32f69ab43cf9560215.jpg",
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
    image: "/assets/watches/women/1c49b82796b4ac83adb568bc273a8b74.jpg",
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

  // RANDOM SELECTION FOR CATEGORY FILTERING
  // When categories are selected, show random combination of products
  if (filters?.category && filtered.length > 0) {
    // Create a truly random seed based on current time (changes every millisecond)
    const randomSeed = Date.now() + Math.random() * 1000
    const random = new Random(randomSeed)
    
    // Shuffle the filtered products using the random seed
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(random.next() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]]
    }
    
    // If there are many products, randomly select a subset to show variety
    if (filtered.length > 12) {
      filtered = filtered.slice(0, 12) // Show max 12 random products
    }
  }

  // Sort (but don't override random shuffling for category filters)
  if (filters?.category) {
    // Keep random order for category filters
  } else if (filters?.sort === 'price-asc') {
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

// Simple seeded random number generator
class Random {
  private seed: number
  
  constructor(seed: number) {
    this.seed = seed
  }
  
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280
    return this.seed / 233280
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
