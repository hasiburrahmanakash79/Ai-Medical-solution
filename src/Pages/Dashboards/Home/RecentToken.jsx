import { Link } from "react-router-dom";

const RecentToken = ({recentToken}) => {

  return (
    <div className="overflow-x-auto border h-full border-gray-200 rounded-xl p-5">
      <h2 className="text-2xl font-semibold mb-3">Recent Token</h2>

      <table className="min-w-full rounded-xl text-left overflow-hidden">
        <thead className="">
          <tr className="text-sm  bg-[#B7C8FF]">
            <th className="p-4">User Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Token</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {recentToken.map((token, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="py-3 px-4 text-left hover:text-blue-500 hover:underline">
                <Link to={`/author/${token?._id}`}>{token?.fullName}</Link>
              </td>
              <td className="py-3 px-4">{token?.email}</td>
              <td className="py-3 px-4">{token?.token}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentToken;
