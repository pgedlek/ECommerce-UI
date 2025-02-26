import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';

const UserMenu = () => {
  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = () => {

  };
  return (
    <div className='relative z-30'>
      <div className='sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700'
        onClick={handleClick}>
        <Avatar alt="Menu" src="" />
      </div>
      <Menu
        sx={{ width: "400px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx: { width: 160 }
        }}
      >
        <Link to="/profile">
          <MenuItem onClick={handleClose} className='flex gap-2'>
            <BiUser className="text-xl" />
            <span className='font-bold text-[16px] mt-1'>
              {user?.username}
            </span>
          </MenuItem>
        </Link>
        <Link to="/profile/orders">
          <MenuItem onClick={handleClose} className='flex gap-2'>
            <FaShoppingCart className="text-xl" />
            <span className='font-semibold'>
              Order
            </span>
          </MenuItem>
        </Link>

        <MenuItem onClick={logoutHandler} className='flex gap-2'>
          <div className='font-semibold w-full flex gap-2 items-center button-gradient px-4 py-1 text-white rounded-sm'>
            <IoExitOutline className="text-xl" />
            <span className='font-bold text-[16px] mt-1'>
              Logout
            </span>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default UserMenu;