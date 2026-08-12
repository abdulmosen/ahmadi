import React from 'react';
import {
  Scale,
  ShieldCheck,
  Calendar,
  MessageCircle,
  Phone,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Award,
  Building,
  Users
} from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenContact: () => void;
  onOpenAiAssistant: () => void;
  onNavigateServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onOpenContact,
  onOpenAiAssistant,
  onNavigateServices
}) => {
  return (
    <section className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden bg-[#050b1a] pattern-legal">
      
      {/* Subtle Background Lighting & Watermark Gavel/Scales Effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#0a1428] rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Decorative Golden Corner Frames */}
      <div className="absolute top-20 right-8 w-24 h-24 border-r-2 border-t-2 border-[#c5a059]/30 pointer-events-none hidden md:block"></div>
      <div className="absolute bottom-12 left-8 w-24 h-24 border-l-2 border-b-2 border-[#c5a059]/30 pointer-events-none hidden md:block"></div>

      {/* Background Graphic Watermark Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <Scale className="w-[600px] h-[600px] text-[#d4af37]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full text-right">
        
        {/* Top Official License Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0a1428] border border-[#c5a059]/30 text-[#d4af37] text-xs sm:text-sm font-semibold mb-8 backdrop-blur-md shadow-inner">
          <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
          <span>مكتب محاماة واستشارات قانونية مرخص برقم</span>
          <span className="font-mono font-bold text-[#050b1a] bg-[#d4af37] px-2 py-0.5 rounded text-xs border border-[#c5a059]">
            38694
          </span>
          <span className="text-gray-400 hidden sm:inline">| وزارة العدل السعودية</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content (Right Column in RTL) */}
          <div className="lg:col-span-7 space-y-6">
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.2] font-serif tracking-tight">
              نحقق العدالة
              <br />
              <span className="text-[#d4af37] inline-block mt-2">
                ونحمي حقوقك باحترافية
              </span>
            </h1>

            <p className="text-base sm:text-xl text-gray-300 leading-relaxed max-w-2xl font-light">
              خبرة قانونية موثوقة في تقديم الحلول والاستشارات القانونية للأفراد والشركات، وفق أعلى معايير الجودة والسرية التامة.
            </p>

            {/* Main Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              
              {/* Primary: Book Consultation */}
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 bg-[#d4af37] hover:bg-[#c5a059] text-[#050b1a] font-bold text-base rounded-md shadow-xl shadow-[#d4af37]/20 hover:scale-105 transition-all flex items-center gap-3 cursor-pointer group"
              >
                <Calendar className="w-5 h-5 text-[#050b1a]" />
                <span>احجز استشارة</span>
                <ArrowLeft className="w-4 h-4 text-[#050b1a] group-hover:-translate-x-1 transition-transform" />
              </button>

              {/* Secondary: Contact Now */}
              <button
                onClick={onOpenContact}
                className="px-7 py-4 bg-[#0a1428] hover:bg-[#050b1a] text-white font-semibold text-base rounded-md border border-gray-700 hover:border-[#d4af37] hover:scale-105 transition-all flex items-center gap-3 cursor-pointer shadow-lg"
              >
                <Phone className="w-5 h-5 text-[#d4af37]" />
                <span>تواصل الآن</span>
              </button>

              {/* Tertiary: Interactive AI Assistant */}
              <button
                onClick={onOpenAiAssistant}
                className="px-5 py-4 bg-[#0a1428] hover:bg-[#050b1a] text-[#d4af37] font-semibold text-sm rounded-md border border-[#c5a059]/40 hover:border-[#d4af37] transition-all flex items-center gap-2 cursor-pointer shadow-lg group"
              >
                <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse group-hover:scale-125 transition-transform" />
                <span>المساعد الذكي (الأنظمة والاستشارات السعودية) 🤖</span>
              </button>

            </div>

            {/* Quick Guarantees Checklist */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-gray-800/80 text-xs sm:text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>التزام تام بالسرية المهنية</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>تمثيل قضائي معتمد</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>سرعة في الرد والمتابعة</span>
              </div>
            </div>

          </div>

          {/* Left Visual Emblem & Stats Card (Left Column in RTL) */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Luxury Frame Card */}
            <div className="relative bg-[#0a1428] p-8 rounded-2xl overflow-hidden shadow-2xl border border-[#c5a059]/30 text-right space-y-6">
              
              <div className="flex items-center justify-between border-b border-gray-800 pb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#d4af37] font-serif">
                    مشعل سعود الأحمدي
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    للمحاماة والاستشارات القانونية (ترخيص 38694)
                  </p>
                </div>
                <div className="p-3 bg-[#050b1a] rounded-xl border border-[#c5a059]/30">
                  <Scale className="w-8 h-8 text-[#d4af37]" />
                </div>
              </div>

              {/* Founder Statement Quote */}
              <blockquote className="text-sm text-gray-300 italic leading-relaxed border-r-2 border-[#d4af37] pr-4 my-2">
                "نعمل على صون الحقوق وتقديم الحلول القانونية المبتكرة التي تسهم في حماية استثمارات وتطلعات عميلنا بصدق وأمانة."
              </blockquote>

              {/* Stats Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#050b1a] rounded-xl border border-gray-800 text-center">
                  <p className="text-2xl font-black text-[#d4af37] font-serif">+1,200</p>
                  <p className="text-xs text-gray-400 font-medium mt-1">قضية واستشارة ناجحة</p>
                </div>
                <div className="p-4 bg-[#050b1a] rounded-xl border border-gray-800 text-center">
                  <p className="text-2xl font-black text-[#d4af37] font-serif">100%</p>
                  <p className="text-xs text-gray-400 font-medium mt-1">سرية وثقة مطلقة</p>
                </div>
              </div>

              {/* Explore Services Quick Link */}
              <button
                onClick={onNavigateServices}
                className="w-full py-3 bg-[#050b1a] hover:bg-[#050b1a]/80 text-[#d4af37] text-xs font-semibold rounded-xl border border-[#c5a059]/30 hover:border-[#d4af37] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>استعرض كافة الخدمات القانونية</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>

            </div>

            {/* Floating Badge Badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#0a1428] p-4 rounded-xl border border-[#c5a059]/40 shadow-2xl flex items-center gap-3 hidden sm:flex">
              <div className="p-2.5 bg-[#050b1a] rounded-lg text-[#d4af37] border border-[#c5a059]/30">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">خبرة قانونية راسخة</p>
                <p className="text-[11px] text-[#d4af37]">ترافع محترف في جميع المحاكم</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
