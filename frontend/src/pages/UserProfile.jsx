import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const UserProfile = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [admin, setAdmin] = useState(false);

  // console.log(user.id, user?.name)

  const fetchData = async () => {
    try {
      const { data } = await axios(
        `https://back-mfs7.onrender.com/api/user/getuser/${id}`
      );
      // setUser(data)
      setName(data[0].name || "");
      setEmail(data[0].email || "");
      setPhone(data[0].phone || "");
      setCountry(data[0].country || "");
      setRegion(data[0].region || "");
      setCity(data[0].city || "");
      setStreet(data[0].street || "");
      setAdmin(data[0].admin || false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        const { data } = await axios.patch(
          `https://back-mfs7.onrender.com/api/user/updateuser/${id}`,
          { name, phone, country, city, region, street, admin }
        );
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("uploaded sucsussfully");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  return (
    <section className="mt-4">
      <form className="max-w-md mx-auto px-5" onSubmit={handleProfileSubmit}>
        <div className="grow">
          <label className="pl-2">First and last name</label>
          <input
            type="text"
            placeholder="First and last name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full"
          />
          <label className="pl-2">email</label>
          <input
            type="email"
            disabled={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full"
          />
          <label className="pl-2">Phone </label>
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full"
          />
          <label className="pl-2">Country</label>
          <input
            type="text"
            placeholder="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full"
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
                className="bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full"
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
                className="bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full"
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
            className="bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full"
          />
          <div>
            <label
              className="p-2 items-center gap-2 mb-2 inline-flex"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                value={"1"}
                checked={admin}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
          <button type="submit">Save</button>
        </div>
      </form>
    </section>
  );
};

export default UserProfile;
