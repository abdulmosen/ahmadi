import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, Scale, ArrowLeft, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookServiceWithCategory: (category: string) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  onBookServiceWithCategory
}) => {
  const [userPrompt, setUserPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resultGuidance, setResultGuidance] = useState<string | null>(null);
  const [recommendedCategory, setRecommendedCategory] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickPrompts = [
    'استفسار عن مكافأة نهاية الخدمة وفق نظام العمل السعودي',
    'تأسيس شركة ذات مسؤولية محدودة وشروط عقد التأسيس',
    'دعوى نفقة وحضانة وفق نظام الأحوال الشخصية الجديد',
    'صياغة ومراجعة عقد توريد أو مقاولة تجارية'
  ];

  const handleAnalyze = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const query = customPrompt || userPrompt;
    if (!query.trim()) return;

    if (customPrompt) setUserPrompt(customPrompt);
    setIsLoading(true);
    setResultGuidance(null);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPrompt: query })
      });

      const data = await res.json();
      if (data.success) {
        setResultGuidance(data.guidance);
        setRecommendedCategory(data.recommendedService || 'الاستشارات القانونية');
      } else {
        setResultGuidance('تعذر التحليل الآلي حالياً، يرجى التواصل المباشر مع مستشارينا لحجز استشارة رسمية.');
      }
    } catch (err) {
      console.error('AI assistant client error:', err);
      setResultGuidance('حدث خطأ في الاتصال، يمكنك حجز استشارة مباشرة عبر النموذج الرئيسي للمكتب.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#050b1a]/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#0a1428] border border-[#c5a059]/40 rounded-3xl shadow-2xl overflow-hidden text-right">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#050b1a] via-[#0a1428] to-[#050b1a] border-b border-[#c5a059]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#050b1a] rounded-2xl border border-[#c5a059]/40 text-[#d4af37] shadow-lg">
              <Sparkles className="w-6 h-6 text-[#d4af37] animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-serif flex items-center gap-2">
                <span>المساعد الذكي للأنظمة السعودية</span>
                <span className="text-xs bg-[#d4af37]/20 text-[#d4af37] px-2 py-0.5 rounded-full border border-[#c5a059]/30">
                  ذكاء اصطناعي
                </span>
              </h2>
              <p className="text-xs text-[#d4af37] mt-0.5 font-medium">
                مشعل سعود الأحمدي للمحاماة والاستشارات القانونية (ترخيص 38694)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-[#d4af37] bg-[#050b1a] rounded-xl border border-gray-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          <div className="p-4 bg-[#050b1a] border border-[#c5a059]/30 rounded-2xl text-xs text-gray-300 leading-relaxed space-y-1">
            <p className="font-bold text-[#d4af37] flex items-center gap-1.5 text-sm">
              <Bot className="w-4 h-4 text-[#d4af37]" />
              <span>مستشارك الذكي لكافة الاستشارات والأنظمة السعودية</span>
            </p>
            <p className="font-light text-gray-300">
              يقدم إجابات متخصصة وتحليلاً نظامياً موجزاً لكافة استفسارات القانون السعودي (نظام العمل، نظام الشركات، المعاملات المدنية، الأحوال الشخصية، والعقود والتمثيل أمام ناجز والمحاكم).
            </p>
          </div>

          {!resultGuidance ? (
            <form onSubmit={(e) => handleAnalyze(e)} className="space-y-4">
              
              {/* Quick Suggestion Pills */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#c5a059] block">
                  أمثلة شائعة يمكنك النقر عليها للاستفسار الفوري:
                </span>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((qp, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAnalyze(undefined, qp)}
                      className="px-3 py-1.5 bg-[#050b1a] hover:bg-[#0a1428] text-xs text-gray-300 hover:text-[#d4af37] rounded-xl border border-gray-800 hover:border-[#c5a059]/40 transition-all text-right cursor-pointer"
                    >
                      {qp}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-gray-200 block">
                  اكتب استفسارك أو موضوعك القانوني بالتفصيل:
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="اكتب هنا استفسارك عن الأنظمة السعودية أو تفاصيل مشكلتك..."
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  className="w-full p-4 bg-[#050b1a] border border-gray-800 focus:border-[#d4af37] rounded-2xl text-gray-100 text-sm focus:outline-none transition-all text-right"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-[#d4af37] hover:bg-[#c5a059] text-[#050b1a] font-bold text-sm rounded-xl shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 text-[#050b1a] animate-spin" />
                    <span>جاري تحليل النص وفق الأنظمة واللوائح السعودية...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#050b1a]" />
                    <span>إرسال الاستفسار والتحليل النظامي الفوري</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-5 bg-[#050b1a] rounded-2xl border border-[#c5a059]/40 space-y-3 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] border-b border-gray-800 pb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>نتائج التحليل والإجابة النظامية السعودية:</span>
                </div>

                <div className="text-xs sm:text-sm text-gray-200 leading-relaxed font-light whitespace-pre-line">
                  {resultGuidance}
                </div>
              </div>

              {recommendedCategory && (
                <div className="p-4 bg-[#050b1a] rounded-2xl border border-[#c5a059]/30 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">القسم الموصى به لمتابعة قضيتك:</p>
                    <p className="text-sm font-bold text-[#d4af37] font-serif">{recommendedCategory}</p>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onBookServiceWithCategory(recommendedCategory);
                    }}
                    className="px-5 py-2.5 bg-[#d4af37] hover:bg-[#c5a059] text-[#050b1a] font-bold text-xs rounded-xl shadow flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>حجز استشارة رسمية</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setResultGuidance(null);
                    setUserPrompt('');
                  }}
                  className="w-full py-2.5 bg-[#050b1a] hover:bg-[#0a1428] text-gray-300 hover:text-[#d4af37] font-semibold text-xs rounded-xl border border-gray-800 hover:border-[#c5a059]/30 transition-all cursor-pointer text-center"
                >
                  طرح استفسار قانوني آخر
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
