import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { registerNewUser } from "../../store/actions";
import toast from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'onTouched' });

  const registerHandler = async (data) => {
    dispatch(registerNewUser(data, toast, reset, navigate, setLoader))
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form onSubmit={handleSubmit(registerHandler)}
        className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md">
        <div className="flex flex-col items-center justify-center space-y-4">
          <FaUserPlus className="text-slate-800 text-5xl" />
          <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
            Register here
          </h1>
        </div>
        <hr className="mt-2 mb-5 text-black" />
        <div className="flex flex-col gap-3">
          <InputField label="Username" required id="username" type="text" message="Username is required" placeholder="Enter your username" register={register} errors={errors} />
          <InputField label="Email" required id="email" type="email" message="Email is required" placeholder="Enter your email" register={register} errors={errors} />
          <InputField label="Password" required id="password" type="password" min={6} message="Password is required" placeholder="Enter your password" register={register} errors={errors} />
          <button disabled={loader}
            type="submit"
            className="button-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3">
            {loader ? (
              <>Loading...</>
            ) : (
              <>Register</>
            )
            }
          </button>
          <p className="text-center text-sm text-slate-700 mt-6">
            Already have an account?
            <Link to="/login" className="font-semibold underline hover:text-black">
              <span> Login</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;