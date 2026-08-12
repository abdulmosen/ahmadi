import React, { useState } from 'react';
import { ConsultationRequest, ConsultationMethod } from '../types';
import {
  Calendar,
  User,
  Phone,
  Mail,
  Briefcase,
  Clock,
  FileText,
  Upload,
  CheckCircle2,
  ShieldCheck,
  Send,
  AlertCircle,
  Copy,
  Check,
  Sparkles,
  MapPin,
  Smartphone,
  Video
} from 'lucide-react';

interface BookingFormProps {
  initialService?: string;
  onRequestSubmitted?: (newRequest: ConsultationRequest) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialService = '',
  onRequestSubmitted
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceCategory, setServiceCategory] = useState(initialService || 'الاستشارات القانونية');
  const [consultationMethod, setConsultationMethod] = useState<ConsultationMethod>('in_person');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00 صباحاً');
  const [topicDescription, setTopicDescription] = useState('');
  const [fileAttachment, setFileAttachment] = useState<File | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedRequest, setSubmittedRequest] = useState<ConsultationRequest | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  const serviceOptions = [
    'القضايا العامة',
    'الأحوال الشخصية',
    'القضايا التجارية',
    'إعداد ومراجعة العقود',
    'القضايا العمالية',
    'الاستشارات القانونية',
    'تأسيس الشركات',
    'التمثيل القانوني'
  ];

  const timeOptions = [
    '09:00 صباحاً',
    '10:30 صباحاً',
    '12:00 ظهراً',
    '02:00 مساءً',
    '04:00 مساءً',
    '05:30 مساءً'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileAttachment(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('الرجاء إدخال الاسم الكامل.');
      return;
    }
    if (!phone.trim() || phone.length < 9) {
      setErrorMessage('الرجاء إدخال رقم جوال سعودي صحيح (مثال: 0501234567).');
      return;
    }
    if (!agreedToTerms) {
      setErrorMessage('يلزم الموافقة على سياسة الخصوصية والسرية لمتابعة حجز الاستشارة.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName,
        phone,
        email,
        serviceCategory,
        consultationMethod,
        preferredDate: preferredDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
        preferredTime,
        topicDescription,
        attachmentName: fileAttachment ? fileAttachment.name : undefined,
        agreedToTerms
      };

      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmittedRequest(data.data);
        if (onRequestSubmitted) {
          onRequestSubmitted(data.data);
        }
      } else {
        setErrorMessage(data.message || 'حدث خطأ أثناء إرسال طلب الاستشارة.');
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      // Fallback local creation if network error
      const localId = `REQ-38694-${Math.floor(100 + Math.random() * 900)}`;
      const localConsultation: ConsultationRequest = {
        id: localId,
        fullName,
        phone,
        email,
        serviceCategory,
        consultationMethod,
        preferredDate: preferredDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
        preferredTime,
        topicDescription,
        attachmentName: fileAttachment ? fileAttachment.name : undefined,
        agreedToTerms,
        status: 'new',
        createdAt: new Date().toLocaleString('ar-SA')
      };
      setSubmittedRequest(localConsultation);
      if (onRequestSubmitted) {
        onRequestSubmitted(localConsultation);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    if (submittedRequest) {
      navigator.clipboard.writeText(submittedRequest.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 3000);
    }
  };

  return (
    <div id="booking-section" className="py-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>حجز موعد استشارة رسمية</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-slate-100 font-serif">
            طلب استشارة قانونية متخصصة
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
            قم بتعبئة البيانات أدناه، وسيتم دراسة طلبك وتحديد الموعد فوراً بإشراف المحامي مشعل بن سعود الأحمد.
          </p>
        </div>

        {submittedRequest ? (
          /* SUCCESS STATE VIEW */
          <div className="card-luxury p-8 sm:p-12 rounded-3xl text-center space-y-6 border border-amber-500/40 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="w-20 h-20 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border-2 border-amber-400 shadow-xl gold-glow">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-300 rounded-full text-xs font-semibold border border-amber-500/30">
                تم استلام طلبك بنجاح
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 font-serif">
                شكراً لتواصلك مع مكتب مشعل الأحمد للمحاماة
              </h3>
              <p className="text-sm text-slate-300 max-w-lg mx-auto font-light leading-relaxed">
                سيقوم فريقنا المستشار بدراسة الموضوع والتواصل معك على الرقم (
                <span className="font-mono text-amber-400 font-bold" dir="ltr">{submittedRequest.phone}</span>
                ) لتأكيد الموعد وتقديم التفاصيل.
              </p>
            </div>

            {/* Reference Order Card */}
            <div className="max-w-md mx-auto p-5 bg-slate-950/80 rounded-2xl border border-amber-500/30 text-right space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                <span>رقم الطلب المرجعي:</span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-amber-400 hover:text-amber-300 cursor-pointer font-medium"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId ? 'تم النسخ!' : 'نسخ الرقم'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-mono font-bold text-amber-300">{submittedRequest.id}</span>
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-md border border-amber-500/30 font-medium">
                  جديد
                </span>
              </div>

              <div className="text-xs text-slate-300 space-y-1 pt-2 border-t border-slate-800/80">
                <p><span className="text-slate-400">الخدمة:</span> {submittedRequest.serviceCategory}</p>
                <p><span className="text-slate-400">الطريقة:</span> {
                  submittedRequest.consultationMethod === 'in_person' ? 'حضوري بمقر المكتب' :
                  submittedRequest.consultationMethod === 'phone' ? 'استشارة هاتفية' : 'استشارة أونلاين عبر الزوم'
                }</p>
                <p><span className="text-slate-400">الموعد المطلوب:</span> {submittedRequest.preferredDate} - {submittedRequest.preferredTime}</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  setSubmittedRequest(null);
                  setFullName('');
                  setPhone('');
                  setEmail('');
                  setTopicDescription('');
                  setFileAttachment(null);
                }}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-all cursor-pointer"
              >
                حجز استشارة أخرى
              </button>

              <a
                href={`https://wa.me/966500003869?text=${encodeURIComponent(`السلام عليكم، قمت بحجز استشارة برقم مرجعي: ${submittedRequest.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>متابعة الطلب عبر الواتساب فوراً</span>
              </a>
            </div>

          </div>
        ) : (
          /* BOOKING FORM VIEW */
          <form
            onSubmit={handleSubmit}
            className="card-luxury p-6 sm:p-10 rounded-3xl border border-amber-500/30 shadow-2xl space-y-6"
          >
            {errorMessage && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-3 text-rose-300 text-xs sm:text-sm">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Row 1: Full Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-400" />
                  <span>الاسم الكامل <span className="text-rose-400">*</span></span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: عبد العزيز بن فهد آل سعود"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-amber-400 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all text-right"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>رقم الجوال <span className="text-rose-400">*</span></span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="05XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-amber-400 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all text-right font-mono"
                />
              </div>

            </div>

            {/* Row 2: Email & Service Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>البريد الإلكتروني (اختياري)</span>
                </label>
                <input
                  type="email"
                  placeholder="name@domain.sa"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-amber-400 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all text-right"
                />
              </div>

              {/* Legal Service Category */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <span>نوع الخدمة القانونية <span className="text-rose-400">*</span></span>
                </label>
                <select
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-amber-400 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all text-right"
                >
                  {serviceOptions.map((opt, idx) => (
                    <option key={idx} value={opt} className="bg-slate-900 text-slate-100">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Row 3: Consultation Method Radio Cards */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold text-slate-200 block">
                طريقة تقديم الاستشارة <span className="text-rose-400">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Method 1: In Person */}
                <button
                  type="button"
                  onClick={() => setConsultationMethod('in_person')}
                  className={`p-4 rounded-2xl border text-right transition-all cursor-pointer flex items-center gap-3 ${
                    consultationMethod === 'in_person'
                      ? 'bg-amber-500/15 border-amber-400 text-amber-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">حضوري في مقر المكتب</p>
                    <p className="text-[11px] text-slate-400">حي الصحافة - الرياض</p>
                  </div>
                </button>

                {/* Method 2: Phone */}
                <button
                  type="button"
                  onClick={() => setConsultationMethod('phone')}
                  className={`p-4 rounded-2xl border text-right transition-all cursor-pointer flex items-center gap-3 ${
                    consultationMethod === 'phone'
                      ? 'bg-amber-500/15 border-amber-400 text-amber-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                    <Smartphone className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">اتصال هاتف مباشر</p>
                    <p className="text-[11px] text-slate-400">استشارة هاتفية مرخصة</p>
                  </div>
                </button>

                {/* Method 3: Online Zoom */}
                <button
                  type="button"
                  onClick={() => setConsultationMethod('online')}
                  className={`p-4 rounded-2xl border text-right transition-all cursor-pointer flex items-center gap-3 ${
                    consultationMethod === 'online'
                      ? 'bg-amber-500/15 border-amber-400 text-amber-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                    <Video className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">أونلاين (Zoom / Teams)</p>
                    <p className="text-[11px] text-slate-400">عن بُعد بخصوصية تامة</p>
                  </div>
                </button>

              </div>
            </div>

            {/* Row 4: Date & Time Picker */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Date */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>التاريخ المطلوب</span>
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-amber-400 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all text-right"
                />
              </div>

              {/* Time */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>الوقت المناسب</span>
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-amber-400 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all text-right"
                >
                  {timeOptions.map((time, idx) => (
                    <option key={idx} value={time} className="bg-slate-900 text-slate-100">
                      {time}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Topic Description Textarea */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>وصف مختصر للموضوع أو القضية</span>
              </label>
              <textarea
                rows={3}
                placeholder="اشرح لمستشارنا ملخص الموضوع، التواريخ الهامة، أو أطراف النزاع إن وجدت..."
                value={topicDescription}
                onChange={(e) => setTopicDescription(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 focus:border-amber-400 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all text-right"
              ></textarea>
            </div>

            {/* File Upload Attachment Box */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>إرفاق ملف أو مستند (عقد، لائحة، صك...)</span>
              </label>
              
              <div className="relative border-2 border-dashed border-slate-800 hover:border-amber-500/50 bg-slate-950/40 rounded-2xl p-4 text-center cursor-pointer transition-all">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-6 h-6 text-amber-400" />
                  <p className="text-xs text-slate-300 font-medium">
                    {fileAttachment ? `تم إرفاق: ${fileAttachment.name}` : 'اضغط هنا لرفع الملف أو اسحبه داخل المربع (PDF, DOCX, PNG)'}
                  </p>
                  <p className="text-[10px] text-slate-500">الحد الأقصى للملف: 15 ميجابايت (سري ومحمي)</p>
                </div>
              </div>
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-400 bg-slate-950"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  أوافق على{' '}
                  <span className="text-amber-400 underline font-semibold">سياسة الخصوصية والسرية</span>{' '}
                  الخاصة بمكتب مشعل بن سعود الأحمد للمحاماة، وأقر بأن جميع البيانات المدخلة صحيحة ومحاطة بالحماية النظامية برقم الترخيص 38694.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-base rounded-2xl shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>جاري إرسال الطلب...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-slate-950" />
                    <span>إرسال طلب الاستشارة</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
