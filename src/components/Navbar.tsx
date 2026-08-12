import React, { useState, useEffect } from 'react';
import {
  Scale,
  Menu,
  X,
  Phone,
  ShieldCheck,
  Calendar,
  Globe,
  Lock,
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenAiAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenBooking,
  onOpenAiAssistant
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLangNotice, setShowLangNotice] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'about', label: 'من نحن' },
    { id: 'services', label: 'الخدمات القانونية' },
    { id: 'booking', label: 'حجز استشارة' },
    { id: 'faq', label: 'الأسئلة الشائعة' },
    { id: 'contact', label: 'تواصل معنا' },
    { id: 'admin', label: 'لوحة الإدارة', badge: 'خاص' }
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a1428]/95 backdrop-blur-md border-b border-[#c5a059]/30 py-3 shadow-2xl shadow-black/80'
          : 'bg-gradient-to-b from-[#050b1a]/95 via-[#050b1a]/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & License Badge */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-right cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#8a6d1a] p-0.5 shadow-lg shadow-[#d4af37]/20 group-hover:shadow-[#d4af37]/40 transition-all">
              <div className="w-full h-full bg-[#050b1a] rounded-[10px] flex items-center justify-center">
                <Scale className="w-6 h-6 text-[#d4af37] group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold text-[#d4af37] tracking-tight font-serif leading-none">
                  مشعل سعود الأحمدي
                </span>
              </div>
              <p className="text-xs text-gray-300 font-medium tracking-wide mt-1 flex items-center gap-1">
                <span>للمحاماة والاستشارات القانونية</span>
                <span className="inline-block w-1 h-1 rounded-full bg-[#d4af37]"></span>
                <span className="text-[11px] text-[#c5a059] bg-[#050b1a] px-1.5 py-0.2 rounded border border-[#c5a059]/30">
                  ترخيص: 38694
                </span>
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0a1428] p-1.5 rounded-full border border-[#c5a059]/30 backdrop-blur-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  currentTab === item.id
                    ? 'text-[#d4af37] bg-[#050b1a] shadow-sm border border-[#c5a059]/40'
                    : 'text-gray-300 hover:text-[#d4af37] hover:bg-[#050b1a]/50'
                }`}
              >
                {item.label}
                {item.badge && (
                  <span className="mr-1.5 px-1.5 py-0.2 text-[10px] bg-[#d4af37]/20 text-[#d4af37] rounded-full border border-[#c5a059]/30">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* AI Assistant Pill Button */}
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#0a1428] hover:bg-[#050b1a] text-[#d4af37] border border-[#c5a059]/30 hover:border-[#d4af37] transition-all cursor-pointer shadow-sm group"
              title="استشر المساعد القانوني الذكي للأنظمة السعودية"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] group-hover:rotate-12 transition-transform animate-pulse" />
              <span>المساعد الذكي (الأنظمة السعودية)</span>
            </button>

            {/* Language Switch Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangNotice(!showLangNotice)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-300 hover:text-[#d4af37] rounded-lg bg-[#0a1428] border border-gray-800 hover:border-[#c5a059]/30 transition-all cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>العربية</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
              {showLangNotice && (
                <div className="absolute top-full left-0 mt-2 w-48 p-3 bg-[#0a1428] border border-[#c5a059]/30 rounded-xl shadow-xl text-xs text-gray-300 z-50 animate-in fade-in slide-in-from-top-2">
                  <p className="font-semibold text-[#d4af37] mb-1">اللغة الإنجليزية</p>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    النسخة الإنجليزية من المنصة قيد التجهيز والتطوير حالياً لمواكبة عملائنا المستثمرين بالخارج.
                  </p>
                </div>
              )}
            </div>

            {/* Book Consultation Primary Button */}
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 bg-[#d4af37] hover:bg-[#c5a059] text-[#050b1a] font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#d4af37]/20 flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>احجز استشارة</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenAiAssistant}
              className="p-2 bg-[#0a1428] text-[#d4af37] rounded-xl border border-[#c5a059]/30"
              title="المساعد الذكي"
            >
              <Sparkles className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-gray-200 hover:text-[#d4af37] bg-[#0a1428] rounded-xl border border-gray-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-amber-500/20 px-4 pt-4 pb-6 mt-3 shadow-2xl animate-in slide-in-from-top-3">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-right text-sm font-medium transition-all ${
                  currentTab === item.id
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-amber-300'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-300 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}

            <div className="pt-4 mt-2 border-t border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-center rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                <span>احجز استشارة قانونية الآن</span>
              </button>
              
              <div className="flex items-center justify-between px-3 py-2 bg-slate-900 rounded-lg text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>ترخيص وزارة العدل رقم 38694</span>
                </span>
                <span className="text-amber-400 font-mono">2026 ©</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
