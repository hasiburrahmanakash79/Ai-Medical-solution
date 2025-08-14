import DashboardCard from "./DashboardCard";
import WeeklyActivity from "./WeeklyActivity";
import RecentToken from "./RecentToken";
import useDashboardData from "../../../hooks/useDashboardData";

const Home = () => {
  const { homeData, loading } = useDashboardData();
  const chartData = homeData?.data

  const recentToken = homeData?.data?.userToken;
  
  if(loading){
    return <div>Loading...</div>;
  }
  return (
    <div>
      <DashboardCard  homeData={homeData} loading={loading} />
      <div className="py-10 grid grid-cols-3 gap-7">
        <div className="col-span-1">
          <WeeklyActivity chartData={chartData} />
        </div>
        <div className="col-span-2">
          <RecentToken  recentToken={recentToken} />
        </div>
      </div>
      {/* <RecentUser /> */}
    </div>
  );
};

export default Home;
