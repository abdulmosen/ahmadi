import React from 'react';
import {
  Zap,
  Award,
  UserCheck,
  Lock
} from 'lucide-react';

export const FeaturesBar: React.FC = () => {
  const features = [
    {
      id: 1,
      title: 'حلول قانونية فعالة',
      desc: 'استراتيجيات ودراسات قضائية مدروسة تحقق النتائج المرجوة بعناية.',
      icon: Zap,
      color: 'from-amber-400 to-amber-600'
    },
    {
      id: 2,
      title: 'خبرة واسعة',
      desc: 'معرفة عميقة بالأنظمة السعودية والسوابق القضائية في مختلف المحاكم.',
      icon: Award,
      color: 'from-yellow-400 to-amber-500'
    },
    {
      id: 3,
      title: 'استشارات احترافية',
      desc: 'رأي قانوني سديد يوضح الموقف والمخاطر وطريقة التعامل الصحيحة.',
      icon: UserCheck,
      color: 'from-amber-300 to-yellow-600'
    },
    {
      id: 4,
      title: 'سرية تامة',
      desc: 'التزام مطلق بحماية خصوصية العميل وجميع بياناته ومستنداته.',
      icon: Lock,
      color: 'from-yellow-500 to-amber-700'
    }
  ];

  return (
    <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#0a1428] backdrop-blur-xl rounded-2xl border border-[#c5a059]/30 p-6 shadow-2xl shadow-black/80 gold-glow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-gray-800">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`flex items-start gap-4 text-right pt-4 sm:pt-0 ${
                  idx !== 0 ? 'sm:pr-6' : ''
                }`}
              >
                <div className="p-3.5 rounded-xl bg-[#050b1a] text-[#d4af37] border border-[#c5a059]/30 shadow-md shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#d4af37] font-serif mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
