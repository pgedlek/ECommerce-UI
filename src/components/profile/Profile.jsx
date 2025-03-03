import { Avatar } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../store/actions";
import { FaBuilding, FaStreetView } from "react-icons/fa";
import { MdLocationCity, MdPinDrop, MdPublic } from "react-icons/md";

const Profile = () => {
  const dispatch = useDispatch();
  const { userdetails } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch])

  return (
    <div className="flex flex-col w-full h-lvh px-10 py-10">
      <h1 className="text-center text-slate-600 text-3xl">Your profile</h1>
      <div className="flex justify-items-start flex-col">
        <Avatar alt="Profile" src="" />
        <p><span className="font-semibold">User:</span> {userdetails?.username}</p>
        <p><span className="font-semibold">Email:</span> {userdetails?.email}</p>
        <p><span className="font-semibold">Addresses:</span></p>
        <ul className="mt-2 flex flex-row">
          {userdetails?.addresses.map((address) => (
            <div key={address.addressId} className='flex items-center border mr-2 p-2 rounded-lg'>
              <div className='space-y-1'>
                <div className='flex items-center'>
                  <FaBuilding size={14} className='mr-2 text-gray-600' />
                  <p className='font-semibold'>{address.buildingName}</p>
                </div>

                <div className='flex items-center'>
                  <FaStreetView size={17} className='mr-2 text-gray-600' />
                  <p>{address.street}</p>
                </div>

                <div className='flex items-center'>
                  <MdLocationCity size={17} className='mr-2 text-gray-600' />
                  <p>{address.city}, {address.state}</p>
                </div>

                <div className='flex items-center'>
                  <MdPinDrop size={17} className='mr-2 text-gray-600' />
                  <p>{address.pincode}</p>
                </div>

                <div className='flex items-center'>
                  <MdPublic size={17} className='mr-2 text-gray-600' />
                  <p>{address.country}</p>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default Profile;