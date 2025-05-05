import Item from "./item";
import { ItemSkeleton } from "./ItemSkeleton";

import { useItemsContext } from "../hooks/useItemsContex";

export default function MenuItems() {
  const { items } = useItemsContext();

  const itemsToDisplay = items ? items.slice(0, 10) : null;
  return itemsToDisplay ? (
    itemsToDisplay.map((item) => (
      <Item key={item._id} item={item} addToCart={true} bestSeller={true} />
    ))
  ) : (
    <>
      {[...Array(6)].map((_, index) => (
        <ItemSkeleton key={index} />
      ))}
    </>
  );
}
