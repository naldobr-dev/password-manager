import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { PasswordRecord } from '../types';
import PasswordForm from './PasswordForm';
import SuccessAlert from './SuccessAlert';
import ConfirmModal from './ConfirmModal';
import { MdAdd, MdSearch, MdOutlineMoreVert, MdEditNote, MdOutlinePlaylistRemove } from "react-icons/md";

export default function PasswordList() {
  const [passwords, setPasswords] = useState<PasswordRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [detailOpenId, setDetailOpenId] = useState<string | null>(null);
  const [editingRecord, setEditingRecord] = useState<PasswordRecord | null>(null);
  const [creatingNew, setCreatingNew] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deletingRecordId, setDeletingRecordId] = useState<string | null>(null);

  // Estado para armazenar o termo de busca
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPasswords();
  }, []);

  async function loadPasswords() {
    try {
      const data = await api.getAll();
      setPasswords(data as PasswordRecord[]);
    } catch (error) {
      console.error(error);
      alert('Erro ao carregar as senhas.');
    } finally {
      setLoading(false);
    }
  }

  function toggleMenu(id: string) {
    setMenuOpenId(menuOpenId === id ? null : id);
  }

  function toggleDetails(id: string) {
    setDetailOpenId(detailOpenId === id ? null : id);
  }

  // Função chamada ao clicar em "Editar"
  function startEditing(item: PasswordRecord) {
    setEditingRecord(item);
  }

  // Função para salvar a edição
  async function handleSave(data: Partial<PasswordRecord>) {
    if (editingRecord) {
      await api.update(editingRecord._id, data);
      setEditingRecord(null);
      loadPasswords();
      showSuccess('Senha atualizada com sucesso!');
    }
  }

  // Função para salvar nova senha
  async function handleCreate(data: Partial<PasswordRecord>) {
    await api.create(data);
    setCreatingNew(false);
    loadPasswords();
    showSuccess('Senha cadastrada com sucesso!');
  }

  // Função para exibir mensagem de sucesso
  function showSuccess(message: string) {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  }

  // Função para confirmar exclusão
  function requestDelete(id: string) {
    setDeletingRecordId(id);
  }

  // Função para excluir senha
  async function confirmDelete() {
    if (deletingRecordId) {
      await api.remove(deletingRecordId);
      setDeletingRecordId(null);
      loadPasswords();
      showSuccess('Senha excluída com sucesso!');
    }
  }

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Carregando...</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto text-gray-900 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center">Minhas Senhas</h1>

      <button
        onClick={() => setCreatingNew(true)}
        className="flex items-center mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mx-auto"
      >
        <MdAdd size={20} className="inline mr-2" />
        Nova Senha
      </button>

      <div className="flex items-center my-4 mx-1 border border-gray-800 dark:border-gray-600 rounded-2xl dark:bg-gray-800 dark:text-white">
        <MdSearch size={28} className="text-gray-500 ml-2" />
        <input
          type="search"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border-0 px-2 py-2 focus:outline-none focus:ring-0"
          autoFocus
        />
      </div>

      {passwords.length === 0 ? (
        <p className="text-center text-gray-500">Nenhuma senha encontrada.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {passwords
            .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((item) => (
              <div
                key={item._id}
                className="relative bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-2xl shadow p-4 hover:shadow-lg transition"
              >
                {/* Botão de menu */}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => toggleMenu(item._id)}
                    className="text-gray-600 hover:text-gray-900 cursor-pointer mt-1"
                  >
                    <MdOutlineMoreVert size={18} />
                  </button>

                  {menuOpenId === item._id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-900 border border-gray-600 rounded shadow z-10">
                      <button
                        onClick={() => startEditing(item)}
                        className="flex items-center gap-1 w-full text-left px-4 py-2 text-sm hover:bg-gray-300 dark:hover:bg-gray-700"
                      >
                        <MdEditNote size={20} />
                        Editar
                      </button>
                      <button
                        onClick={() => requestDelete(item._id)}
                        className="flex items-center gap-1 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-300 dark:hover:bg-gray-700"
                      >
                        <MdOutlinePlaylistRemove size={20} />
                        Excluir
                      </button>
                    </div>
                  )}
                </div>

                {/* Conteúdo do cartão */}
                <h2
                  className="text-xl font-semibold mb-2 cursor-default"
                  onClick={() => toggleDetails(item._id)}
                >{item.title}</h2>
                {detailOpenId === item._id && (
                  <div className=''>
                    <hr className="my-1 border-gray-400" />
                    <div className="mb-1">
                      <span className="font-medium">Usuário:</span> {item.username}
                    </div>
                    <div className="mb-1">
                      <span className="font-medium">Senha:</span>{' '}
                      <span className="font-mono">{
                        // exibe a senha como "•"
                        item.password.replace(/./g, '•')
                      }</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(item.password)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        Copiar
                      </button>
                    </div>
                    {item.url && (
                      <div className="flex mb-1">
                        <span className="font-medium mr-1.5">URL:</span>{' '}
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline truncate w-full block"
                        >
                          {item.url}
                        </a>
                      </div>
                    )}
                    <hr className="my-2 border-gray-300" />
                  </div>
                )}
                {item.notes && (
                  <div className="mt-2 text-sm text-gray-500">
                    <span className="font-medium text-gray-600">Notas:</span>{' '}
                    {item.notes}
                  </div>
                )}

              </div>
            ))}

          {/* Formulário de criação */}
          {creatingNew && (
            <PasswordForm
              onSave={handleCreate}
              onCancel={() => setCreatingNew(false)}
            />
          )}

          {/* Formulário de edição */}
          {editingRecord && (
            <PasswordForm
              initialData={editingRecord}
              onSave={handleSave}
              onCancel={() => setEditingRecord(null)}
            />
          )}

          {/* Mensagem de sucesso */}
          {successMessage && (
            <SuccessAlert
              message={successMessage}
              onClose={() => setSuccessMessage(null)}
            />
          )}

          {deletingRecordId && (
            <ConfirmModal
              title="Confirmar exclusão"
              message="Deseja realmente excluir esta senha? Esta ação não poderá ser desfeita."
              onConfirm={confirmDelete}
              onCancel={() => setDeletingRecordId(null)}
            />
          )}
        </div>
      )}
    </div>
  );
}
