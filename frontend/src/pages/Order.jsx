import { useOrderContext } from "../hooks/useOrder";
import { format } from "date-fns";
import { useState } from "react";
import { CheckSquareOffset, HourglassHigh, List } from "phosphor-react";

const Order = () => {
  const { orders } = useOrderContext();

  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleOrder = (orderId) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };
  return (
    <div className=" my-8 max-w-3xl mx-auto flex flex-col gap-2 p-4  ">
      {orders ? (
        orders.map((order) => (
          <div
            key={order._id}
            className="  flex flex-col  gap-5 border border-black/10 shadow-sm bg-white rounded-lg py-2 px-2 "
          >
            <div className="flex gap-5  items-center ">
              <div className="flex items-center">
                <div
                  className={`rounded-md h-fit px-2 py-2 flex justify-center border ${
                    order.status === "completed"
                      ? "border-green-800"
                      : "border-red-800"
                  } text-sm`}
                >
                  {order.status === "completed" ? (
                    <CheckSquareOffset size={24} color="#166534" />
                  ) : (
                    <HourglassHigh size={24} color="#991b1b" />
                  )}
                </div>
              </div>

              <div className="flex-1">
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
                className=" flex items-center py-2 border text-xs px-2 rounded-lg cursor-pointer hover:bg-black/20 transition-all"
              >
                {expandedOrderId === order._id ? (
                  <List size={24} />
                ) : (
                  <List size={24} />
                )}
              </div>
            </div>
            {expandedOrderId === order._id && (
              <div>
                <div className="flex justify-between md:mx-2 mb-2 ">
                  <div className="flex flex-col gap-2">
                    <div className="text-center font-medium  "> Items </div>
                    <div className="flex flex-col items-center gap-1 text-gray-400 text-sm ">
                      {order.items.map((item) => (
                        <div key={item._id}>{item.itemId?.name}</div>
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
