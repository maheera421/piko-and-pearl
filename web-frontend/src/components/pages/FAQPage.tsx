import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { ArrowLeft, Package, Heart, Clock, CreditCard } from "lucide-react";

interface FAQPageProps {
  onNavigate: (page: string) => void;
}

export function FAQPage({ onNavigate }: FAQPageProps) {
  const faqCategories = [
    {
      title: "Orders & Shipping",
      icon: Package,
      faqs: [
        {
          question: "How long does it take to process my order?",
          answer: "Most orders are processed within 1-2 business days. Custom orders may take 3-5 business days depending on complexity. You'll receive a confirmation email once your order is processed."
        },
        {
          question: "What are your shipping options?",
          answer: "We offer standard shipping (3-5 business days) and express shipping (1-2 business days) within Pakistan. Free shipping is available on orders over PKR 2000."
        },
        {
          question: "Do you ship internationally?",
          answer: "Currently, we only ship within Pakistan. We're working on expanding international shipping options. Follow us on social media for updates!"
        },
        {
          question: "Can I track my order?",
          answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can use this to track your package's progress."
        }
      ]
    },
    {
      title: "Products & Customization",
      icon: Heart,
      faqs: [
        {
          question: "Are all items handmade?",
          answer: "Yes! Every item in our collection is lovingly handcrafted by our skilled artisans. This means each piece is unique and may have slight variations that add to its charm."
        },
        {
          question: "Can I request custom colors or designs?",
          answer: "Absolutely! We love creating custom pieces. Contact us with your specific requirements, and we'll work with you to create something special. Custom orders require a 50% deposit."
        },
        {
          question: "What materials do you use?",
          answer: "We use high-quality cotton, acrylic, and wool yarns depending on the item. All materials are carefully selected for durability, comfort, and appearance."
        },
        {
          question: "How do I choose the right size?",
          answer: "Each product page includes detailed measurements. For bags and accessories, we provide dimensions. For wearable items like bandanas, we include size guides."
        }
      ]
    },
    {
      title: "Care & Maintenance",
      icon: Clock,
      faqs: [
        {
          question: "How should I care for my crocheted items?",
          answer: "Hand wash in cold water with mild detergent, lay flat to dry, and store in a cool, dry place. Check our detailed Care Instructions page for specific guidance."
        },
        {
          question: "What if my item gets damaged?",
          answer: "We offer repair services for items purchased from us. Contact us with photos of the damage, and we'll provide repair options and pricing."
        },
        {
          question: "How long will my items last?",
          answer: "With proper care, our handcrafted items can last for years. The longevity depends on usage and maintenance. We use quality materials designed for durability."
        }
      ]
    },
    {
      title: "Payments & Returns",
      icon: CreditCard,
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept major credit cards (Visa, Mastercard), debit cards, and cash on delivery (COD) for orders within Pakistan."
        },
        {
          question: "Is cash on delivery available?",
          answer: "Yes! COD is available for orders within Pakistan. A small COD fee may apply depending on your location."
        },
        {
          question: "What is your return policy?",
          answer: "We offer 30-day returns for unused items in original condition. Custom items are non-returnable unless there's a defect. Return shipping costs are borne by the customer."
        },
        {
          question: "How do I request a refund?",
          answer: "Contact us within 30 days of purchase with your order number and reason for return. We'll guide you through the return process and issue refunds within 5-7 business days."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
            <h1 className="text-2xl font-bold text-primary">Frequently Asked Questions</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <category.icon className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}