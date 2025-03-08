import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../hooks/useCartContext";
import ShoppingCart from "./icons/ShoppingCart";
import { FiUser } from "react-icons/fi";

const Nav = () => {
  const { cart } = useCartContext();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="max-w-6xl mx-auto  py-2 md:py-4">
      <div className=" flex items-center justify-between px-3 pr-5 ">
        <nav className="flex items-center gap-4 sm:gap-8 text-defualt ">
          <Link className="text-primary font-bold text-2xl" to={"/"}>
            BiteRush
          </Link>
          <Link className="md:font-medium md:text-lg" to={"/"}>
            Home
          </Link>
          <Link className="md:font-medium md:text-lg" to={"/menu"}>
            Menu
          </Link>
        </nav>
        <nav className="flex items-center gap-4 text-defualt font-semibold">
          {!user && (
            <>
              <Link className="md:font-medium md:text-lg" to={"/login"}>
                Login
              </Link>
            </>
          )}

          {/* <FaRegUserCircle size={"20"} /> */}

          {user && (
            <div className="flex items-center gap-2 whitespace-nowrap">
              <Link className="" to={"/about/profile"}>
                <div className="hidden md:flex">{user.email}</div>

                <div className="md:hidden">
                  <FiUser />
                </div>
              </Link>

              <button
                onClick={handleClick}
                className="bg-primary rounded-lg text-white px-5 text-xs py-1"
              >
                Logout
              </button>
            </div>
          )}
          <Link to={"cart"} className=" relative">
            {" "}
            <ShoppingCart />{" "}
            <span className=" absolute -top-2 -right-4 bg-primary rounded-full text-xs leading-3 text-white py-1 px-1 ">
              {cart.length}
            </span>{" "}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
