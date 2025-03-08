import { Minus, Plus } from "lucide-react";

import { useCartContext } from "../hooks/useCartContext";

export default function CartItem({ product }) {
  const { dispatch } = useCartContext();

  const handleDelete = () => {
    dispatch({ type: "delete_item", payload: product });
  };

  const handleDecrese = () => {
    dispatch({ type: "decrease_quantity", payload: product });
  };

  const handleIncrease = () => {
    dispatch({ type: "increase_quantity", payload: product });
  };

  return (
    <div className="border bg-white p-2 rounded-lg min-[430px]:p-4 flex flex- min-[430px]:flex-row justify-between  gap-4 relative">
      {/* First Row on Small Screens: Image + Product Info */}
      {/* <div className="grid grid-cols-[auto_1fr] items-center gap-4"> */}
      {/* Image Section */}
      <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100">
        <img
          src={`/uploads/${product.image}`}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info Section */}
      <div className="flex flex-col justify-between flex-1">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-gray-500 truncate w-40">
          {product.discription}
        </p>
        <div>
          <div className="text-sm pt-1">
            ${(product.price * product.quantity).toFixed(2)}
          </div>
          {product.quantity > 1 && (
            <div className="text-xs text-gray-500">
              ${product.price.toFixed(2)} each
            </div>
          )}
        </div>
      </div>
      {/* </div> */}

      {/* Second Row on Small Screens: Controls */}
      <div className="flex justify-end min-[430px]:justify-between items-end min-[430px]:flex-col absolute min-[430px]:relative right-1 bottom-1 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-trash2 h-4 w-4 m-2 cursor-pointer"
          onClick={handleDelete}
        >
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          <line x1="10" x2="10" y1="11" y2="17"></line>
          <line x1="14" x2="14" y1="11" y2="17"></line>
        </svg>

        {/* Quantity Controls */}
        <div className="flex items-center border rounded-md">
          <button
            onClick={handleDecrese}
            className="py-2 text-gray-600 hover:bg-gray-100 rounded-none border-none px-[1px]"
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease quantity</span>
          </button>
          <span className="w-14 text-center text-sm">{product.quantity}</span>
          <button
            onClick={handleIncrease}
            className="py-2 text-gray-600 hover:bg-gray-100 rounded-none border-none px-[1px]"
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase quantity</span>
          </button>
        </div>
      </div>
    </div>
  );
}
