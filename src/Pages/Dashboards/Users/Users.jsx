import { useState } from "react";
import { RiArrowLeftLine, RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import CommonModal from "../../../components/Common/CommonModal"; // ✅ Make sure this path is correct
import useUser from "../../../hooks/useUser";

const Users = () => {
  const { users, loading } = useUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsModalOpen(true);
  };
  console.log(users);

  const confirmDelete = () => {
    console.log("Deleted user:", userToDelete);
    // TODO: Remove user from list or trigger API call here
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex items-center gap-3 mb-6">
          <button
            className="text-2xl cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <RiArrowLeftLine />
          </button>
          <h1 className="text-2xl font-semibold">All Users</h1>
        </div>
        <div className="border border-gray-200 rounded-xl p-5">
          <table className="min-w-full rounded-xl text-center overflow-hidden">
            <thead>
              <tr className="text-sm bg-[#B7C8FF]">
                <th className="p-4 text-left rounded-tl-xl">User Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Specialty</th>
                <th className="p-4">Country</th>
                <th className="p-4 rounded-tr-xl">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-center">
              {users.data.map((user, idx) => (
                <tr key={idx} className="border-t border-gray-200">
                  <td className="py-3 px-4 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full">
                        <img
                        className="object-cover rounded-full"
                        src={`https://01t71ck4-4005.inc1.devtunnels.ms${user.image}`}
                        alt="image"
                        crossOrigin="anonymous"
                      />
                      </div>
                      <span>{user.fullName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.specialty}</td>
                  <td className="py-3 px-4">{user.country}</td>
                  <td className="py-4 px-4 flex justify-center text-xl">
                    <button onClick={() => handleDeleteClick(user)}>
                      <RiDeleteBin5Line className="text-red-500 hover:text-red-700 transition" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Delete Confirmation Modal */}
        <CommonModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Confirm Delete"
        >
          {userToDelete && (
            <div className="space-y-4 text-center">
              <p className="text-lg">
                Are you sure you want to delete{" "}
                <span className="">{userToDelete.name}</span>?
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="border border-blue-300 px-5 py-3 rounded-md"
                >
                  Cancel
                </button>
                <button onClick={confirmDelete} className="btn-primary">
                  Confirm
                </button>
              </div>
            </div>
          )}
        </CommonModal>
      </div>
    </div>
  );
};

export default Users;
