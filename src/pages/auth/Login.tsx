import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createSession } from "../../utils/sessionManager";
import { notification } from "antd";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button } from "../../components/ui/Button";
import PageTitle from "../../components/ui/PageTitle";

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        // Simulate a login API call
        const response = await axios.post(
          "https://fha-app-api-uu9ty.ondigitalocean.app/api/v1/auth/customer/login",
          values
        );
        console.log(response);
        if (response.status === 201) {
          // Delay the session creation for 200ms after successful login
          console.log(response.data);

          setTimeout(() => {
            const userDetails = {
              email: response.data.user.email,
              token: response.data.token.accessToken,
              firstname: response.data.user.firstname,
              lastname: response.data.user.lastname,
              // Any other details you might want to store
            };

            // Create a session by encrypting and storing user details
            createSession(userDetails);

            setIsLoading(false);

            // Show success notification
            notification.success({
              message: "Login Successful",
              description: "You have been successfully logged in.",
            });

            // Redirect to dashboard
            navigate("/");
          }, 200); // 200ms delay
        }
      } catch (err) {
        setIsLoading(false);

        // Show error notification
        notification.error({
          message: "Login Failed",
          description: "Invalid email or password.",
        });
      }
    },
  });

  return (
    <>
      <div
        className="min-h-screen flex items-start justify-center bg-primary-3 rounded-[4px]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(54, 162, 235, 0.3) 1px, rgba(54, 162, 235, 0) 1px)`,
          backgroundSize: "20px 20px", // Adjust size of the pattern
        }}
      >
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mt-[10rem]">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#36A2EB]">
            Sign in to your account
          </h2>
          {/* {formik.errors.email && (
          <p className="text-red-500 text-center mb-4">{formik.errors.email}</p>
        )} */}
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...formik.getFieldProps("email")}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#36A2EB]"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="mb-6 relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                {...formik.getFieldProps("password")}
                className="flex items-center w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#36A2EB]"
              />
              <span
                onClick={() => setPasswordVisible(!passwordVisible)}
                className=" h-full absolute inset-y-0 right-0 flex items-center pr-3 mt-[14px] cursor-pointer"
              >
                {passwordVisible && (
                  <EyeSlashIcon className="text-gray-500 w-5 h-5" />
                )}
                {!passwordVisible && (
                  <EyeIcon className="text-gray-500 w-5 h-5" />
                )}
              </span>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="w-full h-[38px]">
              <Button
                mode={"solid"}
                buttonText="Login"
                loading={isLoading}
                defaultColor="primary-1"
                hoverColor="primary-2"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
