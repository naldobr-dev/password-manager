import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function Navbar() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Ao carregar, lê do localStorage
        const storedTheme = localStorage.getItem('theme');
        setIsDark(storedTheme === 'dark');
    }, []);

    useEffect(() => {
        const html = document.documentElement;

        if (isDark) {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    function toggleDarkMode() {
        setIsDark(!isDark);
    }

    function handleLogout() {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <nav className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center rounded-b-xl transition">
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Password Manager
            </h1>

            <div className='flex items-center gap-4'>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white font-semibold px-3 py-1 rounded hover:bg-red-700 transition"
                >
                    Sair
                </button>
                <button
                    onClick={toggleDarkMode}
                    className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                    {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
                    {isDark ? 'Claro' : 'Escuro'}
                </button>
            </div>
        </nav>
    );
}
