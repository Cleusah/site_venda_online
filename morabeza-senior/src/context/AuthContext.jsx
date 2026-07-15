import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

// Conta de demonstração para aceder ao backoffice:
// email: admin@morabezasenior.cv | password: admin123
const ADMIN_ACCOUNT = { email: 'admin@morabezasenior.cv', password: 'admin123', nome: 'Administrador', role: 'admin' };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('morabeza_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem('morabeza_user', JSON.stringify(user));
    else localStorage.removeItem('morabeza_user');
  }, [user]);

  const getRegisteredUsers = () => {
    try {
      return JSON.parse(localStorage.getItem('morabeza_users') || '[]');
    } catch {
      return [];
    }
  };

  const login = ({ email, password }) => {
    if (email === ADMIN_ACCOUNT.email && password === ADMIN_ACCOUNT.password) {
      setUser({ nome: ADMIN_ACCOUNT.nome, email, role: 'admin' });
      return { ok: true };
    }
    const registados = getRegisteredUsers();
    const encontrado = registados.find((u) => u.email === email && u.password === password);
    if (encontrado) {
      setUser({ nome: encontrado.nome, email: encontrado.email, role: 'cliente' });
      return { ok: true };
    }
    return { ok: false, erro: 'Email ou palavra-passe incorretos.' };
  };

  const register = ({ nome, email, password }) => {
    const registados = getRegisteredUsers();
    if (registados.some((u) => u.email === email) || email === ADMIN_ACCOUNT.email) {
      return { ok: false, erro: 'Já existe uma conta com este email.' };
    }
    const novo = { nome, email, password };
    localStorage.setItem('morabeza_users', JSON.stringify([...registados, novo]));
    setUser({ nome, email, role: 'cliente' });
    return { ok: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
