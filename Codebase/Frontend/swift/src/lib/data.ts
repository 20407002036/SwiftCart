import {products as productAPI } from "@/lib/api"


export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  specs?: { [key: string]: string };
  images?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export var products: Product[] = []
var producsdataAPI;
// producsdataAPI = await productAPI.getAll()
var producsdataAPILength = 0
// producsdataAPILength = producsdataAPI.length


// JS funstions to check is the productdataAPI has null value, or is empty, or giving a bad response
if(producsdataAPILength < 1){

   products = [
    {
      id: "1",
      name: "Minimalist Leather Watch",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80",
      category: "accessories",
      description: "A sophisticated timepiece crafted with genuine leather and minimalist design. Perfect for both casual and formal occasions.",
      specs: {
        "Case Material": "Stainless Steel",
        "Band Material": "Genuine Leather",
        "Water Resistance": "3 ATM",
        "Movement": "Japanese Quartz",
        "Case Diameter": "40mm"
      },
      images: [
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80",
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&q=80",
        "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=500&q=80"
      ]
    },
    {
      id: "2",
      name: "Wireless Earbuds",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&q=80",
      category: "electronics",
      description: "Premium wireless earbuds with active noise cancellation, touch controls, and exceptional sound quality. Includes wireless charging case.",
      specs: {
        "Battery Life": "Up to 24 hours",
        "Connectivity": "Bluetooth 5.0",
        "Noise Cancellation": "Active",
        "Water Resistance": "IPX4",
        "Charging": "USB-C & Wireless"
      },
      images: [
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&q=80",
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
        "https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=500&q=80"
      ]
    },
    {
      id: "3",
      name: "iPhone 14 Pro",
      price: 999.99,
      image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=500&q=80",
      category: "phones",
      description: "Latest iPhone with A16 Bionic chip and pro camera system.",
      specs: {
        "Display": "6.1-inch Super Retina XDR",
        "Processor": "A16 Bionic",
        "Storage": "256GB",
        "Camera": "48MP Main",
      },
      images: [
        "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=500&q=80",
      ]
    },
    {
      id: "4",
      name: "Samsung 65\" QLED TV",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&q=80",
      category: "electronics",
      description: "4K Ultra HD Smart TV with Quantum Processor",
      specs: {
        "Resolution": "4K Ultra HD",
        "HDR": "Quantum HDR",
        "Smart Platform": "Tizen",
      },
      images: [
        "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&q=80",
      ]
    },
    {
      id: "5",
      name: "Nike Air Max",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
      category: "clothing",
      description: "Classic running shoes with Air cushioning",
      specs: {
        "Material": "Mesh and synthetic",
        "Sole": "Rubber",
        "Closure": "Lace-up",
      },
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
      ]
    },
    {
      id: "6",
      name: "PlayStation 5",
      price: 499.99,
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80",
      category: "electronics",
      description: "Next-gen gaming console with 4K graphics",
      specs: {
        "Storage": "825GB SSD",
        "Resolution": "4K",
        "Controller": "DualSense",
      },
      images: [
        "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80",
      ]
    },
    {
      id: "7",
      name: "MacBook Pro 14\"",
      price: 1999.99,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
      category: "electronics",
      description: "Powerful laptop with M2 Pro chip",
      specs: {
        "Processor": "M2 Pro",
        "RAM": "16GB",
        "Storage": "512GB SSD",
      },
      images: [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
      ]
    },
    {
      id: "8",
      name: "Dyson Air Purifier",
      price: 399.99,
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80",
      category: "electronics",
      description: "HEPA air purifier with smart features",
      specs: {
        "Coverage": "400 sq ft",
        "Filtration": "HEPA H13",
        "Controls": "Smart enabled",
      },
      images: [
        "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80",
      ]
    },
    {
      id: "9",
      name: "Premium Backpack",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
      category: "accesories"
    },
    {
      id: "10",
      name: "Smart Water Bottle",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
      category: "electronics"
    }
  ];
}
else{
  // Make the values of the API be the Products
  // products = 
    // producsdataAPI.map((product: any) => ({
    //   id: product.id,
    //   name: product.name,
    //   price: parseInt(product.price, 10),
    //   image: product.image,
    //   category: product.category,
    //   description: product.description,
    //   specs: product.specs,
    //   images: product.images
    // }))
  
}