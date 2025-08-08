import { useEffect, useState } from "react";
import { listOfUsers, deleteUser } from "../../network/fetch/Users";
import type { User } from "../../interface/user.interface";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Modal from "./utils/Modal";
import EditUserForm from "./utils/EditUserForm";

const ListOfUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);

  const fetchUsers = async () => {
    try {
      const data = await listOfUsers();
      setUsers(data);
    } catch {
      toast.error("Error al obtener usuarios");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const closeModal = () => {
    setSelectedUser(null);
    setModalType(null);
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setModalType("edit");
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setModalType("delete");
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser.id);
      toast.success("Usuario eliminado");
      fetchUsers();
      closeModal();
    } catch (error) {
      toast.error("Error al eliminar usuario");
      console.log(error);
    }
  };
  const roleLabels: {
    admin: string;
    student: string;
    prof: string;
  } = {
    admin: "ADMIN",
    student: "ESTUDIANTE",
    prof: "PROFESOR",
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold">{user.email}</h2>
            <p className="text-sm text-gray-600">{user.name}</p>
            <div className="flex justify-between items-center">
              <h2>
                <span>
                  {roleLabels[user.role as keyof typeof roleLabels] ||
                    "Rol desconocido"}
                </span>
              </h2>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => openEditModal(user)}
                  className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                >
                  <FaEdit /> Editar
                </button>
                <button
                  onClick={() => openDeleteModal(user)}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  <MdDeleteForever /> Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!modalType}
        onClose={closeModal}
        title={
          modalType === "edit" ? "Editar Usuario" : "Confirmar Eliminación"
        }
      >
        {modalType === "edit" && selectedUser && (
          <EditUserForm
            user={selectedUser}
            onClose={closeModal}
            onUpdated={fetchUsers}
          />
        )}
        {modalType === "delete" && selectedUser && (
          <div>
            <p>
              ¿Estás seguro que querés eliminar a{" "}
              <strong>{selectedUser.email}</strong>?
            </p>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Aceptar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ListOfUsers;
