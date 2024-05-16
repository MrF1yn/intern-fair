"use client";
import React, { useState, useEffect } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import Image from "next/image";
import { createUserr } from "@/actions/user";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
   
    validateForm();
  }, [formData]);

  const validateForm = () => {

    const isNameValid = formData.name.trim() !== "";
    const isEmailValid = /\S+@\S+\.\S+/.test(formData.email);
    const isPasswordValid =
      formData.password.length >= 6 && formData.password.length <= 20;

   
    setIsFormValid(isNameValid && isEmailValid && isPasswordValid);
  };
 

  const handleCreateUser = (e) => {
    e.preventDefault();
    validateForm();
    const isTermsChecked = e.target.check.checked;


    if (!isFormValid || !isTermsChecked) {
      if (!isFormValid) {
        if (!formData.name) {
          toast.error("Name is required");
          return;
        }
        if (!formData.email) {
          toast.error("Email is required");
          return;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          toast.error("Invalid email");
          return;
        }
        if (!formData.password) {
          toast.error("Password is required");
          return;
        } else if (formData.password.length < 6) {
          toast.error("Password must be at least 6 characters");
          return;
        } else if (formData.password.length > 20) {
          toast.error("Password cannot be more than 20 characters");
          return;
        }
      }
      if (!isTermsChecked) {
        toast.error("Please accept the Terms and Services");
        return;
      }
    }
    toast.promise(createUserr(formData), {
      loading: "Creating Account...",
      success: (res) => {
        setTimeout(() => {
          router.push("/login");
        }, 2000);
        return <b>{res.message}</b>;
      },
      error: (err) => <b>{err.message}</b>,
    });
  };

  return (
    <>
      <div className="content  flex justify-center items-center  max-w-full mx-auto p-[1.75rem] sm:p-[0rem] ">
        <div className="flex flex-col justify-center items-center mx-auto gap-2 place-self-center">
          <div className="back-button text-xl  flex  w-full sm:w-[70%] h-16 ">
            <div className="back-button flex gap-3 items-center justify-center">
              <div className="h-5 w-5">
                <Image src="/images/back.png" height={20} width={20} />
              </div>
              <div>Back</div>
            </div>
          </div>
          <div className="form-container flex flex-col items-center justify-center gap-[1.8rem] h-auto w-full sm:w-full flex-grow-1 flex-shrink-0 ">
            <div className="header flex flex-col gap-4 w-full sm:w-[70%] text-center sm:text-start">
              <div className="font-extrabold text-3xl">Create an Account</div>
              <div>Enter your details to create your account!</div>
              <div className="google-signup flex items-center justify-center bg-[#F4F5FA] w-full h-12 rounded-lg">
                <div className="mr-2">
                  <Image
                    src="/images/Group.png"
                    height={20}
                    width={20}
                    alt="google"
                  />
                </div>
                <div>Sign in with Google</div>
              </div>
            </div>
            <div className="flex flex-col w-[60%]  items-center">
              <Image
                src="/images/Separator.png"
                height={500}
                width={800}
                alt="separator"
              />
            </div>
            <form
              className="flex flex-col gap-3 w-full sm:w-[70%]"
              onSubmit={(e) => handleCreateUser(e)}
            >
              <label htmlFor="name" className="text-[#182467]">
                Name*
              </label>
              <input
                type="text"
                id="name"
                className="w-full h-12 border-2 rounded-lg px-4 focus:border-[#1F3DD9]"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <label htmlFor="email" className="text-[#182467]">
                Email*
              </label>
              <input
                type="email"
                id="email"
                className="w-full h-12 border-2 rounded-lg px-4 focus:border-[#1F3DD9] placeholder-gray-400"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <label htmlFor="password" className="text-[#182467]">
                Password*
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  maxLength={20}
                  className="w-full h-12 border-2 rounded-lg px-4 focus:border-[#1F3DD9]"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-6 top-[50%] -translate-y-1/2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaRegEye
                      height={20}
                      width={20}
                      style={{ color: "#A3AED0", width: "20px" }}
                    />
                  ) : (
                    <FaRegEyeSlash
                      height={20}
                      width={20}
                      style={{ color: "#A3AED0", width: "20px" }}
                    />
                  )}
                </button>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="check" className="mr-2" />
                <label
                  htmlFor="check"
                  className="text-[#3A4264] mbMini:text-xs mbXSmall:text-sm font-sans"
                >
                  I accept the{" "}
                  <a href="#" className="text-[#1F3DD9] ">
                    Terms and services
                  </a>{" "}
                  as well as{" "}
                  <a href="#" className="text-[#1F3DD9] ">
                    Privacy policy
                  </a>
                </label>
              </div>
              <button
                className="bg-[#1F3DD9] text-white h-12 w-1/2 rounded-lg"
                type="submit"
              >
                Sign Up
              </button>
              <div className=" w-full sm:w-[70%] font-medium">
                Already have an account?{" "}
                <Link href="/login" className="text-[#1F3DD9] font-medium">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div className="image-container w-[40%] h-screen  hidden lg:block">
          <Image
            src="/images/signup.png"
            alt="signup-image"
            height={500}
            width={500}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </>
  );
}
