import Topic from '../components/Topic';
import {useItemsContext} from '../hooks/useItemsContex'

const MenuItemCard = (catagory,handleClick )=> {

 const {items} = useItemsContext();

 return (
  <div>
       {items?.length > 0 && items.filter(m => m.itemCatagory == catagory._id).map(item => (
       <div key={item._id} className="  flex bg-gray-200 p-4 rounded-lg text-center flex-col align-text-top hover:bg-white transition-all  hover:shadow-black/25 hover:shadow-md">
       <div className="text-center">
         <img src={`../../public/uploads/${item.image}`} alt="pizza" className="max-h-24 block mx-auto" />
         {/* `../images/${item.image}` */}
       </div>
       <h4 className=" font-semibold text-xl my-3">{item.name}</h4>
       <p className="text-gray-500 text-sm line-clamp-3 flex-grow">
         {item.discription}
       </p>
       <button className=" mt-4 bg-primary text-white rounded-full px-8 py-2" onClick={() => handleClick(item)}>
         Add to cart ${item.price}
       </button>
       </div>
      ))}
      </div>
 )
}

export default MenuItemCard;
