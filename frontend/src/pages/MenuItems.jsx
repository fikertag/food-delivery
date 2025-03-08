import { useState } from "react";
import axios from "axios";
import { useCatagoryContext } from "../hooks/useCatagoryContext";
import ImageUploader from "../components/ImageUploader";
import toast from "react-hot-toast";
// import MenuPriceProp from "../components/menuPriceProp";
import Left from "../components/icons/Left";
import { useItemsContext } from "../hooks/useItemsContex";
// import Item from "../components/item";

const FormData = require("form-data");

const MenuItems = () => {
  const [name, setName] = useState("");
  const [discription, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const { catagory } = useCatagoryContext();
  const [preview, setPreview] = useState(null);
  const [size, setSize] = useState([]);
  const [extraIngridiant, setExtraIngridiant] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const { items, dispatch } = useItemsContext();
  const [editItem, setEditItem] = useState(null);
  const [isPatch, setIsPatch] = useState(false);
  const [selectedCatagory, setSelectedCatagory] = useState(
    (catagory?.length > 0 && catagory[0]._id) || ""
  );

  const formData = new FormData();
  formData.append("name", name);
  formData.append("discription", discription);
  formData.append("price", price);
  formData.append("itemCatagory", selectedCatagory);
  formData.append("size", JSON.stringify(size));
  formData.append("extraIngredientPrices", JSON.stringify(extraIngridiant));
  if (image) {
    formData.append("image", image); // Only append if image is not null
  }

  const value = Object.fromEntries(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      const method = isPatch ? "patch" : "post";
      const url = isPatch
        ? `http://localhost:5000/api/items/${editItem}`
        : "http://localhost:5000/api/items";
      try {
        const response = await axios({
          method,
          url,
          data: value,
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        });
        toast.success("uploaded sucsussfully");
        setName("");
        setDescription("");
        setPrice("");
        setImage(null);
        setPreview(null);
        setSize([]);
        setExtraIngridiant([]);
        dispatch({ type: "create_item", payload: response.data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  const handleEdit = (item) => {
    setIsCreate(true);
    setDescription(item.discription);
    setName(item.name);
    setPrice(item.price);
    setEditItem(item._id);
    setIsPatch(true);
  };

  const handleCategoryChange = (event) => {
    setSelectedCatagory(event.target.value); // Update the selected category state
  };

  return (
    <section className="mt-8 mx-5 sm:mx-10 ">
      <button
        className="max-w-md mx-auto "
        onClick={() => {
          setIsCreate((prev) => !prev);
          setDescription("");
          setName("");
          setPrice("");
        }}
      >
        <Left />
        {isCreate ? "Show All menu items" : "Create New Menu Item"}
      </button>
      {isCreate && (
        <div>
          <div className="flex flex-col items-center w-full">
            <label className="text-lg"> Image</label>
            <ImageUploader
              setImage={setImage}
              setPreview={setPreview}
              preview={preview}
            />
          </div>
          <form onSubmit={handleSubmit} className=" max-w-md mx-auto ">
            <label>Item name</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className=" bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full"
            />
            <label>Description</label>
            <input
              type="text"
              value={discription}
              onChange={(ev) => setDescription(ev.target.value)}
              className=" bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full"
            />
            <label>Category</label>
            <select
              id="category"
              value={selectedCatagory}
              onChange={handleCategoryChange}
              className=" bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full"
            >
              {catagory?.length > 0 &&
                catagory.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
            <label>price</label>
            <input
              type="text"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              className=" bg-white outline-none text-sm py-3 px-2 border border-black/10 rounded-lg w-full"
            />

            <button type="submit" className="mt-4">
              Save
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 min-[360px]:grid-cols-2 min-[560px]:grid-cols-3 min-[720px]:grid-cols-4 min-[920px]:grid-cols-5 min-[1050px]:grid-cols-6 gap-4 justify-center mx-auto w-full mt-10">
        {!isCreate &&
          items &&
          items.map((item) => (
            <div key={item._id} onClick={() => handleEdit(item)}>
              <div
                key={item._id}
                className=" bg-white rounded-2xl shadow-2xl overflow-hidden transition-transform duration-300 w-40 mx-auto mb-3 flex flex-col cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={`/uploads/${item.image}`}
                    alt={"image"}
                    className="w-full h-24 object-contain items-center flex"
                  />
                </div>

                <div className="px-4 py-2 ">
                  <div className="">
                    <h3 className="font-medium">{item.name}</h3>

                    <h4 className="text-xs text-gray-500 truncate ">
                      {item.discription}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default MenuItems;
