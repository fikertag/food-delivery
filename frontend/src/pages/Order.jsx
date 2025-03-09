import { useOrderContext } from "../hooks/useOrder";
import { format } from "date-fns";
import { useState } from "react";

const Order = () => {
  const { orders } = useOrderContext();

  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleOrder = (orderId) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };
  console.log(orders);

  return (
    <div className=" my-8 max-w-3xl mx-auto flex flex-col gap-2 p-4  ">
      {orders ? (
        orders.map((order) => (
          <div
            key={order._id}
            className="  flex flex-col  smflex-row gap-5 border border-black/10 shadow-sm bg-white rounded-lg py-2 px-4 "
          >
            <div className="flex  smflex-row gap-5  items-center justify-between">
              <div className="flex items-center">
                <div className="rounded-md h-fit w-fit py-2 px-3 bg-green-600 text-white text-sm">
                  {order.status}
                </div>
              </div>

              <div className="md:flex-1">
                <div className=" font-medium text-sm truncate">
                  {order.userId.email}
                </div>
                <p className="text-xs text-gray-500">
                  {order.items[0]?.itemId?.name}, {order.items[1]?.itemId?.name}
                </p>
              </div>
              <div className="text-gray-400 text-xs text-start hidden md:flex">
                {format(new Date(order.createdAt), "yyyy-MM-dd HH:mm")}
              </div>
              <div
                onClick={() => toggleOrder(order._id)}
                className=" flex items-center h-[34px] border text-xs px-5 rounded-lg cursor-pointer hover:bg-black/20 transition-all"
              >
                {expandedOrderId === order._id ? "Hide Order" : "Show Order"}
              </div>
            </div>
            {expandedOrderId === order._id && (
              <div>
                <div className="flex justify-between md:mx-2 mb-2 ">
                  <div className="flex flex-col gap-2">
                    <div className="text-center font-medium  "> Items </div>
                    <div className="flex flex-col items-center gap-1 text-gray-400 text-sm ">
                      {order.items.map((item) => (
                        <div key={item._id}>name</div>
                        // {item.itemId?.name}
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <div className="text-center  font-medium  "> quntity </div>
                    <div className="flex flex-col items-center gap-1 text-gray-400 text-sm">
                      {order.items.map((item) => (
                        <div key={item._id}>{item.quantity}</div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <div className="text-center font-medium"> price </div>
                    <div className="flex flex-col items-center gap-1 text-gray-400 text-sm">
                      {order.items.map((item) => (
                        <div key={item._id}>
                          ${item.itemId?.price.toFixed(2)}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-center  font-medium"> total </div>
                    <div className="flex flex-col items-center gap-1 text-gray-400 text-sm">
                      {order.items.map((item) => (
                        <div key={item._id}>
                          ${(item.itemId?.price * item.quantity).toFixed(2)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex  justify-around  ">
                  <div className="text-sm text-gray-700 font-medium flex flex-col items-center ">
                    tax:{" "}
                    <span className="text-black">${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-gray-700 font-medium flex flex-col items-center ">
                    delivery
                    <span className=" text-black">
                      ${order.deliveryPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 font-medium flex flex-col items-center ">
                    total price:{" "}
                    <span className="text-black">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>no order found </div>
      )}
    </div>
  );
};

export default Order;
