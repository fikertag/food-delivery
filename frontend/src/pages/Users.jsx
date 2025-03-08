import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

const Users = () => {
  const { users } = useUserContext();
  return (
    <section className="max-w-3xl mx-auto p-4">
      <div className="m-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className=" bg-white border border-black/10 shadow-sm rounded-md mb-2 px-4 flex gap-4 items-center py-2 justify-between"
            >
              <div className="text-gray-900 min-w-32">
                {user.name && (
                  <span className="font-medium truncate">{user.name}</span>
                )}
                {!user.name && <span className="">"No name"</span>}
              </div>
              <span className="text-sm text-gray-500 flex-1 truncate">
                {user.email}
              </span>

              <div>
                <Link
                  className="flex border items-center text-xs px-5 rounded-lg cursor-pointer hover:bg-black/20 transition-all  py-2"
                  to={`editprofile/${user._id}`}
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Users;
