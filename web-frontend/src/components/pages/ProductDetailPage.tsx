import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Heart, ShoppingBag, Star, ArrowLeft, Plus, Minus, User, Droplet, Sun, Wind, Package } from "lucide-react";
import { useCart } from "../CartContext";
import { useWishlist } from "../WishlistContext";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";
import { getProductReviews, calculateAverageRating, getReviewCount } from "../ProductData";
import { Header } from "../Header";
import { Footer } from "../Footer";

interface ProductDetailPageProps {
  onNavigate: (page: string, query?: string, data?: any) => void;
  productData: any;
  previousPage?: string;
  categories?: any[];
}

export function ProductDetailPage({ onNavigate, productData, previousPage, categories }: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  if (!productData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Button onClick={() => onNavigate('home')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const { product, category, allProducts } = productData;

  // Get reviews for this specific product
  const reviews = getProductReviews(category, product.id);
  const averageRating = calculateAverageRating(reviews);
  const reviewCount = getReviewCount(reviews);

  // Determine the category page to go back to
  const getCategoryPage = () => {
    // If previousPage is set and it's either 'home' or 'featured', use that
    if (previousPage === 'home' || previousPage === 'featured') {
      return previousPage;
    }
    
    const categoryLower = category.toLowerCase();
    // Map category names to their page routes
    const categoryMap: { [key: string]: string } = {
      'flowers': 'flowers',
      'bags': 'bags',
      'charms': 'charms',
      'bandanas': 'bandanas',
      'accessories': 'accessories',
      'keychains': 'keychains',
      'featured': 'featured'
    };
    
    return categoryMap[categoryLower] || 'home';
  };

  const backPage = getCategoryPage();

  // Inject product SEO meta tags when available
  useEffect(() => {
    if (!product) return;
    document.title = product.metaTitle || product.name || document.title;

    let desc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!desc) {
      desc = document.createElement('meta');
      desc.name = 'description';
      document.head.appendChild(desc);
    }
    desc.content = product.metaDescription || product.description || '';

    let kw = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
    if (!kw) {
      kw = document.createElement('meta');
      kw.name = 'keywords';
      document.head.appendChild(kw);
    }
    kw.content = Array.isArray(product.keywords) ? product.keywords.join(',') : (product.keywords || '');

    return () => {
      // optional: cleanup or restore previous title/meta if desired
    };
  }, [product]);

  // Use explicit image fields if available (image1..image4) and fall back to single image
  const productImages = [product.image1, product.image2, product.image3, product.image4].filter(Boolean);
  if (productImages.length === 0 && product.image) productImages.push(product.image);

  // Enhanced descriptions with 2-3 lines
  const getEnhancedDescription = () => {
    const descriptions: { [key: string]: string } = {
      "Lavender Rose Bouquet": "Beautiful handcrafted lavender roses that bloom forever, creating a timeless piece of art for your home. Each rose is carefully crocheted with premium yarn in soft lavender tones. Perfect for gifting or as an elegant home decoration that never wilts.",
      "Sunflower Centerpiece": "Bright and cheerful sunflower arrangement that brings sunshine to any space all year round. Handmade with vibrant yellow and orange yarn, this centerpiece captures the essence of summer. Ideal for dining tables, shelves, or as a thoughtful gift for nature lovers.",
      "Daisy Chain Garland": "Delicate daisy garland perfect for home decoration, weddings, or special events. Each daisy is meticulously crafted with soft white and yellow yarn creating a charming vintage aesthetic. Lightweight and versatile, this garland adds a touch of nature to any room.",
      "Peony Bloom Set": "Luxurious peony blooms in soft pastel colors that add elegance to any setting. This premium set features full, dimensional flowers with intricate petal detailing. Perfect for those who appreciate sophisticated home decor with a handmade touch.",
      "Wildflower Bouquet": "Mixed wildflower arrangement showcasing nature's diversity in vibrant crochet form. Each flower is unique, featuring various colors and styles for an authentic wildflower meadow feel. Brings the beauty of the countryside into your home year-round.",
      "Cherry Blossom Branch": "Delicate cherry blossom branch capturing the fleeting beauty of spring forever. Soft pink blooms on a natural-looking branch create a serene Japanese-inspired aesthetic. Perfect for minimalist or zen-style home decor.",
      "Mini Rose Trio": "Adorable set of three small roses perfect for compact spaces or as desk decoration. Available in classic colors, these mini blooms are ideal for gift giving or creating small floral arrangements. Each rose is crafted with the same attention to detail as our larger pieces.",
      "Tulip Garden Set": "Beautiful collection of tulips bringing spring garden vibes to your home all year. Features multiple tulip stems in coordinating colors for a complete garden display. Perfect for spring decor or for those who love the simple elegance of tulips.",
      "Boho Tote Bag": "Spacious handwoven tote perfect for everyday use, crafted with durable premium yarn in trendy boho patterns. Features comfortable handles and ample space for all your essentials. Combines functionality with artisan style for the modern eco-conscious shopper.",
      "Mini Crossbody Bag": "Compact crossbody bag offering hands-free convenience without compromising on style. Lightweight design with adjustable strap makes it perfect for travel, shopping, or daily errands. Handcrafted with care in beautiful color combinations.",
      "Market Basket Bag": "Eco-friendly market bag with sturdy handles designed for grocery shopping and farmers market trips. Durable construction can hold heavy items while maintaining its shape. A sustainable alternative to plastic bags with timeless style.",
      "Evening Clutch": "Sophisticated clutch bag perfect for weddings, parties, and special occasions. Elegant design with delicate crochet work adds a unique handmade touch to formal attire. Compact yet spacious enough for your evening essentials.",
      "Bucket Bag": "Trendy bucket style bag with drawstring closure combining fashion and functionality. Features a roomy interior perfect for daily use while maintaining a chic silhouette. Handcrafted with quality yarn for long-lasting durability.",
      "Laptop Tote": "Professional work tote with dedicated laptop compartment for the modern working woman. Spacious design accommodates a laptop, documents, and daily essentials with organized compartments. Handmade quality meets practical workspace needs.",
      "Flower Bag Charm": "Adorable miniature flower charm that adds personality to any bag or accessory. Perfectly sized keychain decoration featuring the same quality craftsmanship as our full-size items. A sweet little gift or personal style statement.",
      "Heart Keychain": "Charming heart-shaped keychain handcrafted with love and attention to detail. Soft yet durable construction makes it perfect for keys, bags, or as a zipper pull. A thoughtful gift to show someone you care.",
      "Star Charm Set": "Whimsical set of star charms adding magic to your everyday items. Each star is carefully crocheted with vibrant colors and secure attachments. Perfect for personalizing bags, backpacks, or creating custom accessories.",
      "Rainbow Charm": "Cheerful rainbow charm bringing color and positivity wherever you go. Features all the colors of the rainbow in a compact, well-crafted design. Spreads joy as a bag decoration or thoughtful gift.",
      "Paw Print Charm": "Cute paw print charm perfect for pet lovers and animal enthusiasts. Detailed design captures the charm of a furry friend's paw. Makes a great gift for veterinarians, pet owners, or anyone who loves animals.",
      "Butterfly Keyring": "Delicate butterfly keyring showcasing intricate wing details and vibrant colors. Lightweight yet durable, it adds a touch of nature to your keys or bag. Symbolizes transformation and beauty in a practical accessory.",
      "Classic Bandana": "Soft and comfortable bandana perfect for your furry friend or personal style. Premium yarn ensures gentle contact with skin while maintaining shape through multiple uses. Adjustable fit works for various sizes.",
      "Boho Flower Bandana": "Beautiful floral pattern bandana with soft texture and bohemian charm. Features intricate flower designs that showcase skilled craftsmanship. Perfect for adding a pop of color to any outfit or pet accessory.",
      "Holiday Special Bandana": "Festive design bandana perfect for celebrating special occasions and holidays. Features seasonal colors and patterns that spread holiday cheer. Makes photo opportunities extra special for you or your pet.",
      "Reversible Bandana": "Innovative two-in-one design offering two patterns in a single reversible bandana. Doubles your styling options while maintaining the same quality construction. Excellent value with versatile wear options.",
      "Summer Vibes Bandana": "Light and breezy bandana perfect for warm weather adventures and outdoor activities. Breathable construction keeps you or your pet comfortable in the heat. Features bright, cheerful colors that embody summer fun.",
      "Pet Collar Bandana": "Specially designed bandana that easily attaches to any pet collar for fuss-free styling. Secure fit ensures it stays in place during active play. Available in various colors to match your pet's personality.",
      "Hair Scrunchie Set": "Beautiful set of three scrunchies in complementary colors for versatile hair styling. Gentle on hair while providing secure hold without damage or breakage. Handcrafted quality meets practical daily use.",
      "Headband Set": "Comfortable headband set perfect for keeping hair back in style during any activity. Soft, stretchy construction fits various head sizes without causing discomfort. Fashionable accessories that work from gym to dinner.",
      "Coaster Set": "Practical set of handmade coasters protecting surfaces while adding handcrafted charm to your home. Absorbent design prevents water rings while the durable construction withstands daily use. A thoughtful housewarming gift or home essential."
    };
    
    return descriptions[product.name] || product.description + ". Handcrafted with premium materials and attention to detail. Each piece is unique and made with love in Pakistan.";
  };

  // Calculate rating distribution
  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
      distribution[review.rating - 1]++;
    });
    return distribution.map(count => (count / reviews.length) * 100);
  };

  const ratingDistribution = getRatingDistribution();

  // Filter related products (same category, different product)
  const relatedProducts = allProducts
    ? allProducts
        .filter((p: any) => p.id !== product.id)
        .slice(0, 4)
    : [];

  const handleAddToCart = () => {
    addItem({
      id: `${category.toLowerCase()}-${product.id}`,
      name: product.name,
      price: product.price,
      image: product.image,
      category: category,
      quantity: quantity
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = () => {
    const wishlistItem = {
      id: `${category.toLowerCase()}-${product.id}`,
      name: product.name,
      price: product.price,
      previousPrice: product.previousPrice || product.originalPrice,
      image: product.image,
      category: category,
      rating: product.rating,
      reviews: product.reviews,
      description: product.description
    };
    
    toggleItem(wishlistItem);
    toast.success(
      isInWishlist(`${category.toLowerCase()}-${product.id}`) 
        ? `${product.name} removed from wishlist` 
        : `${product.name} added to wishlist!`
    );
  };



  const handleProductClick = (clickedProduct: any) => {
    const categoryKey = category.toLowerCase();
    onNavigate(`product-${categoryKey}-${clickedProduct.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
  {/* Header */}
  <Header onNavigate={onNavigate} categories={categories || []} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images - Left Side */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
              <ImageWithFallback
                src={productImages[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg bg-gray-100 transition-all ${
                    selectedImageIndex === index 
                      ? 'ring-2 ring-primary' 
                      : 'hover:ring-2 hover:ring-gray-300'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details - Right Side */}
          <div className="space-y-6">
            <div>
              <h1 className="mb-2 text-3xl font-semibold text-primary">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(averageRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {averageRating} ({reviewCount} reviews)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-foreground">Rs {product.price}</span>
                {(product.previousPrice || product.originalPrice) && (
                  <span className="text-muted-foreground line-through">Rs {product.previousPrice || product.originalPrice}</span>
                )}
              </div>
            </div>

            <div>
              <h3 className="mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {getEnhancedDescription()}
              </p>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart - Rs {(product.price * quantity)}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={handleWishlistToggle}
              >
                <Heart 
                  className={`h-5 w-5 mr-2 ${
                    isInWishlist(`${category.toLowerCase()}-${product.id}`)
                      ? 'fill-red-500 text-red-500'
                      : ''
                  }`}
                />
                {isInWishlist(`${category.toLowerCase()}-${product.id}`) 
                  ? 'Remove from Wishlist' 
                  : 'Add to Wishlist'}
              </Button>
            </div>

            {/* Product Info */}
            <div className="border-t pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span>Category:</span>
                  <p className="text-muted-foreground">{category}</p>
                </div>
                <div>
                  <span>Handmade:</span>
                  <p className="text-muted-foreground">in Pakistan</p>
                </div>
                <div>
                  <span>Material:</span>
                  <p className="text-muted-foreground">Premium Yarn</p>
                </div>
                <div>
                  <span>Ships in:</span>
                  <p className="text-muted-foreground">2-3 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Care Instructions Section */}
        <div className="mb-16">
          <Separator className="mb-8" />
          <h2 className="mb-6">Care Instructions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Droplet className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2">Hand Wash Only</h3>
                <p className="text-sm text-muted-foreground">
                  Gently hand wash in cold water with mild detergent. Do not wring or twist.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Sun className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2">Air Dry</h3>
                <p className="text-sm text-muted-foreground">
                  Lay flat to dry away from direct sunlight to maintain color and shape.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Wind className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2">Gentle Handling</h3>
                <p className="text-sm text-muted-foreground">
                  Handle with care. Avoid pulling or stretching the yarn fibers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2">Storage</h3>
                <p className="text-sm text-muted-foreground">
                  Store in a cool, dry place. Keep away from moisture and direct heat.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Ratings and Reviews Section */}
        <div className="mb-16">
          <Separator className="mb-8" />
          <div className="space-y-8">
            <h2>Customer Reviews</h2>

            {/* Rating Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Overall Rating */}
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                              <div className="text-5xl mb-2">{averageRating}</div>
                      <div className="flex items-center justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(averageRating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Based on {reviewCount} reviews
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Rating Distribution */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((rating, index) => (
                        <div key={rating} className="flex items-center gap-4">
                          <div className="flex items-center gap-1 w-16">
                            <span className="text-sm">{rating}</span>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </div>
                          <Progress 
                            value={ratingDistribution[rating - 1]} 
                            className="flex-1 h-2"
                          />
                          <span className="text-sm text-muted-foreground w-12 text-right">
                            {Math.round(ratingDistribution[rating - 1])}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <p className="text-muted-foreground">No reviews available</p>
              ) : (
                reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-foreground">{review.author}</p>
                              <p className="text-sm text-muted-foreground">{review.date}</p>
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>

        {/* You Might Also Like Section */}
        {relatedProducts.length > 0 && (
          <div>
            <Separator className="mb-8" />
            <h2 className="mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct: any) => {
                const relatedWishlistItem = {
                  id: `${category.toLowerCase()}-${relatedProduct.id}`,
                  name: relatedProduct.name,
                  price: relatedProduct.price,
                  originalPrice: relatedProduct.originalPrice,
                  image: relatedProduct.image,
                  category: category,
                  rating: relatedProduct.rating,
                  reviews: relatedProduct.reviews,
                  description: relatedProduct.description
                };

                const handleRelatedAddToCart = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  addItem({
                    id: `${category.toLowerCase()}-${relatedProduct.id}`,
                    name: relatedProduct.name,
                    price: relatedProduct.price,
                    image: relatedProduct.image,
                    category: category,
                    quantity: 1
                  });
                  toast.success(`${relatedProduct.name} added to cart!`);
                };

                const handleRelatedWishlistToggle = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  toggleItem(relatedWishlistItem);
                  toast.success(
                    isInWishlist(`${category.toLowerCase()}-${relatedProduct.id}`) 
                      ? `${relatedProduct.name} removed from wishlist` 
                      : `${relatedProduct.name} added to wishlist!`
                  );
                };

                return (
                  <Card 
                    key={relatedProduct.id} 
                    className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white dark:bg-card overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <ImageWithFallback
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                          onClick={() => handleProductClick(relatedProduct)}
                        />
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-3 right-3 bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-black/70 h-9 w-9 rounded-full shadow-sm"
                          onClick={handleRelatedWishlistToggle}
                        >
                          <Heart 
                            className={`h-4 w-4 ${
                              isInWishlist(`${category.toLowerCase()}-${relatedProduct.id}`) 
                                ? 'fill-red-500 text-red-500' 
                                : 'text-gray-600 dark:text-gray-300'
                            }`} 
                          />
                        </Button>
                        
                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button 
                            className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary"
                            onClick={handleRelatedAddToCart}
                          >
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(relatedProduct.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-muted-foreground ml-1">
                              ({relatedProduct.reviews})
                            </span>
                          </div>
                        </div>
                        
                        <h3 
                          className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer"
                          onClick={() => handleProductClick(relatedProduct)}
                        >
                          {relatedProduct.name}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          {relatedProduct.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-primary">Rs {relatedProduct.price}</span>
                            {relatedProduct.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                Rs {relatedProduct.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleProductClick(relatedProduct)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer onNavigate={onNavigate} categories={categories} />
    </div>
  );
}
