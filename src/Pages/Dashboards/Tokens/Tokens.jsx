import { useState } from "react";
import {
  RiArrowLeftLine,
  RiCopperCoinLine,
  RiDeleteBin5Line,
} from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import CommonModal from "../../../components/Common/CommonModal";
import useTokenData from "../../../hooks/useTokenData";


const Tokens = () => {
  const {tokenData, loading} = useTokenData();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tokenToDelete, setTokenToDelete] = useState(null);
  const userList = tokenData?.data?.users
  console.log(userList);

  const handleDeleteClick = (token) => {
    setTokenToDelete(token);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleted user:", tokenToDelete);
    // TODO: Remove token from list or trigger API call here
    setIsDeleteModalOpen(false);
    setTokenToDelete(null);
  };
  console.log(tokenData, 'tokenData');

  if(loading){
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          className="text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <RiArrowLeftLine />
        </button>
        <h1 className="text-2xl font-semibold">Tokens</h1>
      </div>
      <div className="grid grid-cols-3 gap-7 my-10">
        <div className="rounded-2xl p-10 text-white bg-[#2898FF]">
          <div className="flex items-center justify-center gap-5">
            <RiCopperCoinLine className="text-4xl" />
            <div className="space-y-3">
              <p className="text-lg">This Month Sell</p>
              <h1 className="text-3xl font-semibold">{tokenData?.data?.thisMonthTokens}</h1>
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-10 text-white bg-[#9B30FF]">
          <div className="flex items-center justify-center gap-5">
            <RiCopperCoinLine className="text-4xl" />
            <div className="space-y-3">
              <p className="text-lg">Last Month Sell</p>
              <h1 className="text-3xl font-semibold">{tokenData?.data?.lastMonthTokens}</h1>
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-10 text-white bg-[#FF3EC8]">
          <div className="flex items-center justify-center gap-5">
            <RiCopperCoinLine Line className="text-4xl" />
            <div className="space-y-3">
              <p className="text-lg">Tokens Used This Month</p>
              <h1 className="text-3xl font-semibold">300</h1>
            </div>
          </div>
        </div>
      </div>

      <table className="min-w-full rounded-xl text-left overflow-hidden">
        <thead>
          <tr className="text-sm  bg-[#B7C8FF]">
            <th className="p-4"></th>
            <th className="p-4">Username</th>
            <th className="p-4">Email</th>
            <th className="p-4">Token</th>
            <th className="p-4">Last Refill</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {userList.map((token, index) => (
            <tr key={token?.id} className="border-t border-gray-200">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4 text-left hover:text-blue-500 hover:underline">
                <Link to={`/author/${token?._id}`}>{token?.fullName}</Link>
              </td>
              <td className="py-3 px-4">{token?.email}</td>
              <td className="py-3 px-4">{token?.currentToken}</td>
              <td className="py-3 px-4">{token?.lastBuyDate}</td>
              <td className="py-3 px-4">
                <button onClick={() => handleDeleteClick(token)}>
                  <RiDeleteBin5Line className="text-red-500 hover:text-red-700 transition cursor-pointer" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Delete Confirmation Modal */}
      <CommonModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
      >
        {tokenToDelete && (
          <div className="space-y-4 text-center">
            <p className="text-lg">Are you sure you want to delete?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="border px-5 py-3 rounded-md"
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
  );
};

export default Tokens;
