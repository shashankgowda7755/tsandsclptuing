import React, { useState, useEffect, useCallback } from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';

import { Footer } from './components/Footer';
import { UserForm } from './components/UserForm';
import { GroupRegistrationForm } from './components/GroupRegistrationForm';
import { CertificatePreview } from './components/CertificatePreview';
import { PledgeReading } from './components/PledgeReading';
import { Success } from './components/Success';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { InitiativeDetail } from './components/InitiativeDetail';
import { Debug } from './components/Debug';
import { UserData, Step } from './types';
import { DB } from './services/db';
import { startQueueSync } from './services/submissionQueue';
import { useApp } from './context/AppContext';

// 🚀 Performance: Preload critical assets on app mount
const preloadAssets = () => {
  const imagesToPreload = ['/assets/poster.jpeg', '/assets/cleanup_cover.png', '/assets/turtle_cover.png'];
  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// 🚀 Performance: Wait one frame before heavy work (shows loading state first)
const runAfterPaint = (callback: () => void) => {
  setTimeout(callback, 16); // ~1 frame at 60fps
};

const App: React.FC = () => {
  const { setSelectedSchool } = useApp();
  const [currentStep, setCurrentStep] = useState<Step>(Step.Home);
  const [selectedInitiativeId, setSelectedInitiativeId] = useState<string>('cleanup');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+91',
    photo: ''
  });

  // 🚀 Preload assets on mount and set title
  useEffect(() => {
    preloadAssets();
    const cleanupSync = startQueueSync(); // 🔄 Start offline sync
    document.title = "Save a Turtle";

    // 🔗 Check for direct org link parameter
    const urlParams = new URLSearchParams(window.location.search);
    const orgParam = urlParams.get('org');

    if (orgParam) {
      const schools = DB.getSchools();
      const school = schools.find(s => s.id === orgParam);

      if (school) {
        console.log(`📍 Direct link: Navigating to ${school.name}`);
        setSelectedSchool(school);
        setTimeout(() => setCurrentStep(Step.Form), 100);
      }
    }

    return () => cleanupSync();
  }, [setSelectedSchool]);

  // 🚀 Smooth step transition with fade effect
  const goToStep = useCallback((step: Step) => {
    setIsTransitioning(true);
    runAfterPaint(() => {
      setCurrentStep(step);
      window.scrollTo(0, 0);
      setTimeout(() => setIsTransitioning(false), 50);
    });
  }, []);

  const handleStart = () => goToStep(Step.Form);

  const handleFormSubmit = () => goToStep(Step.Preview);

  const handlePreviewConfirm = () => goToStep(Step.Reading);

  const handlePledgeConfirm = async () => {
    setIsTransitioning(true);
    // Data is submitted in the Success component via DB.submitForm
    runAfterPaint(() => {
      setCurrentStep(Step.Success);
      window.scrollTo(0, 0);
      setTimeout(() => setIsTransitioning(false), 50);
    });
  };

  const handleReset = () => {
    setUserData({
      fullName: '',
      email: '',
      phone: '',
      countryCode: '+91',
      photo: ''
    });
    goToStep(Step.Home);
  };

  const handleInitiativeClick = (id: string) => {
    setSelectedInitiativeId(id);
    goToStep(Step.InitiativeDetails);
  };

  return (
    <div className="min-h-screen bg-canvas font-sans text-body flex flex-col">
      <Header 
        onLogoClick={handleReset} 
        onJoin={() => goToStep(Step.GroupRegistration)} 
        onSecretDebug={() => goToStep(Step.Debug)}
      />

      {/* 🚀 Main content with CSS fade transition */}
      <main
        className={`flex-1 transition-opacity duration-200 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'} ${currentStep !== Step.Home && currentStep !== Step.InitiativeDetails ? 'pt-20' : ''}`}
      >
        {currentStep === Step.Home && (
          <>
            <Hero onStart={handleStart} onGroupRegister={() => goToStep(Step.GroupRegistration)} />
          </>
        )}

        {currentStep === Step.InitiativeDetails && (
            <InitiativeDetail 
                initiativeId={selectedInitiativeId}
                onBack={() => goToStep(Step.Home)}
                onJoin={() => goToStep(Step.GroupRegistration)} // Use the new Group Registration form
            />
        )}

        {currentStep === Step.GroupRegistration && (
          <GroupRegistrationForm onBack={() => goToStep(Step.Home)} />
        )}

        {currentStep === Step.Form && (
          <>
            <UserForm
              userData={userData}
              setUserData={setUserData}
              onBack={() => goToStep(Step.Home)}
              onContinue={handleFormSubmit}
            />
          </>
        )}

        {currentStep === Step.Preview && (
          <CertificatePreview
            userData={userData}
            onBack={() => goToStep(Step.Form)}
            onConfirm={handlePreviewConfirm}
          />
        )}

        {currentStep === Step.Reading && (
          <PledgeReading
            userData={userData}
            onBack={() => goToStep(Step.Preview)}
            onConfirm={handlePledgeConfirm}
          />
        )}

        {currentStep === Step.Success && (
          <Success
            userData={userData}
            onReset={handleReset}
          />
        )}

        {currentStep === Step.Debug && (
          <div className="fixed inset-0 z-[100] bg-black">
             <Debug onBack={() => goToStep(Step.Home)} />
          </div>
        )}
      </main>

      {currentStep !== Step.InitiativeDetails && <Footer onPrivacyClick={() => setShowPrivacyPolicy(true)} />}

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />
      )}
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default AppWrapper;