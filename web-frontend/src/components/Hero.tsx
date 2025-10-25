import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import slideImage1 from "figma:asset/5dc731be39fd32b546dc973ac7c75beb72ad8fcc.png";
import slideImage2 from "figma:asset/fbaacfcd6241ed9615bf5e82e637feb7f8f084af.png";
import slideImage3 from "figma:asset/0ef96d7c27f45470723e63c6acb8f6ced3faa192.png";

interface HeroProps {
  onNavigate?: (page: string) => void;
}

interface Slide {
  id: number;
  headingLine1: string;
  headingLine2: string;
  description: string;
  image: string;
  alt: string;
}

const slides: Slide[] = [
  {
    id: 1,
    headingLine1: "Blooms",
    headingLine2: "that never fade",
    description: "Stunning crochet flowers that bring everlasting beauty to any space",
    image: slideImage3,
    alt: "Colorful handmade crochet flowers bouquet"
  },
  {
    id: 2,
    headingLine1: "Carry art,",
    headingLine2: "not just essentials",
    description: "Beautiful handmade crochet bags in vibrant colors and unique patterns",
    image: slideImage2,
    alt: "Colorful handmade crochet bags with bohemian patterns"
  },
  {
    id: 3,
    headingLine1: "Add a charm,",
    headingLine2: "tell your story",
    description: "Adorable handmade crochet bag charms and keychains to personalize your style",
    image: slideImage1,
    alt: "Colorful handmade crochet bag charms and keychains"
  }
];

export function Hero({ onNavigate }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-transition every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsAnimating(false);
    }, 1000);
  };

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsAnimating(false);
    }, 1000);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '90vh' }}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Split Layout Container */}
          <div className="relative w-full h-full flex flex-col md:flex-row">
            {/* LEFT SIDE - Text Content with Purple Gradient */}
            <div 
              className="relative w-full md:w-[70%] h-1/2 md:h-full flex items-center justify-center md:justify-start px-8 md:px-20 lg:px-28 py-12 md:py-0"
              style={{
                background: 'linear-gradient(to right, rgba(139, 90, 159, 0.95) 0%, rgba(139, 90, 159, 0.9) 50%, rgba(139, 90, 159, 0.7) 70%, transparent 100%)'
              }}
            >
              {/* Text Content */}
              <div 
                className="relative z-10 max-w-2xl text-center md:text-left"
                style={{
                  animation: index === currentSlide ? 'fadeInUp 0.8s ease-out forwards' : 'none'
                }}
              >
                <h1 className="mb-3 md:mb-4">
                  <span 
                    className="block text-white text-5xl md:text-6xl lg:text-7xl mb-2 md:mb-3"
                    style={{ 
                      fontWeight: 700,
                      animationDelay: '0.1s'
                    }}
                  >
                    {slide.headingLine1}
                  </span>
                  <span 
                    className="block text-5xl md:text-6xl lg:text-7xl"
                    style={{ 
                      fontWeight: 700,
                      color: '#E6D9FF',
                      animationDelay: '0.2s'
                    }}
                  >
                    {slide.headingLine2}
                  </span>
                </h1>
                
                <p 
                  className="text-gray-200 text-lg md:text-xl lg:text-2xl mt-6 md:mt-8 max-w-xl"
                  style={{
                    fontWeight: 400,
                    animationDelay: '0.3s'
                  }}
                >
                  {slide.description}
                </p>
              </div>
            </div>

            {/* RIGHT SIDE - Image */}
            <div className="relative w-full md:w-[30%] h-1/2 md:h-full overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)'
                }}
              />
              {/* Subtle gradient overlay for blend */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to left, transparent 0%, rgba(139, 90, 159, 0.1) 50%, rgba(139, 90, 159, 0.3) 100%)'
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        disabled={isAnimating}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={handleNext}
        disabled={isAnimating}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'bg-white w-12 h-3'
                : 'bg-white/50 hover:bg-white/75 w-3 h-3'
            } disabled:cursor-not-allowed`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Keyframe Animation Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
