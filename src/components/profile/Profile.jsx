import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex items-center justify-center w-full h-lvh flex-col">
      <Avatar alt="Profile" src="" />
      <h1 className="text-4xl">Hello {user.username}!</h1>
    </div>
  )
}
export default Profile;