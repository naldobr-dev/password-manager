import { motion } from 'framer-motion';

interface Props {
  message: string;
  onClose: () => void;
}

export default function SuccessAlert({ message, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow z-50"
    >
      {message}
      <button
        onClick={onClose}
        className="ml-4 underline font-semibold"
      >
        Fechar
      </button>
    </motion.div>
  );
}