import React, { useState } from 'react';
import { LegalService } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';
import {
  Scale,
  HeartHandshake,
  Building2,
  FileSignature,
  Briefcase,
  MessageSquareText,
  Landmark,
  ShieldCheck,
  ArrowLeft,
  ChevronRight,
  Info
} from 'lucide-react';

interface ServicesSectionProps {
  services: LegalService[];
  onBookService: (serviceCategory: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onBookService
}) => {
  const [selectedService, setSelectedService] = useState<LegalService | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scale':
        return <Scale className="w-7 h-7 text-amber-400 group-hover:scale-110 transition-transform" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-7 h-7 text-amber-400 group-hover:scale-110 transition-transform" />;
      case 'Building2':
        return <Building2 className="w-7 h-7 text-amber-400 group-hover:scale-110 transition-transform" />;
      case 'FileSignature':
        return <FileSignature className="w-7 h-7 text-amber-400 group-hover:scale-110 transition-transform" />;
      case 'Briefcase':
        return <Briefcase className="w-7 h-7 text-amber-400 group-hover:scale-110 transition-transform" />;
      case 'MessageSquareText':
        return <MessageSquareText className="w-7 h-7 text-amber-400 group-hover:scale-110 transition-transform" />;
      case 'Landmark':
        return <Landmark className="w-7 h-7 text-amber-400 group-hover:scale-110 transition-transform" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-7 h-7 text-amber-400 group-hover:scale-110 transition-transform" />;
      default:
        return <Scale className="w-7 h-7 text-amber-400 group-hover:scale-110 transition-transform" />;
    }
  };

  return (
    <section id="services-section" className="py-24 relative bg-[#050b1a] pattern-legal">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right relative z-10">
        
        {/* Section Header Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a1428] border border-[#c5a059]/30 text-[#d4af37] text-xs font-semibold">
            <Scale className="w-4 h-4 text-[#d4af37]" />
            <span>مجالات الممارسة والخدمات القانونية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-serif tracking-tight">
            خدمات قانونية متكاملة
            <span className="text-[#d4af37] block mt-1">وفق الأنظمة السعودية الحديثة</span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
            نقدم حزمة شاملة من الخدمات القانونية التخصصية المصممة بعناية لحماية مصالح الأفراد والمنشآت وتوفير الحلول القضائية والوقائية الموثوقة.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-[#0a1428] p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden text-right border border-[#c5a059]/30 hover:border-[#d4af37] hover:-translate-y-1 transition-all duration-300 shadow-xl"
            >
              {/* Subtle Top Accent Glow */}
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div>
                {/* Icon Container */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3.5 rounded-xl bg-[#050b1a] border border-[#c5a059]/30 transition-all shadow-md">
                    {getServiceIcon(service.iconName)}
                  </div>
                  
                  <button
                    onClick={() => setSelectedService(service)}
                    className="p-2 text-gray-400 hover:text-[#d4af37] rounded-lg hover:bg-[#050b1a] transition-colors"
                    title="تفاصيل الخدمة"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-[#d4af37] font-serif mb-2 group-hover:text-white transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light mb-6 line-clamp-3">
                  {service.shortDesc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-800 space-y-2">
                <button
                  onClick={() => onBookService(service.title)}
                  className="w-full py-2.5 px-4 bg-[#d4af37] hover:bg-[#c5a059] text-[#050b1a] font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>اطلب استشارة</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-[#050b1a] group-hover:-translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setSelectedService(service)}
                  className="w-full py-1.5 text-[11px] text-gray-400 hover:text-[#d4af37] font-medium transition-colors text-center"
                >
                  استعرض التفاصيل والمتطلبات
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={onBookService}
      />

    </section>
  );
};
