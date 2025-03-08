import { ShoppingCart, Star } from "lucide-react";
import { useCartContext } from "../hooks/useCartContext";
import toast from "react-hot-toast";

export default function Item({ item, addToCart, bestSeller = false }) {
  const { cart, dispatch } = useCartContext();

  const handleAddToCart = () => {
    dispatch({
      type: "create_item",
      payload: {
        item,
      },
    });
    toast.success("Added to cart");
  };

  return (
    <div
      key={item._id}
      className=" bg-white rounded-2xl shadow-2xl overflow-hidden transition-transform duration-300 w-72 mx-auto h-[26rem] mb-3 flex flex-col"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={`/uploads/${item.image}`}
          alt={"image"}
          className="w-full h-40 object-contain"
        />
        {bestSeller && (
          <span className="absolute top-2 left-2 bg-primary text-white text-sm px-3 py-1 rounded-full">
            Bestseller
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div className="">
          <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
          <div className="flex gap-3">
            <div className="bg-secondary my-2 px-2 py-[1px] rounded-2xl text-xs text-center flex items-center drop-shadow-2xl ">
              Meet
            </div>
            <div className="bg-secondary my-2 px-2 py-[1px] rounded-2xl text-xs text-center flex items-center">
              Avocado
            </div>
            <div className="bg-secondary my-2 px-2 py-[1px] rounded-2xl text-xs text-center flex items-center">
              Bread
            </div>
          </div>
          <h4 className="text-xs text-wrap truncate pt-2 text-gray-700">
            {item.discription}
          </h4>
        </div>

        <div>
          <div className="flex items-center justify-between mt-2">
            {/* Price */}
            <p className=" text-xl font-bold text-gray-800">${item.price}</p>

            {/* Rating */}
            <div className="flex items-center gap-1 text-yellow-500">
              <Star fill="currentColor" size={18} />
              <span className="text-gray-700 text-sm">{3}</span>
            </div>
          </div>
          {addToCart ? (
            <button
              onClick={handleAddToCart}
              className="w-full mt-1 bg-primary text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#54e68c] transition"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          ) : (
            <button className="w-full mt-1 bg-primary text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#54e68c] transition">
              Edit item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
