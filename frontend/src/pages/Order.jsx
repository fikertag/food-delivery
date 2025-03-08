import { useOrderContext } from "../hooks/useOrder";
import { format } from "date-fns";

const Order = () => {
  const { orders } = useOrderContext();

  return (
    <div className=" my-8 max-w-3xl mx-auto flex flex-col gap-2 p-4 ">
      {orders ? (
        orders.map((order) => (
          <div
            key={order._id}
            className="  flex  smflex-row gap-5 border border-black/10 shadow-sm bg-white rounded-lg py-2 px-4 items-center justify-between"
          >
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
                {order.items[0]?.itemId.name}, {order.items[1]?.itemId.name}
              </p>
            </div>
            <div className="text-gray-400 text-xs text-start hidden md:flex">
              {format(new Date(order.createdAt), "yyyy-MM-dd HH:mm")}
            </div>
            <div className=" flex items-center h-[34px] border text-xs px-5 rounded-lg cursor-pointer hover:bg-black/20 transition-all">
              Show Order
            </div>
          </div>
        ))
      ) : (
        <div>d</div>
      )}
    </div>
  );
};

export default Order;
