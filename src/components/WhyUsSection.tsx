import React from 'react';
import {
  ShieldCheck,
  Lock,
  Clock,
  BookOpenCheck,
  Sliders,
  Activity,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const pillars = [
    {
      id: 1,
      title: 'الاحترافية',
      desc: 'العمل وفق أعلى المعايير المهنية والقواعد النظامية المعتمدة في المملكة العربية السعودية.',
      icon: ShieldCheck,
      badge: 'جودة المعايير'
    },
    {
      id: 2,
      title: 'السرية',
      desc: 'حماية كاملة ومحاطة بالسرية التامة لكافة بيانات العميل ومستنداته وفق لائحة سلوك المحامين.',
      icon: Lock,
      badge: 'ثقة وأمان'
    },
    {
      id: 3,
      title: 'سرعة الاستجابة',
      desc: 'فريق استشاري مباشر يتجاوب مع القضايا والطلبات العاجلة بمرونة وفعالية عالية.',
      icon: Clock,
      badge: 'تواصل فوري'
    },
    {
      id: 4,
      title: 'الخبرة القانونية',
      desc: 'فريق متمكن يجمع بين الفقه القضائي الميداني والتطبيق العصري للأنظمة السعودية المحدثة.',
      icon: BookOpenCheck,
      badge: 'ترافع متمرس'
    },
    {
      id: 5,
      title: 'حلول مخصصة لكل عميل',
      desc: 'دراسة دقيقة ودقيقة للوقائع لتقديم استراتيجية قانونية مفصلة تتناسب مع ظروف القضية.',
      icon: Sliders,
      badge: 'تحليل دقيق'
    },
    {
      id: 6,
      title: 'متابعة مستمرة للقضايا',
      desc: 'تزويد العميل بتقارير دورية وإشعارات فورية بكل مستجدات الجلسات والإجراءات عبر ناجز.',
      icon: Activity,
      badge: 'شفافية كاملة'
    }
  ];

  return (
    <section className="py-24 relative bg-[#050b1a] pattern-legal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a1428] border border-[#c5a059]/30 text-[#d4af37] text-xs font-semibold">
            <CheckCircle className="w-4 h-4 text-[#d4af37]" />
            <span>مزايانا الجوهرية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-serif tracking-tight">
            لماذا يختار العملاء
            <span className="text-[#d4af37] block mt-1">مشعل سعود الأحمدي للمحاماة؟</span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
            نضع مصلحة العميل وحماية حقوقه على رأس أولوياتنا، عبر ركائز قانونية متينة تضمن الأمان القضائي والراحة النفسية.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="group bg-[#0a1428] p-8 rounded-2xl relative overflow-hidden border border-[#c5a059]/30 hover:border-[#d4af37] hover:-translate-y-1 transition-all duration-300 shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 rounded-xl bg-[#050b1a] border border-[#c5a059]/30 group-hover:bg-[#050b1a]/80 transition-all shadow-lg">
                    <Icon className="w-7 h-7 text-[#d4af37]" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#d4af37] bg-[#050b1a] px-3 py-1 rounded-full border border-[#c5a059]/30">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#d4af37] font-serif mb-3 group-hover:text-white transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
