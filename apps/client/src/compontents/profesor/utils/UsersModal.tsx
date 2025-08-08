import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  ListUsersForCourse,
  approveEnrollment,
} from "../../../network/fetch/Enrollment";

import type { Enrollment } from "../../../interface/enrollment.interface";

interface Props {
  courseId: number;
  onClose: () => void;
}

type EnrollmentWithEmail = Enrollment & {
  email: string;
};

export default function CourseUsersModal({ courseId, onClose }: Props) {
  const [users, setUsers] = useState<EnrollmentWithEmail[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const enrollments = await ListUsersForCourse(courseId);
      setUsers(enrollments);
    } catch {
      toast.error("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (userId: number, currentStatus: string) => {
    try {
      if (currentStatus === "pending") {
        await approveEnrollment(userId, courseId);
        toast.success("Usuario aprobado");
      } else {
        toast.warn("Función para volver a pending aún no implementada");
      }
      fetchUsers();
    } catch {
      toast.error("Error al cambiar estado");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [courseId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Usuarios del curso</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto p-4 space-y-3 flex-1">
          {loading ? (
            <p className="text-gray-500">Cargando...</p>
          ) : users.length === 0 ? (
            <p className="text-gray-500">No hay usuarios inscritos</p>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center border p-2 rounded-lg"
              >
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-gray-500">{user.status}</p>
                </div>
                <button
                  onClick={() => toggleStatus(user.userId, user.status)}
                  className={`px-3 py-1 rounded ${
                    user.status === "pending"
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-yellow-500 text-white hover:bg-yellow-600"
                  }`}
                >
                  {user.status === "pending" ? "Aprobar" : "Volver a Pending"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
