import React from 'react';
import { X, ShieldCheck, Lock } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 text-right max-h-[85vh] overflow-y-auto">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-amber-400">
            <ShieldCheck className="w-6 h-6" />
            <h2 className="text-xl font-bold font-serif text-slate-100">سياسة الخصوصية والسرية المهنية</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-amber-400 bg-slate-800 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          <p className="font-bold text-amber-300">مشعل سعود الأحمدي للمحاماة والاستشارات القانونية (ترخيص رقم 38694):</p>
          
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-200">1. السرية المطلقة</h4>
            <p>تخضع جميع الاستشارات والمستندات والبيانات المقدمة من العميل لحظر الإفشاء والسرية المهنية المطلقة وفقاً لنظام المحاماة السعودي ولائحته التنفيذية وقواعد سلوك المحامين.</p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-200">2. جمع واستخدام البيانات</h4>
            <p>يتم استخدام البيانات المدخلة في نماذج الحجز حصراً لأغراض التواصل والدراسة القانونية وتحديد المواعيد، ولا يتم مشاركتها مطلقاً مع أي طرف ثالث خارج النطاق القضائي المعتمد.</p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-200">3. حماية المستندات المرفقة</h4>
            <p>تتم مشفرة المرفقات والوثائق المرفوعة عبر منصتنا الإلكترونية وتخزينها في بيئة سحابية آمنة خاضعة لمعايير الأمن السيبراني بالمملكة العربية السعودية.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export const TermsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 text-right max-h-[85vh] overflow-y-auto">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-amber-400">
            <Lock className="w-6 h-6" />
            <h2 className="text-xl font-bold font-serif text-slate-100">الشروط والأحكام لاستخدام المنصة</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-amber-400 bg-slate-800 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          <p className="font-bold text-amber-300">مشعل سعود الأحمدي للمحاماة والاستشارات القانونية:</p>
          
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-200">1. طبيعة الاستشارة والمواعيد</h4>
            <p>يعتبر طلب الاستشارة المرفوع عبر المنصة حجزاً مبدئياً يتم تأكيده بعد المراجعة المباشرة من الفريق المختص وتأكيد الموعد هاتفياً أو عبر البريد.</p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-200">2. الوكالات والتمثيل القضائي</h4>
            <p>لا يرتب مجرد إرسال الطلب أي عقد وكالة قضائية أو تمثيل رسمي أمام المحاكم إلا بعد إبرام اتفاقية الأتعاب والوكالة الإلكترونية الموثقة عبر منصة ناجز التابعة لوزارة العدل.</p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-200">3. الملكية الفكرية</h4>
            <p>جميع النصوص والمواد القانونية المنشورة بالمنصة هي ملك فكري حصري لـ مشعل سعود الأحمدي للمحاماة والاستشارات القانونية (ترخيص 38694).</p>
          </div>
        </div>

      </div>
    </div>
  );
};
