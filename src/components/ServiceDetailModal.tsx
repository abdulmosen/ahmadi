import React from 'react';
import { LegalService } from '../types';
import {
  X,
  CheckCircle,
  FileText,
  Clock,
  ArrowLeft,
  ShieldAlert,
  HelpCircle,
  Calendar,
  Scale,
  HeartHandshake,
  Building2,
  FileSignature,
  Briefcase,
  MessageSquareText,
  Landmark,
  ShieldCheck
} from 'lucide-react';

interface ServiceDetailModalProps {
  service: LegalService | null;
  onClose: () => void;
  onBookService: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService
}) => {
  if (!service) return null;

  const getIcon = (name: string) => {
    switch (name) {
      case 'Scale': return <Scale className="w-8 h-8 text-amber-400" />;
      case 'HeartHandshake': return <HeartHandshake className="w-8 h-8 text-amber-400" />;
      case 'Building2': return <Building2 className="w-8 h-8 text-amber-400" />;
      case 'FileSignature': return <FileSignature className="w-8 h-8 text-amber-400" />;
      case 'Briefcase': return <Briefcase className="w-8 h-8 text-amber-400" />;
      case 'MessageSquareText': return <MessageSquareText className="w-8 h-8 text-amber-400" />;
      case 'Landmark': return <Landmark className="w-8 h-8 text-amber-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-amber-400" />;
      default: return <Scale className="w-8 h-8 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden my-8 text-right">
        
        {/* Header Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-amber-500/20 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/30 shadow-inner">
              {getIcon(service.iconName)}
            </div>
            <div>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-300 rounded-full text-xs font-semibold border border-amber-500/20">
                خدمة قانونية معتمدة
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 font-serif mt-1">
                {service.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 text-slate-400 hover:text-amber-400 bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
          
          {/* Overview Description */}
          <div>
            <h3 className="text-lg font-bold text-amber-400 font-serif mb-2">
              الوصف الشامل للخدمة
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-light">
              {service.fullDesc}
            </p>
          </div>

          {/* Features Grid */}
          <div className="p-6 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-slate-200 font-serif flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-amber-400" />
              <span>نطاق العمل والخدمات الفرعية</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300 pt-2">
              {service.features.map((feat, index) => (
                <div key={index} className="flex items-center gap-2.5 bg-slate-900 p-3 rounded-xl border border-slate-800/80">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents & Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Required Documents */}
            <div className="p-5 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>المستندات والوثائق المطلوبة</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {service.requiredDocs.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Process Timeline */}
            <div className="p-5 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>مراحل وسير العمل القضائي</span>
              </h4>
              <ol className="space-y-2.5 text-xs text-slate-300">
                {service.processSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[11px] flex items-center justify-center shrink-0 border border-amber-500/30">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

          </div>

          {/* FAQs per service */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-200 font-serif flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <span>أسئلة شائعة حول هذه الخدمة</span>
              </h3>
              <div className="space-y-3">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 bg-slate-950/40 rounded-xl border border-slate-800/80">
                    <p className="text-xs font-bold text-amber-300 mb-1">{faq.question}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Action Footer */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>يتم دراسة ملفك تحت معايير السرية المهنية والترخيص رقم 38694</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookService(service.title);
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Calendar className="w-4 h-4 text-slate-950" />
            <span>اطلب استشارة لهذه الخدمة</span>
            <ArrowLeft className="w-4 h-4 text-slate-950" />
          </button>
        </div>

      </div>
    </div>
  );
};
