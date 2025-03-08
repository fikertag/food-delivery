import { useCatagoryContext } from "../hooks/useCatagoryContext";
import { useItemsContext } from "../hooks/useItemsContex";
import { useCartContext } from "../hooks/useCartContext";
import Topic from "../components/Topic";
import { useState } from "react";
import toast from "react-hot-toast";
// import { ShoppingCart, Star } from "lucide-react";
import Item from "../components/item";

const Menu = () => {
  const { catagory } = useCatagoryContext();
  const { items } = useItemsContext();
  const { cart, dispatch } = useCartContext();
  const [showPopup, setShowPopup] = useState(false);
  const [spesificItem, setSpesificItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(
    spesificItem?.size?.[0] || null
  );
  const [selectedExtras, setSelectedExtras] = useState([]);

  const handleClick = (item) => {
    const hasoptions =
      item.size.length > 0 || item.extraIngredientPrices.length > 0;

    if (hasoptions && !showPopup) {
      setShowPopup(true);
      setSpesificItem(item);
      return;
    }
    dispatch({
      type: "create_item",
      payload: {
        item,
        selectedExtras,
        selectedSize,
      },
    });
    toast.success("Added to cart");
    setShowPopup(false);
  };

  const handleSelect = (ev, extras) => {
    if (ev.target.checked) {
      setSelectedExtras((prev) => [...prev, extras]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extras.name);
      });
    }
  };

  let selectedPrice = spesificItem?.price;
  if (selectedSize) {
    selectedPrice = selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }
  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="bg-white p-2 rounded-lg max-w-md my-8"
          >
            <div
              className=" overflow-y-scroll p-2 "
              style={{ maxHeight: "calc(100vh - 100px)" }}
            >
              <div className="text-center">
                <img
                  src={`../../public/uploads/${spesificItem.image}`}
                  alt="pizza"
                  width={300}
                  height={200}
                  className="mx-auto"
                />
              </div>
              <h2 className=" font-bold text-lg text-center mb-2">
                {spesificItem.name}
              </h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {spesificItem.discription}
              </p>
              {spesificItem.size.length > 0 && (
                <div key={spesificItem.size._id} className="py-2">
                  <h3 className="text-center text-gray-700 mb-1">
                    Pick your size
                  </h3>
                  {spesificItem.size.map((size) => (
                    <div
                      key={size.name}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        type="radio"
                        name="size"
                        // onChange={selectedSize?.name === spesificItem.size.name}
                        onChange={() => setSelectedSize(size)}
                      />
                      {size.name ? size.name : "abe"} ${size.price}
                    </div>
                  ))}
                </div>
              )}
              {spesificItem.extraIngredientPrices.length > 0 && (
                <div className="p-2">
                  <h3 className="text-center text-gray-700 mb-1">
                    Pick your Additonal item
                  </h3>
                  {spesificItem.extraIngredientPrices.map((discription) => (
                    <div
                      key={discription.name}
                      className="flex items-center gap-2 p-3 border rounded-md mb-1"
                    >
                      <input
                        type="checkbox"
                        onChange={(ev) => handleSelect(ev, discription)}
                        checked={selectedExtras
                          .map((e) => e._id)
                          .includes(discription._id)}
                        name={discription.name}
                      />{" "}
                      {discription.name} ${discription.price}
                    </div>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={() => handleClick(spesificItem)}
                className="primary sticky bottom-2"
              >
                Add to cart ${selectedPrice}
              </button>
              <button
                onClick={() => {
                  setShowPopup(false);
                }}
                type="button"
                className="mt-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <section className="mt-3 flex justify-center w-full">
        <div className="max-w-4xl">
          {catagory?.length > 0 &&
            catagory.map((c) => {
              const filteredItems = items.filter(
                (m) => m.itemCatagory === c._id
              );
              return (
                filteredItems.length > 0 && (
                  <div key={c._id}>
                    <div className="text-center my-7">
                      <Topic Mainhedder={c.name} />
                    </div>
                    <div className="grid grid-cols-1 min-[650px]:grid-cols-2 min-[950px]:grid-cols-3 gap-4 justify-center mx-auto w-full ">
                      {filteredItems.map((item) => (
                        <div key={item._id}>
                          <Item addToCart={true} item={item} />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              );
            })}
        </div>
      </section>
    </>
  );
};

export default Menu;
