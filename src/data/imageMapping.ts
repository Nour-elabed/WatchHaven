// IMAGE MAPPING GUIDE - Update this file with your actual watch photo names
export const WATCH_IMAGES = {
  // MEN'S WATCHES - Replace with your actual photo names
  men: [
    "men-watch1.jpg",  // Replace with your photo name
    "men-watch2.jpg",  // Replace with your photo name
    "men-watch3.jpg",  // Replace with your photo name
    "men-watch4.jpg",  // Replace with your photo name
    "men-watch5.jpg",  // Replace with your photo name
    "men-watch6.jpg",  // Replace with your photo name
    "men-watch7.jpg",  // Replace with your photo name
    "men-watch8.jpg",  // Replace with your photo name
  ],
  
  // WOMEN'S WATCHES - Replace with your actual photo names
  women: [
    "women-watch1.jpg",  // Replace with your photo name
    "women-watch2.jpg",  // Replace with your photo name
    "women-watch3.jpg",  // Replace with your photo name
    "women-watch4.jpg",  // Replace with your photo name
    "women-watch5.jpg",  // Replace with your photo name
    "women-watch6.jpg",  // Replace with your photo name
    "women-watch7.jpg",  // Replace with your photo name
    "women-watch8.jpg",  // Replace with your photo name
  ],
  
  // UNISEX WATCHES - Replace with your actual photo names
  unisex: [
    "unisex-watch1.jpg",  // Replace with your photo name
    "unisex-watch2.jpg",  // Replace with your photo name
    "unisex-watch3.jpg",  // Replace with your photo name
    "unisex-watch4.jpg",  // Replace with your photo name
    "unisex-watch5.jpg",  // Replace with your photo name
    "unisex-watch6.jpg",  // Replace with your photo name
    "unisex-watch7.jpg",  // Replace with your photo name
    "unisex-watch8.jpg",  // Replace with your photo name
  ]
}

// Helper function to get image path
export const getWatchImagePath = (gender: string, index: number) => {
  const images = WATCH_IMAGES[gender.toLowerCase() as keyof typeof WATCH_IMAGES]
  if (images && images[index]) {
    return `/assets/watches/${gender.toLowerCase()}/${images[index]}`
  }
  // Fallback to Unsplash image if local image not found
  return `https://images.unsplash.com/photo-1523170335258-f5ed11644a13?auto=format&fit=crop&q=80&w=900`
}
