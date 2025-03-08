import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import toast from "react-hot-toast";
const Profile = () => {
  const { user, dispatch } = useAuthContext();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [country, setCountry] = useState(user?.country || "");
  const [region, setRegion] = useState(user?.region || "");
  const [city, setCity] = useState(user?.city || "");
  const [street, setStreet] = useState(user?.street || "");
  const [admin, setAdmin] = useState(user?.admin || "");

  const [isLoading, setIsLoading] = useState(null);

  // console.log(user.id, user?.name)

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      const loadingToast = toast.loading("Loading...");
      try {
        const { data } = await axios.patch(
          `https://back-mfs7.onrender.com/api/user/updateuser/${user._id}`,
          { name, phone, country, city, region, street }
        );
        dispatch({ type: "LOGIN", payload: data });
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("uploaded successfully!", { id: loadingToast });
      } catch (error) {
        setIsLoading(false);
        toast.error("Something went wrong!", { id: loadingToast });
      }
    };
    fetchData();
  };

  return (
    <section className="mt-8">
      <form className="max-w-md mx-auto" onSubmit={handleProfileSubmit}>
        <div className="grow mx-10 md:mx-0">
          <label className="pl-2">First and last name</label>
          <input
            type="text"
            placeholder="First and last name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className=" bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full"
          />
          <label className="pl-2">email</label>
          <input
            type="email"
            disabled={true}
            defaultValue={user && user.email}
            className=" bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full"
          />
          <label className="pl-2">Phone </label>
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className=" bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full"
          />
          <label className="pl-2">Country</label>
          <input
            type="text"
            placeholder="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className=" bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full"
          />
          <div className="flex gap-4">
            <div className="grow">
              <label className="pl-2">Region</label>
              <input
                type="text"
                placeholder="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
                className=" bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full"
              />
            </div>
            <div>
              <label className="pl-2">City</label>
              <input
                type="text"
                placeholder="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className=" bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full"
              />
            </div>
          </div>
          <label className="pl-2">Street adress</label>
          <input
            type="text"
            placeholder="Street adress"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
            className=" bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full"
          />
          <button className="mt-4" type="submit">
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
