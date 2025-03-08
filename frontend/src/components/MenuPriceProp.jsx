import Trash from "../components/icons/Trash";
import Plus from "../components/icons/Plus";
import ChevronDown from "./icons/ChevronDown";
import { useState } from "react";

const MenuPriceProp = ({name, prop, setProp, lableProp})=> {

  const [isOpen, setIsOpen] = useState(false)

  const addProp = (e) => {
    setProp(oldProp => {
      return [...oldProp,{name:'', price:0}]
    })
  }
  const editProp = (ev, index, prop) => {
    const newValue = ev.target.value;
    setProp(prevProp => {
      const newProp = [...prevProp];
      newProp[index][prop] = newValue;
      return newProp;
    })
  }
  const removeProp = (indexToRemove) => {
    setProp(prev => prev.filter((v,index) => index !== indexToRemove ))
  }

  return ( 
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <div>
         <button 
         onClick={(prev) => setIsOpen(prev => !prev) }
          className="inline-flex p-1 border-0 justify-start"
          type="button">
          <ChevronDown />
          <span>{name}</span>
          <span>({prop?.length})</span>
      </button>
    </div>
    <div className={isOpen? "block" : 'hidden'}>
    {prop?.length > 0 && prop.map((prop, index) => (
          <div key={index} className="flex gap-2 items-end">
            <div className="grow">
              <label> Name</label>
              <input type="text" 
                      placeholder="name" 
                      value={prop.name}
                      onChange={ev => editProp(ev, index, 'name')} />
            </div>
            <div>
              <label>Extra price</label>
              <input type="text" 
                      placeholder="extra price" 
                      value={prop.price} 
                      onChange={ev => editProp(ev, index, 'price')} />
            </div>
            <div>
              <button type="button"
                      onClick={() => removeProp(index)}
                      className=" bg-white mb-2"> <Trash /></button>
            </div>
          </div>
        ))}
        <button 
        type="button"
        onClick={addProp}
        className="bg-white"> <Plus /> <span > {lableProp} </span>  </button>
    </div>  
    </div>
  )
}

export default MenuPriceProp;
