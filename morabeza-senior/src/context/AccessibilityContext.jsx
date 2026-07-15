import { createContext, useContext, useState } from 'react';

const AccessibilityContext = createContext(null);

export function AccessibilityProvider({ children }) {
  const [fontScale, setFontScale] = useState(() => {
    const saved = localStorage.getItem('morabeza_font_scale');
    return saved ? Number(saved) : 1;
  });

  const changeScale = (novo) => {
    const clamped = Math.min(1.3, Math.max(0.9, novo));
    setFontScale(clamped);
    localStorage.setItem('morabeza_font_scale', String(clamped));
  };

  return (
    <AccessibilityContext.Provider value={{ fontScale, increase: () => changeScale(fontScale + 0.1), decrease: () => changeScale(fontScale - 0.1), reset: () => changeScale(1) }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => useContext(AccessibilityContext);
