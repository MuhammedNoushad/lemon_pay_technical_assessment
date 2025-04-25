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
    <div className="relative flex flex-col md:flex-row p-4 justify-between items-center bg-custom-gradient h-screen w-full overflow-hidden">
      <div className="absolute bottom-[-58px] right-[214px] md:left-[500px] w-64 h-64 rounded-full bg-white opacity-20 transform translate-x-1/4 translate-y-1/4"></div>
      <div className="absolute bottom-[21rem] md:top-[-61px] left-[9.7rem] md:left-[1355px] right-0 w-48 h-48 rounded-full bg-white opacity-10 transform translate-x-1/3"></div>
      <div className="absolute hidden md:block bottom-[-65px] left-[-118px] right-0 w-48 h-48 rounded-full bg-white opacity-10 transform translate-x-1/3"></div>

      <div className="flex flex-col gap-4 md:ml-2 md:justify-between h-full ">
        <img
          className="h-[68.55px] md:h-[170px] md:self-start object-cover"
          src="logo.png"
          alt="Logo"
        />

        <h1 className="hidden md:block font-nunito font-medium text-white text-[50px] leading-[120%] tracking-[0%] w-[650px] mb-[100px]">
          Join 8 Million Businesses{" "}
          <span className="text-orange-300">Powering Growth with</span>{" "}
          Lemonpay!
        </h1>
      </div>

      <div
        className={
          "flex flex-col justify-center gap-4 md:w-[500px] md:mt-[100px] mb-[25px] md:mb-0"
        }
      >
        <div className="flex flex-col gap-4">
          <h2 className="font-nunito font-semibold text-white text-[24px] md:text-[32px] leading-[120%] tracking-[0%]">
            Welcome {formFor === "login" ? "Login" : "Sign Up"} System
          </h2>
          <p className="font-poppins font-medium md:max-w-[21rem] text-white text-[16px] md:text-[20px] leading-[25px] tracking-[0%]">
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
