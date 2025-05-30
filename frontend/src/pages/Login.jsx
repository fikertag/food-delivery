import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("login error");
    }
  };

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-5">Login</h1>
      <form className="block max-w-xs mx-auto relative" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="admin@gmail.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          className=" bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full focus:border-primary
"
        />
        <input
          type="password"
          placeholder="12345678"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          className=" bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full focus:border-primary
"
        />
        <button type="submit" disabled={isLoading}>
          Login
        </button>
        {error && (
          <div className=" text-red-500 text-xs mt-4 ml-[125px] absolute bottom-[50px]">
            {" "}
            {error}{" "}
          </div>
        )}
        <Link
          to={"/signup"}
          className=" mt-8 text-center block w-full mb-2 rounded-xl border p-2 border-gray-300 bg-gray-100"
        >
          Don't have an account? <span className=" underline ">Signup</span>{" "}
        </Link>
      </form>
    </section>
  );
};

export default Login;
