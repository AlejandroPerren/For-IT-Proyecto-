import { useEffect, useState } from "react";
import { listOfUsers } from "../../network/fetch/Users";
import { toast } from "react-toastify";
import type { User } from "../../interface/user.interface";

const ListOfUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await listOfUsers();
        setUsers(data);
      } catch (error) {
        console.log(error);
        toast.error("Algo Salio Mal", {
          position: "top-right",
        });
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {user.email}
          </h2>
          <p className="text-gray-600 mb-4">{user.name}</p>
          <span className="text-sm text-gray-500">role: {user.role}</span>
          <div></div>
        </div>
      ))}
    </div>
  );
};

export default ListOfUsers;
