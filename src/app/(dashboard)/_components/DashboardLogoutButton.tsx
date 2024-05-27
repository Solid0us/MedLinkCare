import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";

interface DashboardLogoutButton {
  expand: boolean;
}
const DashboardLogoutButton = ({ expand }: DashboardLogoutButton) => {
  return (
    <div
      className={`${
        !expand && "hidden"
      } hover:bg-red-300 absolute bottom-0 flex flex-row bg-white gap-x-5  hover:cursor-pointer rounded-lg p-3 duration-200 mb-10`}
      onClick={() => signOut()}
    >
      <LogoutIcon />
      <label className={` duration-100 hover:cursor-pointer text-nowrap`}>
        Logout
      </label>
    </div>
  );
};

export default DashboardLogoutButton;
