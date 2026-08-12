import React, { useState } from 'react';
import { FAQItem } from '../types';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare } from 'lucide-react';

interface FaqSectionProps {
  faqs: FAQItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'كافة الأسئلة' },
    { id: 'general', label: 'حجز الاستشارة' },
    { id: 'methods', label: 'طريقة التقديم' },
    { id: 'privacy', label: 'السرية والأمان' },
    { id: 'documents', label: 'المستندات المطلوب' },
    { id: 'tracking', label: 'متابعة الطلب' }
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === 'all' || faq.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-24 relative bg-[#0a1428] border-y border-[#c5a059]/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-right relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#050b1a] border border-[#c5a059]/30 text-[#d4af37] text-xs font-semibold">
            <HelpCircle className="w-4 h-4 text-[#d4af37]" />
            <span>الأسئلة الأكثر تكراراً</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-serif">
            الأسئلة الشائعة والإجابات القانونية
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
            إجابات واضحة ومباشرة لأبرز التساؤلات المتعلقة بآلية الاستشارة والخصوصية وتجهيز ملفات القضايا.
          </p>
        </div>

        {/* Filter Tabs & Search */}
        <div className="space-y-4">
          
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5" />
            <input
              type="text"
              placeholder="ابحث عن سؤالك هنا..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-3 bg-[#050b1a] border border-gray-800 focus:border-[#d4af37] rounded-xl text-xs text-white focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#050b1a] text-[#d4af37] border border-[#c5a059]/40'
                    : 'bg-[#050b1a]/60 text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Accordions List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-gray-400 bg-[#050b1a] rounded-xl border border-gray-800">
              لم نجد نتائج تطابق بحثك. يسعدنا التواصل المباشر للإجابة على استفسارك.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-[#050b1a] border-[#c5a059]/40 shadow-xl'
                      : 'bg-[#050b1a]/60 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 text-right font-bold text-sm sm:text-base text-white flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#d4af37] shrink-0"></span>
                      <span>{faq.question}</span>
                    </span>
                    <div className="p-1.5 rounded-lg bg-[#0a1428] text-[#d4af37] shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-gray-300 leading-relaxed font-light border-t border-gray-800 animate-in fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
