import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowLeft, Mail, Phone, MapPin, Clock, MessageSquare, Palette, Heart, Upload, X, Image } from "lucide-react";

interface ContactPageProps {
  onNavigate: (page: string) => void;
  referenceData?: {
    type?: string;
    referenceImage?: string;
    suggestedColors?: string[];
    category?: string;
    title?: string;
    description?: string;
  };
}

export function ContactPage({ onNavigate, referenceData }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderType: referenceData?.type === 'custom-order' ? 'custom-order' : "",
    subject: referenceData?.title ? `Custom Order: ${referenceData.title}` : "",
    message: referenceData?.description ? `I'd like to order a custom version of "${referenceData.title}". ${referenceData.description}` : "",
    colors: referenceData?.suggestedColors ? referenceData.suggestedColors.join(", ") : "",
    timeline: ""
  });
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [selectedExampleImages, setSelectedExampleImages] = useState<string[]>(
    referenceData?.referenceImage ? [referenceData.referenceImage] : []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      orderType: "",
      subject: "",
      message: "",
      colors: "",
      timeline: ""
    });
    setUploadedImages([]);
    setSelectedExampleImages([]);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedImages(prev => [...prev, ...files].slice(0, 5)); // Limit to 5 images
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleExampleImage = (imageUrl: string) => {
    setSelectedExampleImages(prev => 
      prev.includes(imageUrl) 
        ? prev.filter(url => url !== imageUrl)
        : [...prev, imageUrl].slice(0, 3) // Limit to 3 example images
    );
  };

  const removeExampleImage = (imageUrl: string) => {
    setSelectedExampleImages(prev => prev.filter(url => url !== imageUrl));
  };

  const exampleImages = [
    "https://images.unsplash.com/photo-1750009928696-61f5ed8eb8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwZmxvd2VycyUyMGhhbmRtYWRlJTIwcHVycGxlfGVufDF8fHx8MTc1OTI2ODAyMHww&ixlib=rb-4.1.0&q=80&w=400",
    "https://images.unsplash.com/photo-1594736797933-d0b22d6ac0c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwaGFuZG1hZGV8ZW58MXx8fHwxNzU5MjY4MDk4fDA&ixlib=rb-4.1.0&q=80&w=400",
    "https://images.unsplash.com/photo-1594736797933-d0b22d6ac0c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYWNjZXNzb3JpZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NTkyNjgxMDF8MA&ixlib=rb-4.1.0&q=80&w=400"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b">
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
            <h1 className="text-2xl font-bold text-primary">Contact Us</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Get in Touch Card - Centralized */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">info@pikoandpearl.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+92 300 1234567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">Handmade with love in Pakistan</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-sm text-muted-foreground">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">Follow Our Journey</h3>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                See our latest creations and behind-the-scenes moments on social media!
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('https://www.instagram.com/pikoandpearl?igsh=dmlzZzhtaHU5NGM0', '_blank')}
                >
                  Instagram
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('https://www.facebook.com/share/16gXixBNPH/', '_blank')}
                >
                  Facebook
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('https://www.pinterest.com/pikoandpearl/', '_blank')}
                >
                  Pinterest
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}