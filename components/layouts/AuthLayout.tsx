import { FC } from "react";
import { Toaster } from "react-hot-toast";
import LoginImage from "../auth-form/LoginImage";
import Navbar from "../nav/Navbar";

interface Props {
  children: React.ReactNode;
}

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div className="w-full h-screen bg-login-blurred bg-cover lg:bg-center lg:bg-no-repeat relative">
      <div className="absolute w-full h-full bg-black opacity-30"></div>
      <Navbar scrollPosition={0} />
      <main className="flex flex-col lg:flex-row justify-center items-center w-full lg:w-1/2 h-full mx-auto">
        <LoginImage />
        <Toaster />
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
