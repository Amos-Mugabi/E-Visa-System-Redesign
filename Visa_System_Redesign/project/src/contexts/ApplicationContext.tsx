import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ApplicationData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  passportNumber: string;
  dateOfBirth: string;
  gender: string;
  
  // Travel Information
  visaType: string;
  purposeOfVisit: string;
  arrivalDate: string;
  departureDate: string;
  portOfEntry: string;
  
  // Documents
  passportPhoto: File | null;
  passportCopy: File | null;
  yellowFeverCert: File | null;
  additionalDocs: File[];
  
  // Application status
  applicationId?: string;
  status?: 'draft' | 'submitted' | 'processing' | 'approved' | 'rejected';
  submittedAt?: Date;
  lastUpdated?: Date;
}

interface ApplicationContextType {
  applicationData: ApplicationData;
  updateApplication: (data: Partial<ApplicationData>) => void;
  clearApplication: () => void;
  saveApplication: () => void;
  loadApplication: (id: string) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

const initialApplicationData: ApplicationData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  nationality: '',
  passportNumber: '',
  dateOfBirth: '',
  gender: '',
  visaType: '',
  purposeOfVisit: '',
  arrivalDate: '',
  departureDate: '',
  portOfEntry: '',
  passportPhoto: null,
  passportCopy: null,
  yellowFeverCert: null,
  additionalDocs: [],
  status: 'draft'
};

export const ApplicationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [applicationData, setApplicationData] = useState<ApplicationData>(initialApplicationData);

  const updateApplication = (data: Partial<ApplicationData>) => {
    setApplicationData(prev => ({
      ...prev,
      ...data,
      lastUpdated: new Date()
    }));
  };

  const clearApplication = () => {
    setApplicationData(initialApplicationData);
  };

  const saveApplication = () => {
    // In a real app, this would save to a backend
    const applicationId = 'APP-' + Date.now().toString(36).toUpperCase();
    updateApplication({
      applicationId,
      status: 'submitted',
      submittedAt: new Date()
    });
    
    // Save to localStorage for persistence
    localStorage.setItem(`application_${applicationId}`, JSON.stringify(applicationData));
  };

  const loadApplication = (id: string) => {
    // In a real app, this would load from a backend
    const saved = localStorage.getItem(`application_${id}`);
    if (saved) {
      setApplicationData(JSON.parse(saved));
    }
  };

  return (
    <ApplicationContext.Provider value={{
      applicationData,
      updateApplication,
      clearApplication,
      saveApplication,
      loadApplication
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplication must be used within an ApplicationProvider');
  }
  return context;
};