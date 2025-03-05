import React, { useState } from 'react'
import Skeletons from '../shared/Skeletons';
import { FaAddressBook } from 'react-icons/fa';
import AddressInfoModal from './AddressInfoModal';
import AddAddressForm from './AddAddressForm';
import { useDispatch, useSelector } from 'react-redux';
import AddressList from './AddressList';
import { DeleteModal } from './DeleteModal';
import toast from 'react-hot-toast';
import { deleteUserAddress } from '../../store/actions';

const AddressInfo = ({ address }) => {
  const dispatch = useDispatch();

  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const noAddressExist = !address || address.length === 0;
  const { isLoading, btnLoader } = useSelector((state) => state.errors);

  const addNewAddressHandler = () => {
    setSelectedAddress("");
    setOpenAddressModal(true);
  }

  const deleteAddressHandler = () => {
    dispatch(deleteUserAddress(toast, selectedAddress?.addressId, setOpenDeleteModal));
  }

  return (
    <div className='pt-4'>
      {noAddressExist ? (
        <div className='p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center'>
          <FaAddressBook size={50} className='text-gray-500 mb-4' />
          <h1 className='mb-2 text-slate-900 text-center font-semibold text-2xl'>
            No Address yet
          </h1>
          <p className='mb-6 text-slate-800 text-center'>
            Please add your address to complete purchase
          </p>
          <button onClick={addNewAddressHandler}
            className='px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-all'>
            Add address
          </button>
        </div>
      ) : (
        <div className='relative p-6 rounded-lg max-w-md mx-auto'>
          <h1 className='text-slate-800 text-center font-bold text-2xl'>
            Select address
          </h1>
          {isLoading ? (
            <div className='py-4 px-8'>
              <Skeletons />
            </div>
          ) : (
            <React.Fragment>
              <div className='space-y-4 pt-6'>
                <AddressList addresses={address} setSelectedAddress={setSelectedAddress} setOpenAddressModal={setOpenAddressModal} setOpenDeleteModal={setOpenDeleteModal} />
              </div>

              {address.length > 0 && (
                <div className='mt-4'>
                  <button onClick={addNewAddressHandler}
                    className='px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-all'>
                    Add more
                  </button>
                </div>
              )}
            </React.Fragment>
          )}
        </div>
      )}

      <AddressInfoModal
        open={openAddressModal}
        setOpen={setOpenAddressModal}
      >
        <AddAddressForm address={selectedAddress} setOpenAddressModal={setOpenAddressModal} />
      </AddressInfoModal>

      <DeleteModal open={openDeleteModal} loader={btnLoader} setOpen={setOpenDeleteModal} title="Delete Address" onDeleteHandler={deleteAddressHandler} />
    </div>
  )
}

export default AddressInfo