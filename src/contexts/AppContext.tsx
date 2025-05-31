import React, { createContext, useContext, useState, useEffect } from 'react';

interface TaxiState {
  selectedColors: boolean[];
  textField1: string;
  textField2: string;
  adminPassword: string;
  taxiNames: string[];
}

interface AppContextType {
  taxiState: TaxiState;
  updateSelectedColors: (colors: boolean[]) => void;
  updateTextField1: (text: string) => void;
  updateTextField2: (text: string) => void;
  updateTaxiName: (index: number, name: string) => void;
  resetPassword: (newPassword?: string) => void;
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
  checkPassword: (password: string) => boolean;
}

const defaultTaxiState: TaxiState = {
  selectedColors: new Array(8).fill(false),
  textField1: '',
  textField2: '',
  adminPassword: 'admin123',
  taxiNames: ['Taxi 1', 'Taxi 2', 'Taxi 3', 'Taxi 4', 'Taxi 5', 'Taxi 6', 'Taxi 7', 'Taxi 8']
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [taxiState, setTaxiState] = useState<TaxiState>(() => {
    const saved = localStorage.getItem('taxiState');
    return saved ? { ...defaultTaxiState, ...JSON.parse(saved) } : defaultTaxiState;
  });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem('taxiState', JSON.stringify(taxiState));
  }, [taxiState]);

  const updateSelectedColors = (colors: boolean[]) => {
    setTaxiState(prev => ({ ...prev, selectedColors: colors }));
  };

  const updateTextField1 = (text: string) => {
    setTaxiState(prev => ({ ...prev, textField1: text }));
  };

  const updateTextField2 = (text: string) => {
    setTaxiState(prev => ({ ...prev, textField2: text }));
  };

  const updateTaxiName = (index: number, name: string) => {
    setTaxiState(prev => {
      const newNames = [...prev.taxiNames];
      newNames[index] = name;
      return { ...prev, taxiNames: newNames };
    });
  };

  const resetPassword = (newPassword?: string) => {
    const password = newPassword || Math.random().toString(36).substring(2, 10);
    setTaxiState(prev => ({ ...prev, adminPassword: password }));
    if (!newPassword) {
      alert(`New password: ${password}`);
    }
  };

  const checkPassword = (password: string) => {
    return password === taxiState.adminPassword;
  };

  return (
    <AppContext.Provider value={{
      taxiState,
      updateSelectedColors,
      updateTextField1,
      updateTextField2,
      updateTaxiName,
      resetPassword,
      isAdmin,
      setIsAdmin,
      checkPassword
    }}>
      {children}
    </AppContext.Provider>
  );
};