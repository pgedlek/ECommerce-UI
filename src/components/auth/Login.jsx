import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { authenticateSingInUser } from "../../store/actions";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'onTouched' });

  const loginHandler = async (data) => {
    dispatch(authenticateSingInUser(data, toast, reset, navigate, setLoader))
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form onSubmit={handleSubmit(loginHandler)}
        className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md">
        <div className="flex flex-col items-center justify-center space-y-4">
          <AiOutlineLogin className="text-slate-800 text-5xl" />
          <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
            Login here
          </h1>
        </div>
        <hr className="mt-2 mb-5 text-black" />
        <div className="flex flex-col gap-3">
          <InputField label="Username" required id="username" type="text" message="Username is required" placeholder="Enter your username" register={register} errors={errors} />
          <InputField label="Password" required id="password" type="password" message="Password is required" placeholder="Enter your password" register={register} errors={errors} />
          <button disabled={loader}
            type="submit"
            className="button-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3">
            {loader ? (
              <>
                <Spinners /> Loading...
              </>
            ) : (
              <>Login</>
            )
            }
          </button>
          <p className="text-center text-sm text-slate-700 mt-6">
            Don't have an account?
            <Link to="/register" className="font-semibold underline hover:text-black">
              <span> Sign up</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;