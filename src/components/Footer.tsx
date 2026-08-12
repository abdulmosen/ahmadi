import React from 'react';
import {
  Scale,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenTerms
}) => {
  return (
    <footer className="bg-[#050b1a] border-t border-[#c5a059]/30 text-gray-300 text-right pt-16 pb-12 relative overflow-hidden">
      
      {/* Subtle Lighting */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Bio & Logo (Lg col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#0a1428] rounded-xl border border-[#c5a059]/30">
                <Scale className="w-7 h-7 text-[#d4af37]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#d4af37] font-serif">
                  مشعل سعود الأحمدي
                </h3>
                <p className="text-xs text-gray-300 font-medium">
                  للمحاماة والاستشارات القانونية - ترخيص 38694
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-light">
              مكتب محاماة سعودي مرخص يقدم حلولاً واستشارات قانونية متكاملة للأفراد والشركات، بأعلى معايير الجودة والاحترافية والسرية المطلقة.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>مرخص من وزارة العدل والهيئة السعودية للمحامين</span>
            </div>
          </div>

          {/* Col 2: Quick Links (Lg col 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-[#d4af37] font-serif border-b border-gray-800 pb-2">
              روابط سريعة
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#d4af37] transition-colors cursor-pointer flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-[#d4af37]" />
                  <span>الرئيسية</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#d4af37] transition-colors cursor-pointer flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-[#d4af37]" />
                  <span>من نحن</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#d4af37] transition-colors cursor-pointer flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-[#d4af37]" />
                  <span>الخدمات القانونية</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('booking')} className="hover:text-[#d4af37] transition-colors cursor-pointer flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-[#d4af37]" />
                  <span>حجز استشارة</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#d4af37] transition-colors cursor-pointer flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-[#d4af37]" />
                  <span>الأسئلة الشائعة</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal Services (Lg col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-[#d4af37] font-serif border-b border-gray-800 pb-2">
              التخصصات والخدمات
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>القضايا العامة والترافع القضائي</li>
              <li>الأحوال الشخصية والمواريث والتركات</li>
              <li>القضايا التجارية ونزاعات الشركات</li>
              <li>إعداد ومراجعة العقود والاتفاقيات</li>
              <li>القضايا العمالية وحقوق الموظفين</li>
              <li>تأسيس الشركات والاستثمار الأجنبي</li>
            </ul>
          </div>

          {/* Col 4: Contact Info (Lg col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-[#d4af37] font-serif border-b border-gray-800 pb-2">
              معلومات التواصل
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href="tel:+966500003869" className="hover:text-[#d4af37] font-mono" dir="ltr">+966 50 000 3869</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href="mailto:info@al-ahmadi-law.sa" className="hover:text-[#d4af37] font-mono" dir="ltr">info@al-ahmadi-law.sa</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>الرياض - طريق الملك فهد - حي الصحافة</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyrights & Policy links */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="text-center sm:text-right">
            جميع الحقوق محفوظة © 2026 لـ مشعل سعود الأحمدي للمحاماة والاستشارات القانونية | ترخيص رقم <span className="font-mono text-[#d4af37] font-bold">38694</span>
          </p>

          <div className="flex items-center gap-4">
            <button onClick={onOpenPrivacy} className="hover:text-[#d4af37] transition-colors cursor-pointer">
              سياسة الخصوصية
            </button>
            <span>•</span>
            <button onClick={onOpenTerms} className="hover:text-[#d4af37] transition-colors cursor-pointer">
              الشروط والأحكام
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
