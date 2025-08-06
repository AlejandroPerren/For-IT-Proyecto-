import { useState } from "react";
import LoginForm from "../compontents/auth/LoginForm";
import RegisterForm from "../compontents/auth/RegisterForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);

  const HandleChangeForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div>
      <main className="">
    {isLogin ? (
        <LoginForm/>
    ): (
        <RegisterForm/>
    )}
        <button onClick={HandleChangeForm}>{isLogin ? "No Tienes una cuenta?, Registrate" : "Ya tienes una cuenta?, Ingresa "}</button>    
      </main>
    </div>
  );
};

export default Auth;
