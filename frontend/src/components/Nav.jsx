import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../hooks/useCartContext";
import ShoppingCart from "./icons/ShoppingCart";
// import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { RxHamburgerMenu } from "react-icons/rx";

const Nav = () => {
  const navigate = useNavigate();
  const { cart } = useCartContext();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="max-w-6xl mx-auto  py-2 md:py-4">
      <div className=" flex items-center justify-between px-3 pr-5 ">
        <nav className="flex items-center gap-4 sm:gap-8 text-defualt ">
          <Link className="text-primary font-bold text-2xl" to={"/"}>
            BiteRush
          </Link>
          <Link className="md:font-medium md:text-lg hidden md:flex" to={"/"}>
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
                  <RxHamburgerMenu />
                </div>
              </Link>

              <button
                onClick={handleClick}
                className="bg-primary rounded-lg text-white px-5 text-xs py-1 hidden md:flex"
              >
                Logout
              </button>
            </div>
          )}
          <Link to={"cart"} className=" relative">
            {" "}
            <ShoppingCart />{" "}
            <span className=" absolute -top-2 -right-4 flex justify-center items-center bg-primary rounded-full text-xs leading-3 text-white h-4 w-4 ">
              {cart.length}
            </span>{" "}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
