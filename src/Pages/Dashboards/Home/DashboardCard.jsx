import {
  RiMoneyDollarBoxLine,
  RiUserCommunityLine,
} from "react-icons/ri";

const DashboardCard = ({ homeData }) => {
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-7">
        <div className="rounded-2xl p-10 text-white bg-[#2898FF]">
          <div className="flex items-center justify-center gap-5">
            <RiUserCommunityLine className="text-4xl" />
            <div className="space-y-3">
              <p className="text-lg">Total User</p>
              <h1 className="text-3xl font-semibold">
                {homeData.data.totalUser}
              </h1>
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-10 text-white bg-[#9B30FF]">
          <div className="flex items-center justify-center gap-5">
            <RiMoneyDollarBoxLine className="text-4xl" />
            <div className="space-y-3">
              <p className="text-lg">Total Earning</p>
              <h1 className="text-3xl font-semibold">
                {homeData.data.totalEarn}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
