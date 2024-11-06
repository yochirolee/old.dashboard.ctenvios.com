import { useTheme } from '../context/ThemeContext';
import { useEffect } from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  const { darkMode } = useTheme();

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div>
      {children}
    </div>
  );
}

export default Layout; 