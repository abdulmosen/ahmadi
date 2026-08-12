import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { INITIAL_CONSULTATIONS } from './src/data/mockData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Storage for Consultations
let consultationsStore = [...INITIAL_CONSULTATIONS];

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    firmName: 'مشعل سعود الأحمدي للمحاماة والاستشارات القانونية',
    licenseNumber: '38694',
    timestamp: new Date().toISOString()
  });
});

// GET all consultations (for Admin Dashboard)
app.get('/api/consultations', (req, res) => {
  res.json({
    success: true,
    data: consultationsStore
  });
});

// POST new consultation request
app.post('/api/consultations', (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      serviceCategory,
      consultationMethod,
      preferredDate,
      preferredTime,
      topicDescription,
      attachmentName,
      agreedToTerms
    } = req.body;

    if (!fullName || !phone || !serviceCategory) {
      return res.status(400).json({
        success: false,
        message: 'الرجاء إكمال كافة الحقول الإلزامية (الاسم، الجوال، ونوع الخدمة).'
      });
    }

    const randomNum = Math.floor(100 + Math.random() * 900);
    const newId = `REQ-38694-${randomNum}`;

    const newConsultation = {
      id: newId,
      fullName: String(fullName).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : '',
      serviceCategory: String(serviceCategory),
      consultationMethod: consultationMethod || 'in_person',
      preferredDate: preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: preferredTime || '10:00 صباحاً',
      topicDescription: topicDescription ? String(topicDescription).trim() : '',
      attachmentName: attachmentName ? String(attachmentName).trim() : undefined,
      agreedToTerms: Boolean(agreedToTerms),
      status: 'new' as const,
      adminNotes: 'طلب جديد تم إرساله عبر المنصة الإلكترونية.',
      createdAt: new Date().toLocaleString('ar-SA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    consultationsStore.unshift(newConsultation);

    res.status(201).json({
      success: true,
      message: 'تم إرسال طلب الاستشارة بنجاح، وسيقوم المساعد القانوني بالتواصل معكم في أقرب وقت.',
      data: newConsultation
    });
  } catch (error) {
    console.error('Error creating consultation:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ في الخادم أثناء حفظ الطلب.' });
  }
});

// PATCH update consultation status / admin notes
app.patch('/api/consultations/:id', (req, res) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;

  const index = consultationsStore.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'طلب الاستشارة غير موجود.' });
  }

  if (status) {
    consultationsStore[index].status = status;
  }
  if (adminNotes !== undefined) {
    consultationsStore[index].adminNotes = adminNotes;
  }

  res.json({
    success: true,
    message: 'تم تحديث حالة الطلب بنجاح.',
    data: consultationsStore[index]
  });
});

// DELETE consultation
app.delete('/api/consultations/:id', (req, res) => {
  const { id } = req.params;
  consultationsStore = consultationsStore.filter((item) => item.id !== id);
  res.json({ success: true, message: 'تم حذف طلب الاستشارة بنجاح.' });
});

// POST AI Assistant - Legal Screener powered by Gemini API
app.post('/api/ai-assistant', async (req, res) => {
  const userPrompt = req.body?.userPrompt ? String(req.body.userPrompt).trim() : '';

  if (!userPrompt) {
    return res.status(400).json({ success: false, message: 'الرجاء إدخال شرح مختصر لمشكلتك القانونية.' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      // Rule-based high quality response if API key is not configured
      let recommendedService = 'الاستشارات القانونية';
      if (userPrompt.includes('شركة') || userPrompt.includes('شريك') || userPrompt.includes('سجل') || userPrompt.includes('تأسيس')) {
        recommendedService = 'القضايا التجارية وتأسيس الشركات';
      } else if (userPrompt.includes('عمل') || userPrompt.includes('موظف') || userPrompt.includes('راتب') || userPrompt.includes('فصل') || userPrompt.includes('مكافأة')) {
        recommendedService = 'القضايا العمالية';
      } else if (userPrompt.includes('طلاق') || userPrompt.includes('نفقة') || userPrompt.includes('حضانة') || userPrompt.includes('ورثة')) {
        recommendedService = 'الأحوال الشخصية';
      } else if (userPrompt.includes('عقد') || userPrompt.includes('شراء') || userPrompt.includes('اتفاق') || userPrompt.includes('توريد')) {
        recommendedService = 'إعداد ومراجعة العقود';
      }

      return res.json({
        success: true,
        recommendedService,
        guidance: `التحليل النظامي الأول لمنصتنا:\n\nبناءً على الشرح المقدم: نوصيك بحجز استشارة قانونية موثقة ضمن قسم **${recommendedService}** لتقييم الموقف وتفنيد اللوائح والأنظمة السعودية ذات العلاقة.\n\nتوصية المكتب: نقترح عليك حجز استشارة (حضورية أو أونلاين) لدى المحامي مشعل سعود الأحمدي لمراجعة الأوراق الثبوتية والخطوات القضائية.`,
        suggestedNextStep: 'نقترح عليك حجز استشارة (حضورية أو أونلاين) مع مستشارينا المعتمدين لمراجعة تفاصيل قضيتك بعناية.'
      });
    }

    // Call Gemini API
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `أنت المساعد القانوني الذكي الخبير لـ "مشعل سعود الأحمدي للمحاماة والاستشارات القانونية" (ترخيص رقم 38694) بالمملكة العربية السعودية.
وظيفتك الإجابة الشاملة والدقيقة على كل ما يخص القانون السعودي والأنظمة واللوائح الرسمية (نظام المعاملات المدنية، نظام الشركات، نظام العمل، نظام الأحوال الشخصية، نظام الإثبات، نظام التنفيذ، ديوان المظالم، منصة ناجز، إلخ).

العميل يطرح الاستفسار التالي:
"${userPrompt}"

يرجى تحليل الموضوع وإفادة العميل بأسلوب رسمي، راقٍ، ودقيق يوضح:
1) الخدمة القانونية المناسبة من خدمات مكتبنا (القضايا العامة، الأحوال الشخصية، القضايا التجارية، إعداد ومراجعة العقود، القضايا العمالية، الاستشارات الرسمية، تأسيس الشركات، التمثيل القضائي).
2) الإجابة والتحليل النظامي المباشر وفق الأنظمة واللوائح المحدثة بالمملكة العربية السعودية، وتبيان الجهة القضائية أو المنصة الإلكترونية المختصة (مثل المحكمة التجارية، المحكمة العمالية، ناجز، منصة ودي، ديوان المظالم).
3) إرشادات وتوصية رسمية لحجز استشارة توثيقية لدى المحامي مشعل سعود الأحمدي لمتابعة كافة الإجراءات الرسمية.`
            }
          ]
        }
      ]
    });

    const replyText = response.text || 'نقترح عليك حجز استشارة قانونية مباشرة لدى مستشارينا لبحث التفاصيل المستندية لقضيتك.';

    let recommendedService = 'الاستشارات القانونية';
    if (userPrompt.includes('شركة') || userPrompt.includes('شريك') || userPrompt.includes('سجل') || userPrompt.includes('تأسيس')) {
      recommendedService = 'القضايا التجارية وتأسيس الشركات';
    } else if (userPrompt.includes('عمل') || userPrompt.includes('موظف') || userPrompt.includes('راتب') || userPrompt.includes('فصل') || userPrompt.includes('مكافأة')) {
      recommendedService = 'القضايا العمالية';
    } else if (userPrompt.includes('طلاق') || userPrompt.includes('نفقة') || userPrompt.includes('حضانة') || userPrompt.includes('ورثة')) {
      recommendedService = 'الأحوال الشخصية';
    } else if (userPrompt.includes('عقد') || userPrompt.includes('شراء') || userPrompt.includes('اتفاق') || userPrompt.includes('توريد')) {
      recommendedService = 'إعداد ومراجعة العقود';
    }

    res.json({
      success: true,
      guidance: replyText,
      recommendedService
    });
  } catch (error) {
    console.error('AI Assistant Error:', error);
    
    // Provide intelligent fallback instead of breaking
    let recommendedService = 'الاستشارات القانونية المتخصصة';
    if (userPrompt.includes('شركة') || userPrompt.includes('شريك') || userPrompt.includes('سجل')) {
      recommendedService = 'القضايا التجارية وتأسيس الشركات';
    } else if (userPrompt.includes('عمل') || userPrompt.includes('موظف') || userPrompt.includes('راتب') || userPrompt.includes('فصل') || userPrompt.includes('مكافأة')) {
      recommendedService = 'القضايا العمالية';
    } else if (userPrompt.includes('طلاق') || userPrompt.includes('نفقة') || userPrompt.includes('حضانة') || userPrompt.includes('ورثة')) {
      recommendedService = 'الأحوال الشخصية';
    } else if (userPrompt.includes('عقد') || userPrompt.includes('شراء') || userPrompt.includes('اتفاق')) {
      recommendedService = 'إعداد ومراجعة العقود';
    }

    res.json({
      success: true,
      recommendedService,
      guidance: `تحليل الموقف النظامي الاسترشادي:\n\nبناءً على تفاصيل استفسارك الكريمة، يخضع هذا الموضوع لأحكام الأنظمة واللوائح الرسمية المعمول بها في المملكة العربية السعودية (الجهة الاختصاصية ذات الصلة: المحاكم المختصة، منصة ناجز، أو البوابات الحكومية المعنية).\n\nقسم الخدمة المقترح لمتابعة دعواك: **${recommendedService}**.\n\nتوصية المكتب: نوصيك بتزويدنا بصور المستندات والعقود الرسمية وحجز استشارة موثقة مع المحامي مشعل سعود الأحمدي لدراسة ملف قضيتك بدقة واتخاذ الإجراءات النظامية الضامنة لحقوقك.`,
      suggestedNextStep: 'يرجى النقر على زر حجز استشارة أدناه لتحديد الموعد المناسب.'
    });
  }
});

// Setup Vite / Static Server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`⚖️  Meshal Bin Saud Al-Ahmadi Law Firm Server is running on http://localhost:${PORT}`);
  });
}

startServer();
