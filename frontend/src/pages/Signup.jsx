import { Link } from "react-router-dom";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-5">Register</h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          className=" bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full focus:border-primary
"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          className=" bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full focus:border-primary
"
        />
        <button type="submit" disabled={isLoading}>
          Register
        </button>
        {error && <div className="text-red-500 text-xs"> {error} </div>}
        <Link
          to={"/login"}
          className=" mt-8 text-center block w-full mb-2 rounded-xl border p-2 border-gray-300 bg-gray-100"
        >
          Already Registerd? <span className=" underline ">Login</span>{" "}
        </Link>
      </form>
    </section>
  );
};

export default Signup;
