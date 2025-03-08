import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useCatagoryContext } from "../hooks/useCatagoryContext";
import DeleteButton from "../components/DeleteButton";

const Catagory = () => {
  const [newCatagory, setNewCatagory] = useState("");
  const { catagory, dispatch } = useCatagoryContext();
  const [editableCatagory, setEditableCatagory] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      const method = editableCatagory ? "patch" : "post";
      let url = `https://back-mfs7.onrender.com/api/items/catagory`;
      if (editableCatagory) {
        url = `https://back-mfs7.onrender.com/api/items/catagory/${editableCatagory._id}`;
      }
      const loadingToast = toast.loading("Loading...");
      try {
        const { data } = await axios({
          method: method,
          url: url,
          data: { name: newCatagory },
        });
        setNewCatagory("");
        toast.success("uploaded successfully!", { id: loadingToast });

        setEditableCatagory(null);
        if (method == "post") {
          dispatch({ type: "create_item", payload: data });
        } else {
          dispatch({ type: "edit_item", payload: data });
        }
      } catch (error) {
        toast.error("Something went wrong!", { id: loadingToast });
      }
    };
    fetchData();
  };
  const handleDelete = (id) => {
    const fetchData = async () => {
      try {
        const { data } = await axios.delete(
          `https://back-mfs7.onrender.com/api/items/catagory/${id}`
        );
        toast.success("uploaded sucsussfully");
        dispatch({ type: "delete_item", payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  const editStatus = (c) => {
    setEditableCatagory(c);
    setNewCatagory(c ? c.name : "");
  };

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 items-end mx-5">
          <div className="grow ">
            <label className=" mb-5">
              {editableCatagory ? "Update catagory name" : "New catagory name"}
            </label>
            <input
              type="text"
              value={newCatagory}
              onChange={(e) => setNewCatagory(e.target.value)}
              className="mt-1 bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full"
              placeholder="Category name"
            />
          </div>
          <div className="pb-2">
            {editableCatagory && (
              <div className="flex gap-1">
                <button
                  className="flex items-center h-[34px] border text-xs px-5 rounded-lg cursor-pointer hover:bg-black/20 transition-all"
                  type="submit"
                >
                  {" "}
                  Update{" "}
                </button>
                <button
                  className="flex items-center h-[34px] border text-xs px-5 rounded-lg cursor-pointer hover:bg-black/20 transition-all"
                  onClick={() => editStatus(null)}
                  type="button"
                >
                  {" "}
                  Cancle{" "}
                </button>
              </div>
            )}
            {!editableCatagory && (
              <button
                className="border border-primary w-25 text-sm mb-1 rounded-lg"
                type="submit"
              >
                {" "}
                Create{" "}
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="mx-5">
        <h2 className="my-4 text-sm text-gray-500">Existing catagory</h2>
        {catagory &&
          catagory.map((c) => (
            <div
              key={c._id}
              className="bg-white border border-black/10 shadow-sm rounded-lg mb-2 px-4 flex gap-4 items-center py-2 justify-between "
            >
              <div className="grow ">{c.name}</div>
              <div className="flex gap-1 text-xs">
                <button
                  className=" mr-3 flex items-center h-[34px] border text-xs px-5 rounded-lg cursor-pointer hover:bg-black/20 transition-all "
                  type="button"
                  onClick={() => editStatus(c)}
                >
                  Edit
                </button>
                <DeleteButton
                  lable={"Delete"}
                  handleDelete={handleDelete}
                  id={c._id}
                  className="flex items-center h-[34px] border text-xs px-5 rounded-lg cursor-pointer hover:bg-black/20 transition-all"
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Catagory;
