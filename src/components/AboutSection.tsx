import React from 'react';
import {
  Scale,
  ShieldCheck,
  Award,
  BookOpen,
  CheckCircle2,
  Building,
  Check,
  FileCheck2,
  Compass
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-24 relative bg-[#0a1428] border-y border-[#c5a059]/20 overflow-hidden">
      
      {/* Background Subtle Accent */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Side (Left in RTL, Column 1 to 5) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/30 shadow-2xl group">
              
              {/* High Quality Modern Law Firm Architectural Image */}
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
                alt="مشعل سعود الأحمدي للمحاماة والاستشارات القانونية"
                className="w-full h-[450px] object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#050b1a] via-[#050b1a]/40 to-transparent"></div>

              {/* Bottom Card Overlay inside Image */}
              <div className="absolute bottom-6 right-6 left-6 p-5 bg-[#050b1a] rounded-xl border border-[#c5a059]/30 text-right">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#0a1428] rounded-lg text-[#d4af37] border border-[#c5a059]/30 shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-serif">
                      ترخيص المحاماة رقم 38694
                    </h4>
                    <p className="text-xs text-[#d4af37] font-medium">
                      وزارة العدل - الهيئة السعودية للمحامين
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Decorative Floating Pill */}
            <div className="absolute -top-5 -left-5 bg-[#050b1a] p-4 rounded-xl border border-[#c5a059]/40 shadow-xl hidden sm:flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#d4af37]" />
              <span className="text-xs font-bold text-gray-200">التزام مطلق بالأمانة والسرية</span>
            </div>
          </div>

          {/* Text Content Side (Right in RTL, Column 6 to 12) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#050b1a] border border-[#c5a059]/30 text-[#d4af37] text-xs font-semibold">
              <Compass className="w-4 h-4 text-[#d4af37]" />
              <span>عن المكتب ورسالته القانونية</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight leading-tight">
              مشعل سعود الأحمدي
              <span className="text-[#d4af37] block mt-1">للمحاماة والاستشارات القانونية</span>
            </h2>

            {/* Required Bio Paragraph */}
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-light bg-[#050b1a] p-6 rounded-xl border-r-4 border-[#d4af37] border-y border-l border-gray-800">
              "مشعل سعود الأحمدي للمحاماة والاستشارات القانونية يقدم خدمات قانونية متكاملة للأفراد والشركات، ويعمل على تقديم الحلول القانونية بكفاءة واحترافية، مع الالتزام بالسرية والمصداقية وحماية مصالح العملاء."
            </p>

            <p className="text-sm text-gray-300 leading-relaxed font-light">
              نحن نؤمن بأن المحاماة ليست مجرد ترافع أمام القضاء، بل هي شراكة استراتيجية تبدأ بالوقاية القانونية والدراسة الشاملة للأنظمة السعودية المحدثة، وتأطير الاتفاقيات التجارية والأسرية بما يحول دون النزاع ويضمن الاستقرار المستدام.
            </p>

            {/* Core Values Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#050b1a] rounded-xl border border-gray-800 flex items-start gap-3">
                <Check className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">رؤيتنا القانونية</h4>
                  <p className="text-xs text-gray-400">الريادة في تقديم الخدمة القضائية وفق المعايير العالمية والأنظمة السعودية.</p>
                </div>
              </div>

              <div className="p-4 bg-[#050b1a] rounded-xl border border-gray-800 flex items-start gap-3">
                <Check className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">رسالتنا مع العملاء</h4>
                  <p className="text-xs text-gray-400">حماية حقوق العميل وتأمين مسيرته الاستثمارية أو الشخصية بشفافية كاملة.</p>
                </div>
              </div>
            </div>

            {/* License Stamp Footer */}
            <div className="pt-4 flex items-center justify-between border-t border-gray-800 text-xs text-gray-400">
              <span>المدير العام: المحامي مشعل سعود الأحمدي</span>
              <span className="text-[#d4af37] font-mono">الرياض - المملكة العربية السعودية</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
