import {
  RiBarChartBoxLine,
  RiCopperCoinLine,
  RiFlagLine,
  RiUserCommunityLine,
} from "react-icons/ri";

const DashboardCard = () => {
  return (
    <div className="grid grid-cols-7 gap-7">
      <div className="col-span-5 grid grid-cols-3 gap-7">
        <div className="rounded-2xl p-10 text-white bg-[#2898FF]">
          <div className="flex items-center justify-center gap-5">
            <RiUserCommunityLine className="text-4xl" />
            <div className="space-y-3">
              <p className="text-lg">Total User</p>
              <h1 className="text-3xl font-semibold">120</h1>
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-10 text-white bg-[#9B30FF]">
          <div className="flex items-center justify-center gap-5">
            <RiCopperCoinLine className="text-4xl" />
            <div className="space-y-3">
              <p className="text-lg">Total Earning</p>
              <h1 className="text-3xl font-semibold">233</h1>
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-10 text-white bg-[#FF3EC8]">
          <div className="flex items-center justify-center gap-5">
            <RiFlagLine className="text-4xl" />
            <div className="space-y-3">
              <p className="text-lg">Total Sold</p>
              <h1 className="text-3xl font-semibold">300</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-2xl p-10 text-white bg-[#319F43] col-span-2">
        <div className="flex items-center justify-center gap-5">
          <RiBarChartBoxLine className="text-4xl" />
          <div className="space-y-3">
            <p className="text-lg">Active User Today</p>
            <h1 className="text-3xl font-semibold">220</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
