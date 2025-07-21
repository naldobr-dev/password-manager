import { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
    onLoginSuccess: () => void;
}

export default function LoginPage({ onLoginSuccess }: Props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (localStorage.getItem('sessionExpired') === 'true') {
            setError('Sessão expirada. Faça login novamente.');
            localStorage.removeItem('sessionExpired');
        }
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });

            localStorage.setItem('token', response.data.token);
            onLoginSuccess();
        } catch {
            setError('Usuário ou senha incorretos.');
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-full max-w-sm space-y-4"
            >
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
                    Login
                </h1>

                {error && (
                    <p className="text-red-600 text-center">{error}</p>
                )}

                <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}