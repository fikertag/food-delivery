import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export default function UserTabs() {
  const { user } = useAuthContext();
  const [admin, setAdmin] = useState(user?.admin || false);

  return (
    <>
      <div className="flex mx-auto gap-2 tabs justify-center flex-wrap mt-8">
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to={"/about/profile"}
        >
          Profile
        </NavLink>
        {admin && (
          <>
            <NavLink
              to={"/about/categorie"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Categories
            </NavLink>
            <NavLink
              to={"/about/menuitems"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Edit Menu
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to={"/about/users"}
            >
              Users
            </NavLink>
          </>
        )}
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to={"/about/orders"}
        >
          Orders
        </NavLink>
      </div>
      <Outlet />
    </>
  );
}
