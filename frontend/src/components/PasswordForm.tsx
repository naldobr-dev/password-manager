import { useState, useEffect } from 'react';
import type { PasswordRecord } from '../types';
import { motion } from 'framer-motion';
import {
    MdOutlineTitle,
    MdPermIdentity,
    MdOutlineGeneratingTokens,
    MdLockOpen,
    MdPublic,
    MdOutlineInsertComment,
    MdContentCopy,
    MdVisibility,
    MdVisibilityOff
} from "react-icons/md";

interface Props {
    initialData?: PasswordRecord;
    onSave: (data: Partial<PasswordRecord>) => void;
    onCancel: () => void;
}

export default function PasswordForm({ initialData, onSave, onCancel }: Props) {
    const [title, setTitle] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [url, setUrl] = useState('');
    const [notes, setNotes] = useState('');

    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setUsername(initialData.username);
            setPassword(initialData.password);
            setUrl(initialData.url || '');
            setNotes(initialData.notes || '');
        }
    }, [initialData]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSave({ title, username, password, url, notes });
    }

    function handleCopyValue(value: string, label: string) {
        navigator.clipboard.writeText(value);
        setCopiedField(label);
        setTimeout(() => setCopiedField(null), 1500);
    }

    function handleGeneratePassword() {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        const length = 16; // Tamanho da senha gerada
        let newPassword = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            newPassword += charset[randomIndex];
        }
        setPassword(newPassword);
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 w-full max-w-md space-y-4"
            >
                <h2 className="text-xl font-semibold text-center">
                    {initialData ? 'Editar Senha' : 'Nova Senha'}
                </h2>

                {copiedField && (
                    <div className="text-green-600 dark:text-green-400 text-center">
                        {copiedField} copiado!
                    </div>
                )}

                <div className="flex items-center gap-2 pl-2.5 pr-1.5 border rounded border-gray-600 dark:border-gray-200">
                    <MdOutlineTitle size={20} className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full border-0 border-l-1 border-gray-600 dark:border-gray-200 focus:outline-none focus:ring-0 px-3 py-2"
                    />
                </div>

                <div className="flex items-center gap-2 pl-2.5 pr-1.5 border rounded border-gray-600 dark:border-gray-200">
                    <MdPermIdentity size={20} className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full border-0 border-l-1 border-gray-600 dark:border-gray-200 focus:outline-none focus:ring-0 px-3 py-2"
                    />
                    <button
                        type="button"
                        onClick={() => handleCopyValue(username, 'Usuário')}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <MdContentCopy size={20} />
                    </button>
                </div>

                <div className="flex items-center gap-2 pl-2.5 pr-1.5 border rounded border-gray-600 dark:border-gray-200">
                    <MdLockOpen size={26} className="text-gray-500" />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border-0 border-l-1 border-gray-600 dark:border-gray-200 focus:outline-none focus:ring-0 px-3 py-2"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                    </button>
                    <button
                        type="button"
                        onClick={() => handleGeneratePassword()}
                        className="bg-purple-600 text-white rounded px-2 py-1 hover:bg-purple-700 transition"
                        title="Gerar senha forte"
                    >
                        <MdOutlineGeneratingTokens size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleCopyValue(password, 'Senha')}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <MdContentCopy size={20} />
                    </button>
                </div>

                <div className="flex items-center gap-2 pl-2.5 pr-1.5 border rounded border-gray-600 dark:border-gray-200">
                    <MdPublic size={20} className="text-gray-500" />
                    <input
                        type="url"
                        placeholder="URL (opcional)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full border-0 border-l-1 border-gray-600 dark:border-gray-200 focus:outline-none focus:ring-0 px-3 py-2"
                    />
                    <button
                        type="button"
                        onClick={() => handleCopyValue(url, 'URL')}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <MdContentCopy size={20} />
                    </button>
                </div>

                <div className="flex items-start gap-2 pl-2.5 pr-0 border rounded border-gray-600 dark:border-gray-200">
                    <MdOutlineInsertComment size={20} className="text-gray-500 mt-3" />
                    <textarea
                        placeholder="Notas (opcional)"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full border-0 border-l-1 px-3 py-2 focus:outline-none focus:ring-0"
                    />
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Salvar
                    </button>
                </div>
            </motion.form>
        </div>
    );
}
