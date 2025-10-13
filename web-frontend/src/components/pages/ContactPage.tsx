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
      <div className="bg-white border-b">
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

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-purple-50/50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let's Create Something Beautiful Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a custom order in mind? Questions about our products? We'd love to hear from you! 
            Every piece we create starts with a conversation.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center space-x-2 mb-6">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">Send us a Message</h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+92 300 1234567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Inquiry Type
                      </label>
                      <Select value={formData.orderType} onValueChange={(value) => handleInputChange('orderType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="custom-order">Custom Order</SelectItem>
                          <SelectItem value="product-question">Product Question</SelectItem>
                          <SelectItem value="wholesale">Wholesale Inquiry</SelectItem>
                          <SelectItem value="collaboration">Collaboration</SelectItem>
                          <SelectItem value="support">Customer Support</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  {formData.orderType === 'custom-order' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Preferred Colors
                        </label>
                        <Input
                          value={formData.colors}
                          onChange={(e) => handleInputChange('colors', e.target.value)}
                          placeholder="e.g., lavender, pink, cream"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Timeline
                        </label>
                        <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="When do you need this?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                            <SelectItem value="3-4-weeks">3-4 weeks</SelectItem>
                            <SelectItem value="1-2-months">1-2 months</SelectItem>
                            <SelectItem value="flexible">I'm flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Reference Images
                        </label>
                        <div className="space-y-4">
                          {/* Upload Area */}
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="image-upload"
                            />
                            <label htmlFor="image-upload" className="cursor-pointer">
                              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">
                                Click to upload images or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                PNG, JPG up to 5 images
                              </p>
                            </label>
                          </div>

                          {/* Selected Example Images */}
                          {selectedExampleImages.length > 0 && (
                            <div>
                              <p className="text-sm font-medium mb-2">Selected Reference Images:</p>
                              <div className="grid grid-cols-3 gap-2">
                                {selectedExampleImages.map((imageUrl, index) => (
                                  <div key={index} className="relative group">
                                    <div className="aspect-square rounded-lg overflow-hidden">
                                      <img
                                        src={imageUrl}
                                        alt={`Selected reference ${index + 1}`}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <button
                                      onClick={() => removeExampleImage(imageUrl)}
                                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Uploaded Images */}
                          {uploadedImages.length > 0 && (
                            <div>
                              <p className="text-sm font-medium mb-2">Uploaded Images:</p>
                              <div className="grid grid-cols-3 gap-2">
                                {uploadedImages.map((file, index) => (
                                  <div key={index} className="relative group">
                                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                      <Image className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <button
                                      onClick={() => removeImage(index)}
                                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                    <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Example Images - Only show if no reference data provided */}
                          {!referenceData && (
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium">Or choose from examples:</p>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => onNavigate('examples')}
                                  className="text-xs"
                                >
                                  View More Examples
                                </Button>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                {exampleImages.map((src, index) => (
                                  <div 
                                    key={index} 
                                    className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                                      selectedExampleImages.includes(src) 
                                        ? 'ring-2 ring-primary' 
                                        : 'hover:ring-2 hover:ring-primary/50'
                                    }`}
                                    onClick={() => toggleExampleImage(src)}
                                  >
                                    <div className="relative w-full h-full">
                                      <img
                                        src={src}
                                        alt={`Example ${index + 1}`}
                                        className="w-full h-full object-cover"
                                      />
                                      {selectedExampleImages.includes(src) && (
                                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                          <div className="bg-primary text-white rounded-full p-1">
                                            <X className="h-3 w-3" />
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us more about what you're looking for. The more details you provide, the better we can help you!"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
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

            {/* Custom Order Info */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Palette className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Custom Orders</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <p>We love creating unique pieces just for you! Here's what we can customize:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Colors and patterns</li>
                    <li>• Sizes and dimensions</li>
                    <li>• Special messages or names</li>
                    <li>• Matching sets</li>
                    <li>• Bulk orders for events</li>
                  </ul>
                  <p className="text-primary font-medium">
                    Custom orders typically take 2-4 weeks depending on complexity.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Quick Links */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Answers</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-sm">How long does shipping take?</p>
                    <p className="text-sm text-muted-foreground">3-7 business days within Pakistan</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Do you offer returns?</p>
                    <p className="text-sm text-muted-foreground">Yes, 30-day return policy</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Care instructions?</p>
                    <p className="text-sm text-muted-foreground">Hand wash cold, lay flat to dry</p>
                  </div>

                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Follow Our Journey</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  See our latest creations and behind-the-scenes moments on social media!
                </p>
                <div className="flex flex-wrap gap-3">
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
    </div>
  );
}