import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateToken: (newToken: string) => void;
}

interface User {
  id: string;
  email: string;
  // Add other user properties as needed
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem(USER_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY);
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem(TOKEN_KEY);
  });

  const login = (userData: User, newToken: string) => {
    setUser(userData);
    setToken(newToken);
    setIsAuthenticated(true);
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  const updateToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem(TOKEN_KEY, newToken);
  };

  // Optional: Add a token expiration check
  useEffect(() => {
    if (token) {
      const checkTokenExpiration = () => {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.exp * 1000 < Date.now()) {
            logout();
          }
        } catch (error) {
          console.error('Error checking token expiration:', error);
          logout();
        }
      };

      checkTokenExpiration();
      const interval = setInterval(checkTokenExpiration, 60000); // Check every minute
      return () => clearInterval(interval);
    }
  }, [token]);

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        token,
        login, 
        logout,
        updateToken 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
