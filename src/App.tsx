import React, { useState, useEffect } from 'react';
import { ConsultationRequest, ConsultationStatus } from './types';
import { INITIAL_SERVICES, INITIAL_FAQS, INITIAL_CONSULTATIONS } from './data/mockData';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesBar } from './components/FeaturesBar';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { WhyUsSection } from './components/WhyUsSection';
import { BookingForm } from './components/BookingForm';
import { AiAssistantModal } from './components/AiAssistantModal';
import { AdminDashboard } from './components/AdminDashboard';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import { PrivacyPolicyModal, TermsModal } from './components/PrivacyPolicyModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [consultations, setConsultations] = useState<ConsultationRequest[]>(INITIAL_CONSULTATIONS);

  // Modals state
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [selectedCategoryForBooking, setSelectedCategoryForBooking] = useState<string>('الاستشارات القانونية');

  // Fetch initial consultations from backend API
  useEffect(() => {
    fetch('/api/consultations')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setConsultations(data.data);
        }
      })
      .catch((err) => {
        console.log('Using initial mock consultations state:', err);
      });
  }, []);

  const handleNewConsultationCreated = (newReq: ConsultationRequest) => {
    setConsultations((prev) => [newReq, ...prev]);
  };

  const handleUpdateConsultationStatus = (
    id: string,
    newStatus: ConsultationStatus,
    adminNotes?: string
  ) => {
    setConsultations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus, adminNotes: adminNotes ?? c.adminNotes } : c))
    );

    // Sync with server API
    fetch(`/api/consultations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, adminNotes })
    }).catch((err) => console.log('API update sync error:', err));
  };

  const handleDeleteConsultation = (id: string) => {
    setConsultations((prev) => prev.filter((c) => c.id !== id));
    fetch(`/api/consultations/${id}`, { method: 'DELETE' }).catch((err) =>
      console.log('API delete sync error:', err)
    );
  };

  const handleBookServiceWithCategory = (categoryTitle: string) => {
    setSelectedCategoryForBooking(categoryTitle);
    setCurrentTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBookingDirectly = () => {
    setCurrentTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenContactDirectly = () => {
    setCurrentTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050b1a] text-white font-sans selection:bg-[#d4af37] selection:text-[#050b1a]">
      
      {/* Sticky Header Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenBooking={handleOpenBookingDirectly}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
      />

      {/* Main Page View Router */}
      <main className="pt-16">
        
        {/* HOME VIEW */}
        {currentTab === 'home' && (
          <>
            <HeroSection
              onOpenBooking={handleOpenBookingDirectly}
              onOpenContact={handleOpenContactDirectly}
              onOpenAiAssistant={() => setAiAssistantOpen(true)}
              onNavigateServices={() => {
                setCurrentTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <FeaturesBar />
            <ServicesSection
              services={INITIAL_SERVICES}
              onBookService={handleBookServiceWithCategory}
            />
            <AboutSection />
            <WhyUsSection />
            <BookingForm
              initialService={selectedCategoryForBooking}
              onRequestSubmitted={handleNewConsultationCreated}
            />
            <FaqSection faqs={INITIAL_FAQS} />
            <ContactSection />
          </>
        )}

        {/* ABOUT VIEW */}
        {currentTab === 'about' && (
          <div className="pt-8">
            <AboutSection />
            <WhyUsSection />
          </div>
        )}

        {/* SERVICES VIEW */}
        {currentTab === 'services' && (
          <div className="pt-8">
            <ServicesSection
              services={INITIAL_SERVICES}
              onBookService={handleBookServiceWithCategory}
            />
          </div>
        )}

        {/* BOOKING VIEW */}
        {currentTab === 'booking' && (
          <div className="pt-8">
            <BookingForm
              initialService={selectedCategoryForBooking}
              onRequestSubmitted={handleNewConsultationCreated}
            />
          </div>
        )}

        {/* FAQ VIEW */}
        {currentTab === 'faq' && (
          <div className="pt-8">
            <FaqSection faqs={INITIAL_FAQS} />
          </div>
        )}

        {/* CONTACT VIEW */}
        {currentTab === 'contact' && (
          <div className="pt-8">
            <ContactSection />
          </div>
        )}

        {/* ADMIN DASHBOARD VIEW */}
        {currentTab === 'admin' && (
          <div className="pt-8">
            <AdminDashboard
              consultations={consultations}
              onUpdateConsultation={handleUpdateConsultationStatus}
              onDeleteConsultation={handleDeleteConsultation}
            />
          </div>
        )}

      </main>

      {/* Floating Action Buttons on screen side */}
      <FloatingActions
        onOpenBooking={handleOpenBookingDirectly}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
      />

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPrivacy={() => setPrivacyOpen(true)}
        onOpenTerms={() => setTermsOpen(true)}
      />

      {/* Global Modals */}
      <AiAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        onBookServiceWithCategory={handleBookServiceWithCategory}
      />

      <PrivacyPolicyModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />

      <TermsModal
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
      />

    </div>
  );
}
