export type ConsultationStatus = 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';
export type ConsultationMethod = 'in_person' | 'phone' | 'online';

export interface ConsultationRequest {
  id: string; // e.g. REQ-38694-102
  fullName: string;
  phone: string;
  email: string;
  serviceCategory: string;
  consultationMethod: ConsultationMethod;
  preferredDate: string;
  preferredTime: string;
  topicDescription: string;
  attachmentName?: string;
  agreedToTerms: boolean;
  status: ConsultationStatus;
  adminNotes?: string;
  createdAt: string;
}

export interface LegalService {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  requiredDocs: string[];
  processSteps: string[];
  faqs: { question: string; answer: string }[];
}

export interface LegalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'methods' | 'privacy' | 'documents' | 'tracking';
}

export interface FirmStat {
  label: string;
  value: string;
  description: string;
}
