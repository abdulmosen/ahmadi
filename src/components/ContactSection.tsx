import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Building,
  CheckCircle2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormName('');
      setFormPhone('');
      setFormMessage('');
    }, 4000);
  };

  return (
    <section id="contact-section" className="py-24 relative bg-slate-900 border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right relative z-10 space-y-12">
        
        {/* Section Header Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Phone className="w-4 h-4 text-amber-400" />
            <span>تواصل معنا وقنوات الخدمة</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-100 font-serif">
            يسعدنا استقبال استفساراتكم
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            تواصل مباشر مع مستشاري مشعل سعود الأحمدي للمحاماة، أو قم بزيارتنا في مقر المكتب بالرياض.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details Grid (Column 1 to 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone Card */}
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex items-start gap-4">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/30 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100 font-serif">رقم الاتصال الموحد</h4>
                <p className="text-xs text-slate-400 mt-1">للاتصال المباشر وحجز الاستشارات الهاتفية</p>
                <a href="tel:+966500003869" className="text-sm font-mono font-bold text-amber-400 hover:underline block mt-2" dir="ltr">
                  +966 50 000 3869
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex items-start gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/30 shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100 font-serif">الواتساب المباشر</h4>
                <p className="text-xs text-slate-400 mt-1">تواصل فوري مع المساعد القانوني عبر WhatsApp</p>
                <a
                  href="https://wa.me/966500003869"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-400 hover:underline inline-flex items-center gap-1 mt-2"
                >
                  <span>محادثة واتساب مباشرة</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex items-start gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/30 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100 font-serif">البريد الإلكتروني الرسمي</h4>
                <p className="text-xs text-slate-400 mt-1">للمراسلات الرسمية والعقود وملفات القضايا</p>
                <a href="mailto:info@al-ahmadi-law.sa" className="text-xs font-mono font-semibold text-blue-300 hover:underline block mt-2" dir="ltr">
                  info@al-ahmadi-law.sa
                </a>
              </div>
            </div>

            {/* Address & Hours */}
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">العنوان والموقع الجغرافي:</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    طريق الملك فهد، حي الصحافة، الرياض - المملكة العربية السعودية
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-900">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">أوقات العمل الرسمية:</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    الأحد - الخميس: من الساعة 8:30 صباحاً حتى 5:30 مساءً
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Contact Form + Google Maps Placeholder (Column 6 to 12) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Contact Form */}
            <div className="card-luxury p-8 rounded-3xl border border-amber-500/30 shadow-2xl space-y-6">
              <h3 className="text-xl font-bold text-slate-100 font-serif border-b border-slate-800 pb-4">
                تواصل سريع وسري
              </h3>

              {submitted ? (
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <p className="text-sm font-bold text-emerald-300">تم استلام استفسارك بنجاح!</p>
                  <p className="text-xs text-slate-300">سيقوم فريقنا بالتواصل معك هاتفياً في أقرب وقت.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300 block">الاسم الكامل *</label>
                      <input
                        type="text"
                        required
                        placeholder="الاسم"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300 block">رقم الجوال *</label>
                      <input
                        type="tel"
                        required
                        placeholder="05XXXXXXXX"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 block">نص الرسالة أو الاستفسار</label>
                    <textarea
                      rows={3}
                      placeholder="كيف يمكننا مساعدتك..."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>إرسال الاستفسار السريع</span>
                  </button>
                </form>
              )}
            </div>

            {/* Google Maps Visual Card */}
            <div className="rounded-3xl border border-slate-800 overflow-hidden relative shadow-xl h-64 bg-slate-950 flex flex-col justify-between p-6">
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-full border border-amber-500/30 text-xs text-amber-300 font-semibold">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>مقر المكتب الرئيسي - الرياض</span>
                </div>

                <a
                  href="https://maps.google.com/?q=King+Fahd+Road+Riyadh+Saudi+Arabia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <span>افتح في Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Decorative Map Pattern Graphic */}
              <div className="absolute inset-0 pattern-legal opacity-20 pointer-events-none"></div>

              <div className="relative z-10 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
                <p className="text-xs font-bold text-slate-100">مكتب مشعل بن سعود الأحمد للمحاماة والاستشارات القانونية</p>
                <p className="text-[11px] text-slate-400">طريق الملك فهد - حي الصحافة - الرياض - ترخيص 38694</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
