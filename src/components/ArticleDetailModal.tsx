import React from 'react';
import { LegalArticle } from '../types';
import { X, Calendar, Clock, User, Share2, ArrowRight, Bookmark } from 'lucide-react';

interface ArticleDetailModalProps {
  article: LegalArticle | null;
  onClose: () => void;
  onBookConsultation: () => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  onBookConsultation
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden my-8 text-right">
        
        {/* Cover Image Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2.5 bg-slate-950/80 hover:bg-slate-950 text-slate-200 hover:text-amber-400 rounded-xl border border-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 right-6 left-6 space-y-2">
            <span className="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded-full">
              {article.category}
            </span>
            <h1 className="text-xl sm:text-3xl font-bold text-slate-100 font-serif leading-snug">
              {article.title}
            </h1>
          </div>
        </div>

        {/* Article Content & Metadata */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-b border-slate-800 pb-4">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-amber-400" />
              <span>{article.author} ({article.authorRole})</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{article.date}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>وقت القراءة: {article.readTime}</span>
            </span>
          </div>

          <div className="space-y-4 text-slate-200 leading-relaxed text-sm sm:text-base font-light">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {article.tags.map((tag, idx) => (
                <span key={idx} className="text-[11px] bg-slate-950 text-slate-400 px-2.5 py-1 rounded-md border border-slate-800">
                  #{tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => {
                onClose();
                onBookConsultation();
              }}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow cursor-pointer"
            >
              استشر محامينا بخصوص هذا المقال
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
