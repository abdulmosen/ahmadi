import React, { useState, useEffect } from 'react';
import { ConsultationRequest, ConsultationStatus } from '../types';
import {
  Users,
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Calendar,
  Phone,
  Mail,
  FileText,
  Lock,
  Key,
  Edit3,
  Trash2,
  Download,
  RefreshCw,
  MessageSquare,
  Sparkles,
  ChevronDown,
  Paperclip,
  Check
} from 'lucide-react';

interface AdminDashboardProps {
  consultations: ConsultationRequest[];
  onUpdateConsultation: (id: string, newStatus: ConsultationStatus, notes?: string) => void;
  onDeleteConsultation: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  consultations,
  onUpdateConsultation,
  onDeleteConsultation
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  const [selectedRequest, setSelectedRequest] = useState<ConsultationRequest | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [selectedNewStatus, setSelectedNewStatus] = useState<ConsultationStatus>('new');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Auto pre-fill editing when selectedRequest changes
  useEffect(() => {
    if (selectedRequest) {
      setEditingNotes(selectedRequest.adminNotes || '');
      setSelectedNewStatus(selectedRequest.status);
    }
  }, [selectedRequest]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '38694' || pinInput === 'admin' || pinInput === '1234') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('رمز المرور غير صحيح. استخدم رقم الترخيص: 38694');
    }
  };

  // Metrics Calculations
  const totalCount = consultations.length;
  const newCount = consultations.filter((c) => c.status === 'new').length;
  const confirmedCount = consultations.filter((c) => c.status === 'confirmed').length;
  const completedCount = consultations.filter((c) => c.status === 'completed').length;
  const cancelledCount = consultations.filter((c) => c.status === 'cancelled').length;

  // Filtered requests
  const filteredRequests = consultations.filter((req) => {
    const matchesSearch =
      req.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.phone.includes(searchQuery) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.serviceCategory.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;

    let matchesDate = true;
    if (dateFilter === 'today') {
      const todayStr = new Date().toISOString().split('T')[0];
      matchesDate = req.preferredDate === todayStr;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleSaveDetails = (id: string) => {
    onUpdateConsultation(id, selectedNewStatus, editingNotes);
    setSaveSuccessMsg('تم حفظ التعديلات بنجاح');
    setTimeout(() => setSaveSuccessMsg(''), 3000);

    // update local state
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest({
        ...selectedRequest,
        status: selectedNewStatus,
        adminNotes: editingNotes
      });
    }
  };

  const getStatusBadge = (status: ConsultationStatus) => {
    switch (status) {
      case 'new':
        return <span className="px-2.5 py-1 text-xs rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">جديد</span>;
      case 'contacted':
        return <span className="px-2.5 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">تم التواصل</span>;
      case 'confirmed':
        return <span className="px-2.5 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">موعد مؤكد</span>;
      case 'completed':
        return <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">مكتمل</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 text-xs rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">ملغي</span>;
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="py-24 max-w-md mx-auto px-4 text-right">
        <div className="card-luxury p-8 rounded-3xl border border-amber-500/30 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/30">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-100 font-serif">
              لوحة التحكم الإدارية
            </h2>
            <p className="text-xs text-amber-400 mt-1">
              خاصة بمديري ومستشاري مكتب مشعل بن سعود الأحمد
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4 pt-2">
            <div className="space-y-2 text-right">
              <label className="text-xs font-bold text-slate-300 block">
                أدخل رمز المرور الإداري (رمز الترخيص):
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="38694"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl text-center text-lg font-mono text-amber-300 focus:outline-none"
                />
                <Key className="w-5 h-5 text-slate-500 absolute left-3 top-3.5" />
              </div>
            </div>

            {pinError && (
              <p className="text-xs text-rose-400 font-medium">{pinError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg cursor-pointer"
            >
              تسجيل الدخول للوحة الإدارة
            </button>
          </form>

          <p className="text-[11px] text-slate-500">
            رمز المرور التجريبي الافتراضي: <span className="font-mono font-bold text-amber-400">38694</span>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold text-amber-400">لوحة الإدارة المباشرة - ترخيص 38694</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-serif mt-1">
            إدارة طلبات الاستشارات والعملاء
          </h1>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-semibold cursor-pointer"
        >
          قفل اللوحة
        </button>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400">إجمالي الطلبات</p>
          <p className="text-2xl sm:text-3xl font-black text-slate-100 font-serif mt-1">{totalCount}</p>
        </div>

        <div className="p-5 bg-amber-500/10 rounded-2xl border border-amber-500/30">
          <p className="text-xs text-amber-300 font-semibold">طلبات جديدة</p>
          <p className="text-2xl sm:text-3xl font-black text-amber-400 font-serif mt-1">{newCount}</p>
        </div>

        <div className="p-5 bg-purple-500/10 rounded-2xl border border-purple-500/30">
          <p className="text-xs text-purple-300 font-semibold">مواعيد مؤكدة</p>
          <p className="text-2xl sm:text-3xl font-black text-purple-300 font-serif mt-1">{confirmedCount}</p>
        </div>

        <div className="p-5 bg-emerald-500/10 rounded-2xl border border-emerald-500/30">
          <p className="text-xs text-emerald-300 font-semibold">طلبات مكتملة</p>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-serif mt-1">{completedCount}</p>
        </div>

      </div>

      {/* Filters Bar */}
      <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
          <input
            type="text"
            placeholder="بحث باسم العميل، رقم الجوال، أو رقم الطلب..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Status Dropdown Filter */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs text-slate-400 shrink-0">الحالة:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl focus:outline-none"
          >
            <option value="all">كافة الحالات</option>
            <option value="new">جديد</option>
            <option value="contacted">تم التواصل</option>
            <option value="confirmed">موعد مؤكد</option>
            <option value="completed">مكتمل</option>
            <option value="cancelled">ملغي</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl focus:outline-none"
          >
            <option value="all">كافة التواريخ</option>
            <option value="today">اليوم فقط</option>
          </select>
        </div>

      </div>

      {/* Requests Table */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px]">
              <tr>
                <th className="p-4 font-bold">رقم الطلب</th>
                <th className="p-4 font-bold">العميل</th>
                <th className="p-4 font-bold">رقم الجوال</th>
                <th className="p-4 font-bold">نوع الخدمة</th>
                <th className="p-4 font-bold">طريقة الاستشارة</th>
                <th className="p-4 font-bold">الموعد المطلوب</th>
                <th className="p-4 font-bold">الحالة</th>
                <th className="p-4 font-bold text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">
                    لا توجد طلبات استشارة تطابق معايير البحث والفلترة.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-amber-300">{req.id}</td>
                    <td className="p-4 font-bold text-slate-100">{req.fullName}</td>
                    <td className="p-4 font-mono text-slate-300" dir="ltr">{req.phone}</td>
                    <td className="p-4">{req.serviceCategory}</td>
                    <td className="p-4">
                      {req.consultationMethod === 'in_person' && 'حضوري بالمكتب'}
                      {req.consultationMethod === 'phone' && 'هاتفي'}
                      {req.consultationMethod === 'online' && 'أونلاين الزوم'}
                    </td>
                    <td className="p-4 text-slate-400">{req.preferredDate} ({req.preferredTime})</td>
                    <td className="p-4">{getStatusBadge(req.status)}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedRequest(req)}
                          className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded-lg border border-amber-500/30 text-[11px] font-semibold cursor-pointer"
                        >
                          معاينة وتعديل
                        </button>
                        <button
                          onClick={() => onDeleteConsultation(req.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Detail Drawer / Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 text-right max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-amber-400 font-mono font-bold">{selectedRequest.id}</span>
                <h3 className="text-xl font-bold text-slate-100 font-serif">{selectedRequest.fullName}</h3>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800"
              >
                إغلاق
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p><span className="text-slate-400">الجوال:</span> <span className="font-mono text-amber-300" dir="ltr">{selectedRequest.phone}</span></p>
              <p><span className="text-slate-400">البريد:</span> {selectedRequest.email || 'غير مدخل'}</p>
              <p><span className="text-slate-400">نوع الخدمة:</span> {selectedRequest.serviceCategory}</p>
              <p><span className="text-slate-400">تاريخ الطلب:</span> {selectedRequest.createdAt}</p>
              <p><span className="text-slate-400">الموعد المطلوب:</span> {selectedRequest.preferredDate} ({selectedRequest.preferredTime})</p>
              <p><span className="text-slate-400">الملف المرفق:</span> {selectedRequest.attachmentName || 'لا يوجد ملف مرفق'}</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">وصف الموضوع من العميل:</label>
              <div className="p-4 bg-slate-950 rounded-xl text-xs text-slate-200 leading-relaxed border border-slate-800">
                {selectedRequest.topicDescription || 'لم يقم العميل بكتابة وصف إضافي.'}
              </div>
            </div>

            {/* Change Status */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-xs font-bold text-amber-300 block">تحديث حالة الطلب:</label>
              <select
                value={selectedNewStatus}
                onChange={(e) => setSelectedNewStatus(e.target.value as ConsultationStatus)}
                className="w-full p-3 bg-slate-950 border border-slate-800 text-xs text-slate-100 rounded-xl"
              >
                <option value="new">جديد</option>
                <option value="contacted">تم التواصل</option>
                <option value="confirmed">موعد مؤكد</option>
                <option value="completed">مكتمل</option>
                <option value="cancelled">ملغي</option>
              </select>
            </div>

            {/* Legal Notes */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">ملاحظات المكتب الداخلية:</label>
              <textarea
                rows={3}
                placeholder="أضف ملاحظات الفريق القانوني حول التواصل أو القوائم..."
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100"
              ></textarea>
            </div>

            {saveSuccessMsg && (
              <p className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-4 h-4" />
                <span>{saveSuccessMsg}</span>
              </p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleSaveDetails(selectedRequest.id)}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
              >
                حفظ التغييرات
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
