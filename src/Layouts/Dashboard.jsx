import logo from "../assets/logo/logo.png";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import { RiSettings4Line, RiFlagLine, RiFileList3Line, RiUserCommunityLine } from "react-icons/ri";
import { FaRightFromBracket } from "react-icons/fa6";
import { IconContext } from "react-icons";
import Swal from "sweetalert2";

const Dashboard = () => {
  const location = useLocation();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "No, Cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("User logged out");
      }
    });
  };

  const iconMappings = {
    Home: BiHomeAlt2,
    User: RiUserCommunityLine,
    Settings: RiSettings4Line,
    Quote: RiFileList3Line,
    Challenge: RiFlagLine,
  };

  const Menus = [
    {
      title: "Dashboard",
      path: "/",
      icon: iconMappings.Home,
      role: "admin",
      gap: true,
    },
    {
      title: "User",
      path: "/user",
      icon: iconMappings.User,
      role: "admin",
    },
    {
      title: "Tokens",
      path: "/token",
      icon: iconMappings.Quote,
      role: "admin",
    },
    {
      title: "Settings",
      path: "/setting",
      icon: iconMappings.Settings,
      role: "admin",
    },
  ];

  const adminMenus = Menus.filter((menu) => menu.role === "admin");

  return (
    <div className="flex text-black">
      {/* Sidebar */}
      <div
        className="w-60 p-4 h-screen shadow-xl fixed left-0 top-0 bottom-0 z-50 pt-8 transition-all duration-500 bg-[#B7C8FF]"

      >
        <div className="mb-7">
          <img
            src={logo}
            alt="logo"
            className={`cursor-pointer w-24 p-1 duration-500`}
          />
        </div>

        <ul
          className={`${
            open ? "" : "flex flex-col items-center justify-center"
          }`}
        >
          {adminMenus.map((Menu, index) => (
            <Link
              to={Menu.path}
              key={index}
              className={`flex rounded-full p-2 cursor-pointer text-sm items-center gap-x-4 mt-3 ${
                location.pathname === Menu.path
                  ? "text-[#007AFF]"
                  : "hover:bg-[#007AFF]/5"
              }`}
            >
              <li className="flex items-center gap-x-3 ps-2 text-md">
                <IconContext.Provider
                  value={{ className: "react-icon text-2xl" }}
                >
                  <Menu.icon />
                </IconContext.Provider>
                <span className={`origin-left duration-200`}>{Menu.title}</span>
              </li>
            </Link>
          ))}
        </ul>

        <div className="mt-28 bottom-10 absolute w-full">
          <button
            onClick={handleLogout}
            className={`flex cursor-pointer text-sm items-center justify-center  p-2 w-4/5 ms-2.5 rounded bg-red-400 text-white`}
          >
            <li className="flex items-center justify-center gap-x-4 w-full">
              <FaRightFromBracket />
              <span className={`origin-left duration-200`}>Logout</span>
            </li>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`pl-64 text-black p-4 ms-3 flex-1 overflow-y-auto transition-all duration-500 h-[100vh]`}
      >
        <div className=" py-4 flex justify-between items-center mb-5">
          {/* Left Section */}
          <div>
            <h1 className="text-2xl font-semibold">
              Welcome, John 👋
            </h1>
            <p className="text-sm ">Have a wonderful day!</p>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src="https://img.daisyui.com/images/profile/demo/wonderperson@192.webp"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-medium ">John Max</span>
              <p className="text-gray-400 text-sm">Admin</p>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
