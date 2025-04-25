import { useState } from "react";
import Form from "./Form";

const Login = () => {
  const [formFor, setFormFor] = useState("login");

  const inputConfig =
    formFor === "signup"
      ? [
          {
            id: "email",
            label: "Email",
            type: "email",
            name: "user_email_address",
            placeholder: "mahadev@lemonpay.tech",
            required: true,
          },
          {
            id: "password",
            label: "Password",
            type: "password",
            name: "user_password",
            placeholder: "Min 8 characters",
            required: true,
          },
          {
            id: "confirm-password",
            label: "Confirm Password",
            type: "password",
            name: "user_confirm_password",
            placeholder: "Min 8 characters",
            required: true,
          },
        ]
      : [
          {
            id: "email",
            label: "Email",
            type: "email",
            name: "user_email_address",
            placeholder: "mahadev@lemonpay.tech",
            required: true,
          },
          {
            id: "password",
            label: "Password",
            type: "password",
            name: "user_password",
            placeholder: "Min 8 characters",
            required: true,
          },
        ];

  const handleFormToggle = () => {
    console.log("Form toggled");
    setFormFor((prev) => (prev === "login" ? "signup" : "login"));
  };

  return (
    <div className="relative flex flex-col p-4 justify-between items-center bg-custom-gradient h-screen w-full overflow-hidden">
      <div className="absolute bottom-[-58px] right-[214px] w-64 h-64 rounded-full bg-white opacity-20 transform translate-x-1/4 translate-y-1/4"></div>
      <div className="absolute bottom-[21rem] left-[9.7rem] right-0 w-48 h-48 rounded-full bg-white opacity-10 transform translate-x-1/3"></div>

      <img className="h-[68.55px]" src="logo.png" alt="Logo" />

      <div
        className={`${formFor === "login" && "mb-[70px]"} flex flex-col gap-4`}
      >
        <div className="flex flex-col gap-4">
          <h2 className="font-nunito font-semibold text-white text-[24px] leading-[120%] tracking-[0%]">
            Welcome {formFor === "login" ? "Login" : "Sign Up"} System
          </h2>
          <p className="font-poppins font-medium text-white text-[16px] leading-[25px] tracking-[0%]">
            Your gateway to seamless transactions and easy payments.
          </p>
        </div>

        <Form
          config={inputConfig}
          formFor={formFor}
          toggleForm={handleFormToggle}
        />
      </div>
    </div>
  );
};

export default Login;
