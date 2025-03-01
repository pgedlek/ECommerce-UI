import React, { useState } from 'react';
import { AiOutlineLogin } from 'react-icons/ai';
import InputField from '../shared/InputField';
import Spinners from '../shared/Spinners';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaAddressCard } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const AddAddressForm = () => {
  const { btnLoader } = useSelector((state) => state.errors);
  const [loader, setLoader] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'onTouched' });

  const onSaveHandler = async (data) => {

  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form onSubmit={handleSubmit(onSaveHandler)}
        className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md">
        <div className="flex items-center justify-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
          <FaAddressCard className="mr-2 text-2xl" />
          Add Aaddress

        </div>

        <div className="flex flex-col gap-4">
          <InputField label="Building name" required id="building" type="text" message="Building name is required" placeholder="Enter your building name" register={register} errors={errors} />
          <InputField label="City" required id="city" type="text" message="City is required" placeholder="Enter your city" register={register} errors={errors} />
          <InputField label="State" required id="state" type="text" message="State is required" placeholder="Enter your state" register={register} errors={errors} />
          <InputField label="Pincode" required id="pincode" type="text" message="Pincode is required" placeholder="Enter your pincode" register={register} errors={errors} />
          <InputField label="Street" required id="street" type="text" message="Street is required" placeholder="Enter your street" register={register} errors={errors} />
          <InputField label="Country" required id="country" type="text" message="Country is required" placeholder="Enter your country" register={register} errors={errors} />
          <button disabled={btnLoader}
            type="submit"
            className="text-white bg-custom-blue px-4 py-2 rounded-md mt-4">
            {btnLoader ? (
              <>
                <Spinners /> Loading...
              </>
            ) : (
              <>Save</>
            )
            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddAddressForm;