import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowLeft, Heart, Droplets, Sun, Wind, Scissors } from "lucide-react";

interface CareInstructionsPageProps {
  onNavigate: (page: string) => void;
}

export function CareInstructionsPage({ onNavigate }: CareInstructionsPageProps) {
  const careInstructions = [
    {
      icon: Droplets,
      title: "Washing",
      items: [
        "Hand wash in cold water with mild detergent",
        "Gently squeeze, do not wring or twist",
        "For delicate items, use a mesh laundry bag",
        "Wash separately for the first few washes to prevent color bleeding"
      ]
    },
    {
      icon: Sun,
      title: "Drying",
      items: [
        "Lay flat to dry on a clean towel",
        "Avoid direct sunlight which can fade colors",
        "Reshape while damp to maintain original form",
        "Never use a tumble dryer as heat can damage fibers"
      ]
    },
    {
      icon: Wind,
      title: "Storage",
      items: [
        "Store in a cool, dry place away from direct sunlight",
        "Fold carefully to avoid stretching",
        "Use cedar balls or lavender sachets to prevent moths",
        "Avoid storing in plastic bags - use breathable cloth bags instead"
      ]
    },
    {
      icon: Scissors,
      title: "Maintenance",
      items: [
        "Trim loose threads carefully with small scissors",
        "For pilling, use a fabric shaver or pilling comb",
        "If a stitch comes loose, secure it immediately to prevent unraveling",
        "Professional repair services available for major damage"
      ]
    }
  ];



  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
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
            <h1 className="text-2xl font-bold text-primary">Care Instructions</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-foreground">Caring for Your Handmade Items</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Each Piko & Pearl item is lovingly handcrafted with premium materials. 
            Following these care instructions will help your pieces maintain their beauty and last for years to come.
          </p>
        </div>

        {/* General Care Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {careInstructions.map((section, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <section.icon className="h-6 w-6 text-primary" />
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>



        {/* Contact Section */}
        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold text-foreground mb-4">Need Help?</h3>
          <p className="text-muted-foreground mb-6">
            If you have questions about caring for your specific item or need repair advice, 
            we're here to help!
          </p>
          <Button onClick={() => onNavigate('contact')} size="lg">
            Contact Our Team
          </Button>
        </div>
      </div>
    </div>
  );
}