import { motion } from 'framer-motion';

interface Props {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({ title, message, onConfirm, onCancel }: Props) {
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-gray-700 rounded-xl shadow p-6 w-full max-w-sm space-y-4"
            >
                <h2 className="text-lg font-semibold">{title}</h2>
                <p>{message}</p>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onCancel}
                        className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 text-white font-semibold px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                        Confirmar
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
