import { useEffect, useState } from 'react';
import PasswordList from './components/PasswordList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated ? (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-6">
        <PasswordList />
      </div>
    </div>
  ) : (
    <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
  );
}
