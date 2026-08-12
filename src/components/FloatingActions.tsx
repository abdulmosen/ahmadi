import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Mail, Calendar, ArrowUp, Sparkles } from 'lucide-react';

interface FloatingActionsProps {
  onOpenBooking: () => void;
  onOpenAiAssistant?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenBooking,
  onOpenAiAssistant
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-center gap-3">
      
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="p-3 bg-[#0a1428] hover:bg-[#050b1a] text-[#d4af37] rounded-full border border-[#c5a059]/30 shadow-2xl transition-all cursor-pointer hover:scale-110"
          title="للأعلى"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating AI Assistant Trigger Button */}
      {onOpenAiAssistant && (
        <button
          onClick={onOpenAiAssistant}
          className="p-3.5 bg-gradient-to-br from-[#d4af37] via-amber-500 to-[#8a6d1a] text-[#050b1a] rounded-full shadow-2xl shadow-[#d4af37]/40 transition-all cursor-pointer hover:scale-115 group relative animate-bounce"
          title="المساعد الذكي للأنظمة السعودية"
        >
          <Sparkles className="w-6 h-6 text-[#050b1a]" />
          <span className="absolute right-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#0a1428] text-[#d4af37] text-xs font-bold rounded-xl border border-[#c5a059]/50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl">
            🤖 المساعد الذكي للأنظمة السعودية
          </span>
        </button>
      )}

      {/* Quick Booking Button */}
      <button
        onClick={onOpenBooking}
        className="p-3 bg-[#0a1428] hover:bg-[#050b1a] text-[#d4af37] rounded-full border border-[#c5a059]/40 shadow-2xl transition-all cursor-pointer hover:scale-110 group relative"
        title="احجز استشارة"
      >
        <Calendar className="w-6 h-6" />
        <span className="absolute right-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#0a1428] text-[#d4af37] text-xs font-bold rounded-lg border border-[#c5a059]/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          احجز استشارة
        </span>
      </button>

      {/* Phone Call */}
      <a
        href="tel:+966500003869"
        className="p-3 bg-slate-900 hover:bg-slate-800 text-amber-400 rounded-full border border-amber-500/30 shadow-2xl transition-all cursor-pointer hover:scale-110 group relative"
        title="اتصال مباشر"
      >
        <Phone className="w-6 h-6" />
        <span className="absolute right-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-950 text-slate-200 text-xs font-bold rounded-lg border border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          اتصال هاتف
        </span>
      </a>

      {/* Email */}
      <a
        href="mailto:info@al-ahmadi-law.sa"
        className="p-3 bg-slate-900 hover:bg-slate-800 text-blue-400 rounded-full border border-blue-500/30 shadow-2xl transition-all cursor-pointer hover:scale-110 group relative"
        title="إرسال بريد"
      >
        <Mail className="w-6 h-6" />
        <span className="absolute right-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-950 text-slate-200 text-xs font-bold rounded-lg border border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          بريد إلكتروني
        </span>
      </a>

      {/* WhatsApp Floating */}
      <a
        href="https://wa.me/966500003869"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-600/40 transition-all cursor-pointer hover:scale-110 group relative"
        title="محادثة الواتساب"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-emerald-950 text-emerald-300 text-xs font-bold rounded-lg border border-emerald-500/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          واتساب مباشر
        </span>
      </a>

    </div>
  );
};
