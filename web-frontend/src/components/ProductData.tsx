// Centralized product and review data for Piko & Pearl

export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  image: string;
  description: string;
  reviews: Review[];
}

// Helper function to calculate average rating
export const calculateAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

// Helper function to get review count
export const getReviewCount = (reviews: Review[]): number => {
  return reviews.length;
};

// Product reviews data
const productReviews: { [key: string]: Review[] } = {
  // Flowers
  "flowers-1": [
    { id: 1, author: "Ayesha Khan", rating: 5, date: "2 weeks ago", comment: "Absolutely love this! The quality is amazing and the colors are even more beautiful in person. Highly recommend!" },
    { id: 2, author: "Fatima Ali", rating: 5, date: "1 month ago", comment: "Beautiful handmade item. The craftsmanship is outstanding. Worth every rupee!" },
    { id: 3, author: "Sara Ahmed", rating: 5, date: "1 month ago", comment: "Very nice product! Delivery was quick and packaging was excellent." },
    { id: 4, author: "Zainab Hassan", rating: 5, date: "2 months ago", comment: "This is my third purchase from Piko and Pearl. Never disappointed! The attention to detail is incredible." },
    { id: 5, author: "Mariam Siddiqui", rating: 5, date: "2 months ago", comment: "Perfect gift! My friend loved it. Such unique and beautiful work. Will order again!" }
  ],
  "flowers-2": [
    { id: 1, author: "Hira Malik", rating: 5, date: "1 week ago", comment: "The sunflower centerpiece is stunning! Brightens up my living room perfectly." },
    { id: 2, author: "Noor Ahmed", rating: 5, date: "3 weeks ago", comment: "Beautiful craftsmanship and the colors are so vibrant!" },
    { id: 3, author: "Aisha Tariq", rating: 4, date: "1 month ago", comment: "Really nice product. Slightly smaller than expected but still lovely." },
    { id: 4, author: "Sana Qureshi", rating: 5, date: "2 months ago", comment: "Absolutely perfect! Worth every penny." }
  ],
  "flowers-3": [
    { id: 1, author: "Laiba Khan", rating: 5, date: "5 days ago", comment: "The daisy garland is so delicate and beautiful!" },
    { id: 2, author: "Maryam Ali", rating: 4, date: "2 weeks ago", comment: "Very pretty, looks great in my bedroom." },
    { id: 3, author: "Zara Hassan", rating: 5, date: "1 month ago", comment: "Perfect for my daughter's room. She loves it!" }
  ],
  "flowers-4": [
    { id: 1, author: "Khadija Mahmood", rating: 5, date: "1 week ago", comment: "The peonies are absolutely gorgeous! The quality exceeded my expectations." },
    { id: 2, author: "Rabia Siddiqui", rating: 5, date: "3 weeks ago", comment: "Stunning! The colors are so soft and elegant." }
  ],
  "flowers-5": [
    { id: 1, author: "Amna Rashid", rating: 5, date: "4 days ago", comment: "Beautiful wildflower arrangement! Each flower is unique and detailed." },
    { id: 2, author: "Saima Akhtar", rating: 5, date: "2 weeks ago", comment: "Love this bouquet! It's so colorful and cheerful." },
    { id: 3, author: "Hina Farooq", rating: 4, date: "1 month ago", comment: "Very nice variety of flowers. Great value!" }
  ],
  "flowers-6": [
    { id: 1, author: "Nimra Aziz", rating: 5, date: "1 week ago", comment: "The cherry blossoms are so delicate and pretty!" },
    { id: 2, author: "Sadia Malik", rating: 5, date: "2 weeks ago", comment: "Absolutely beautiful! Perfect for spring decor." },
    { id: 3, author: "Farah Noor", rating: 5, date: "1 month ago", comment: "Love it! The pink color is so soft and lovely." }
  ],
  "flowers-7": [
    { id: 1, author: "Aleeza Khan", rating: 5, date: "3 days ago", comment: "Perfect little roses! Great for my desk." },
    { id: 2, author: "Mahnoor Ali", rating: 4, date: "1 week ago", comment: "Cute and well-made. Nice addition to my room." },
    { id: 3, author: "Iqra Hassan", rating: 5, date: "2 weeks ago", comment: "Love these mini roses! So adorable." },
    { id: 4, author: "Sumbal Tariq", rating: 5, date: "1 month ago", comment: "Great quality and perfect size!" }
  ],
  "flowers-8": [
    { id: 1, author: "Arooj Fatima", rating: 5, date: "5 days ago", comment: "Beautiful tulips! The colors are vibrant and lovely." },
    { id: 2, author: "Mehwish Khan", rating: 5, date: "2 weeks ago", comment: "Perfect for spring! The quality is excellent." },
    { id: 3, author: "Hafsa Ahmed", rating: 4, date: "3 weeks ago", comment: "Nice tulip set. Very pretty colors." }
  ],

  // Bags
  "bags-1": [
    { id: 1, author: "Samina Yousaf", rating: 5, date: "1 week ago", comment: "Love this tote! It's spacious and the quality is amazing." },
    { id: 2, author: "Bushra Malik", rating: 5, date: "2 weeks ago", comment: "Perfect everyday bag. So well-made!" },
    { id: 3, author: "Naila Khan", rating: 4, date: "1 month ago", comment: "Great bag, very practical and stylish." }
  ],
  "bags-2": [
    { id: 1, author: "Amina Tariq", rating: 5, date: "3 days ago", comment: "Perfect crossbody bag! Just the right size." },
    { id: 2, author: "Rida Ahmed", rating: 4, date: "1 week ago", comment: "Nice bag, good quality. Love the color!" },
    { id: 3, author: "Sehrish Ali", rating: 5, date: "2 weeks ago", comment: "Exactly what I was looking for!" }
  ],
  "bags-3": [
    { id: 1, author: "Uzma Hassan", rating: 5, date: "5 days ago", comment: "Great market bag! Sturdy and stylish." },
    { id: 2, author: "Shazia Mahmood", rating: 5, date: "1 week ago", comment: "Perfect for grocery shopping!" }
  ],
  "bags-4": [
    { id: 1, author: "Nadia Siddiqui", rating: 5, date: "1 week ago", comment: "Beautiful clutch! Perfect for weddings." },
    { id: 2, author: "Sahar Khan", rating: 4, date: "2 weeks ago", comment: "Elegant and well-made." }
  ],
  "bags-5": [
    { id: 1, author: "Fozia Ali", rating: 5, date: "4 days ago", comment: "Love this bucket bag! So trendy and practical." },
    { id: 2, author: "Raheela Akram", rating: 5, date: "1 week ago", comment: "Great quality and style!" },
    { id: 3, author: "Shaista Noor", rating: 5, date: "2 weeks ago", comment: "Perfect bag! Highly recommend." }
  ],
  "bags-6": [
    { id: 1, author: "Tahira Bashir", rating: 5, date: "3 days ago", comment: "Perfect work bag! Fits my laptop easily." },
    { id: 2, author: "Fariha Iqbal", rating: 5, date: "1 week ago", comment: "Very practical and professional looking." }
  ],

  // Bag Charms
  "charms-1": [
    { id: 1, author: "Lubna Asif", rating: 5, date: "2 days ago", comment: "Adorable butterfly charm! So delicate and pretty." },
    { id: 2, author: "Sidra Mushtaq", rating: 5, date: "1 week ago", comment: "Love it! Great addition to my bag." },
    { id: 3, author: "Sehar Abbas", rating: 5, date: "2 weeks ago", comment: "Beautiful craftsmanship!" }
  ],
  "charms-2": [
    { id: 1, author: "Komal Farhan", rating: 5, date: "3 days ago", comment: "Beautiful tassel! Good quality." },
    { id: 2, author: "Anum Riaz", rating: 4, date: "1 week ago", comment: "Nice charm, looks great on my bag." }
  ],
  "charms-3": [
    { id: 1, author: "Rubab Shah", rating: 5, date: "5 days ago", comment: "Cute mini flower! Perfect size." },
    { id: 2, author: "Alishba Raza", rating: 5, date: "1 week ago", comment: "So adorable! Love it." },
    { id: 3, author: "Shanzay Imran", rating: 5, date: "2 weeks ago", comment: "Beautiful little flower charm!" }
  ],
  "charms-4": [
    { id: 1, author: "Esha Saleem", rating: 5, date: "1 week ago", comment: "Love the geometric design! Very modern." },
    { id: 2, author: "Kinza Nawaz", rating: 4, date: "2 weeks ago", comment: "Nice charm, good quality." }
  ],
  "charms-5": [
    { id: 1, author: "Muqaddas Ali", rating: 5, date: "2 days ago", comment: "Super fluffy pom pom! Love it." },
    { id: 2, author: "Ramsha Malik", rating: 5, date: "1 week ago", comment: "So cute and colorful!" },
    { id: 3, author: "Momina Khan", rating: 5, date: "1 week ago", comment: "Perfect addition to my keychain!" }
  ],
  "charms-6": [
    { id: 1, author: "Dua Fatima", rating: 5, date: "4 days ago", comment: "Sweet heart charm! Well-made." },
    { id: 2, author: "Areeba Hassan", rating: 5, date: "1 week ago", comment: "Beautiful! Great as a gift." }
  ],

  // Bandanas
  "bandanas-1": [
    { id: 1, author: "Sana Javaid", rating: 5, date: "1 week ago", comment: "Perfect bandana for my dog! Soft and comfortable." },
    { id: 2, author: "Maha Younis", rating: 5, date: "2 weeks ago", comment: "My cat loves it! Great quality." },
    { id: 3, author: "Tuba Amin", rating: 4, date: "3 weeks ago", comment: "Nice bandana, good fit." }
  ],
  "bandanas-2": [
    { id: 1, author: "Saba Rasheed", rating: 5, date: "5 days ago", comment: "Beautiful floral pattern! My pet looks adorable." },
    { id: 2, author: "Nida Zaheer", rating: 5, date: "1 week ago", comment: "Love the boho style!" },
    { id: 3, author: "Eman Farooq", rating: 5, date: "2 weeks ago", comment: "So pretty and well-made!" }
  ],
  "bandanas-3": [
    { id: 1, author: "Ayesha Munir", rating: 5, date: "3 days ago", comment: "Perfect for holidays! Love the festive design." },
    { id: 2, author: "Huma Naeem", rating: 4, date: "1 week ago", comment: "Nice holiday bandana. Good quality." }
  ],
  "bandanas-4": [
    { id: 1, author: "Faiza Aslam", rating: 5, date: "1 week ago", comment: "Love the reversible design! Two bandanas in one." },
    { id: 2, author: "Shabana Ghulam", rating: 5, date: "2 weeks ago", comment: "Great value! Both sides are beautiful." }
  ],
  "bandanas-5": [
    { id: 1, author: "Wardah Saeed", rating: 5, date: "4 days ago", comment: "Perfect for summer! Light and breathable." },
    { id: 2, author: "Urooj Baig", rating: 5, date: "1 week ago", comment: "Love the bright colors!" },
    { id: 3, author: "Samra Latif", rating: 4, date: "2 weeks ago", comment: "Nice summer bandana. My dog loves it!" }
  ],
  "bandanas-6": [
    { id: 1, author: "Tayyaba Rafiq", rating: 5, date: "2 days ago", comment: "Love the personalized touch! So unique." },
    { id: 2, author: "Madiha Kamran", rating: 5, date: "1 week ago", comment: "Perfect custom bandana!" }
  ],

  // Accessories
  "accessories-1": [
    { id: 1, author: "Hamna Arshad", rating: 5, date: "3 days ago", comment: "Love these scrunchies! Soft and gentle on my hair." },
    { id: 2, author: "Zoya Ilyas", rating: 5, date: "1 week ago", comment: "Great set! All three colors are beautiful." },
    { id: 3, author: "Javeria Shahid", rating: 5, date: "2 weeks ago", comment: "Perfect scrunchies! Don't damage my hair." }
  ],
  "accessories-2": [
    { id: 1, author: "Sabeen Rauf", rating: 5, date: "5 days ago", comment: "Cozy headband! Perfect for winter." },
    { id: 2, author: "Sadia Karim", rating: 5, date: "1 week ago", comment: "Love it! Keeps my hair back nicely." },
    { id: 3, author: "Iram Azhar", rating: 4, date: "2 weeks ago", comment: "Nice headband, comfortable fit." }
  ],
  "accessories-3": [
    { id: 1, author: "Sidra Batool", rating: 5, date: "1 week ago", comment: "Cute phone case! Protects my phone well." },
    { id: 2, author: "Nimra Waqar", rating: 4, date: "2 weeks ago", comment: "Nice case, unique design." }
  ],
  "accessories-4": [
    { id: 1, author: "Sehrish Jamil", rating: 5, date: "3 days ago", comment: "Adorable bookmarks! Perfect for my book club friends." },
    { id: 2, author: "Maira Sultan", rating: 5, date: "1 week ago", comment: "Love them! So cute and functional." }
  ],
  "accessories-5": [
    { id: 1, author: "Asma Nadeem", rating: 5, date: "4 days ago", comment: "Perfect coin purse! Small but holds everything I need." },
    { id: 2, author: "Arooj Hameed", rating: 5, date: "1 week ago", comment: "Great quality! Love the design." },
    { id: 3, author: "Malaika Raza", rating: 5, date: "2 weeks ago", comment: "So practical and cute!" }
  ],
  "accessories-6": [
    { id: 1, author: "Zainab Usman", rating: 5, date: "2 days ago", comment: "Love these cup cozies! Keep my drinks warm." },
    { id: 2, author: "Mahnoor Saeed", rating: 5, date: "1 week ago", comment: "Great set! Beautiful colors." }
  ],
  "accessories-7": [
    { id: 1, author: "Fatima Nasir", rating: 5, date: "5 days ago", comment: "Beautiful jewelry pouch! Perfect for travel." },
    { id: 2, author: "Amina Haider", rating: 5, date: "2 weeks ago", comment: "Love it! Keeps my jewelry safe." }
  ],
  "accessories-8": [
    { id: 1, author: "Hira Zubair", rating: 5, date: "3 days ago", comment: "Perfect plant pot cover! Adds charm to my plants." },
    { id: 2, author: "Saira Abbasi", rating: 4, date: "1 week ago", comment: "Nice cover, looks great!" }
  ],
};

// Get reviews for a specific product
export const getProductReviews = (category: string, productId: number): Review[] => {
  const key = `${category.toLowerCase()}-${productId}`;
  return productReviews[key] || [];
};

// Get product data with calculated rating and review count
export const getProductWithReviews = (product: any, category: string) => {
  const reviews = getProductReviews(category, product.id);
  const rating = calculateAverageRating(reviews);
  const reviewCount = getReviewCount(reviews);

  return {
    ...product,
    rating,
    reviews: reviewCount,
    reviewsData: reviews
  };
};

// Get all products with reviews for a category
export const getCategoryProductsWithReviews = (products: any[], category: string) => {
  return products.map(product => getProductWithReviews(product, category));
};

// Featured products mapping (maps to actual products from categories)
export const getFeaturedProducts = () => {
  return [
    { category: 'flowers', id: 1 },    // Lavender Rose Bouquet
    { category: 'bags', id: 1 },       // Boho Tote Bag
    { category: 'flowers', id: 2 },    // Sunflower Centerpiece
    { category: 'charms', id: 3 },     // Mini Flower Charm
    { category: 'bandanas', id: 1 },   // Classic Crochet Bandana
    { category: 'accessories', id: 1 } // Hair Scrunchie Set
  ];
};
