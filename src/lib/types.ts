

import type { LucideIcon } from 'lucide-react';

export interface User {
    id: string;
    name: string;
    email: string;
    location: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Professional {
    id: string;
    name: string;
    specialization: string;
    location: string;
    rating: number;
    experience: number;
    image: string;
    price: number;
    featured: boolean;
    verified: boolean;
    serviceName?: string; // Made optional as it might not be on every professional object initially
    categoryId?: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  category: string; 
  location: string; 
  image: string;
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  shortDescription: string;
  included: string[];
  pricingTiers: {
    name: string;
    price: number;
    features: string[];
  }[];
  reviews: Review[];
  faqs: FAQ[];
  tags?: ('Instant' | 'Popular')[];
}

export interface City {
  id: string;
  name: string;
  slug: string;
  active?: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}


export interface Order {
  id: string;
  userId: string;
  serviceId: string;
  orderDate: string;
  totalAmount: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
}
