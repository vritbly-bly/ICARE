import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (passcode: string) => boolean;
  logout: () => void;
  changePasscode: (currentPass: string, newPass: string) => { success: boolean; message: string };
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_STORAGE_KEY = 'icare_admin_auth_v1';
const PASSCODE_STORAGE_KEY = 'icare_admin_passcode_v1';

// Default accepted initial credentials
const DEFAULT_PASSCODES = ['583104', 'icare123', 'admin123', 'icare2026'];

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Sync admin state with localStorage
  useEffect(() => {
    try {
      if (isAdmin) {
        localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
      } else {
        localStorage.removeItem(ADMIN_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [isAdmin]);

  const login = (inputPasscode: string): boolean => {
    const trimmed = inputPasscode.trim();
    if (!trimmed) return false;

    try {
      const storedPasscode = localStorage.getItem(PASSCODE_STORAGE_KEY);
      const isValid = storedPasscode
        ? trimmed === storedPasscode
        : DEFAULT_PASSCODES.includes(trimmed);

      if (isValid) {
        setIsAdmin(true);
        setIsLoginModalOpen(false);
        return true;
      }
    } catch {
      if (DEFAULT_PASSCODES.includes(trimmed)) {
        setIsAdmin(true);
        setIsLoginModalOpen(false);
        return true;
      }
    }

    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const changePasscode = (currentPass: string, newPass: string): { success: boolean; message: string } => {
    const trimmedCurrent = currentPass.trim();
    const trimmedNew = newPass.trim();

    if (trimmedNew.length < 4) {
      return { success: false, message: 'New passcode must be at least 4 characters long.' };
    }

    let isCurrentValid = false;
    try {
      const stored = localStorage.getItem(PASSCODE_STORAGE_KEY);
      isCurrentValid = stored ? trimmedCurrent === stored : DEFAULT_PASSCODES.includes(trimmedCurrent);
    } catch {
      isCurrentValid = DEFAULT_PASSCODES.includes(trimmedCurrent);
    }

    if (!isCurrentValid) {
      return { success: false, message: 'Current passcode is incorrect.' };
    }

    try {
      localStorage.setItem(PASSCODE_STORAGE_KEY, trimmedNew);
      return { success: true, message: 'Passcode changed successfully!' };
    } catch {
      return { success: false, message: 'Failed to update passcode in storage.' };
    }
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        logout,
        changePasscode,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
