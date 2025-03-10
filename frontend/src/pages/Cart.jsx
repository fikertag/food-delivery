import Topic from "../components/Topic";
import { useCartContext } from "../hooks/useCartContext";
import { useAuthContext } from "../hooks/useAuthContext";
import CartItem from "../components/CartItem";
import { useOrderContext } from "../hooks/useOrder";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const { cart } = useCartContext();
  const { user } = useAuthContext();
  const { createOrder } = useOrderContext();

  let total = 0;
  for (const p of cart) {
    total += p.price * p.quantity;
  }
  const FinalTotal = (total + total * 0.01 + total * 0.005).toFixed(2);
  const navigate = useNavigate();
  const handleCheckout = () => {
    if (cart.length < 1) {
      return;
    }
    if (!user) {
      navigate("/signup");
    } else {
      const orderData = {
        userId: user._id,
        items: cart.map((item) => ({
          itemId: item._id,
          quantity: item.quantity,
        })),
      };
      createOrder(orderData);
    }
  };

  return (
    <section className=" container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl p-4 pb-10 ">
      <div className="text-center">
        <Topic Mainhedder="Cart" />
      </div>
      <div className=" mt-4 grid gap-16 grid-cols-1 md:grid-cols-3 ">
        <div className=" flex flex-col gap-4 md:col-span-2">
          {cart?.length === 0 && <div>No products in your shopping cart</div>}
          {cart?.length > 0 &&
            cart.map((product) => (
              <CartItem key={product._id} product={product} />
            ))}
        </div>
        <div className="w-full mx-auto">
          <div
            className="rounded-lg bg-white  border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Order Summary
              </h3>
            </div>
            <div className="p-6 pt-0 space-y-4 text-[#09090b]">
              <div className="flex justify-between text-sm font-light ">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-light">
                <span>Delivery Fee</span>
                <span>${(total * 0.005).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm pb-4 border-b font-light">
                <span>Tax</span>
                <span>${(total * 0.01).toFixed(2)}</span>
              </div>

              <div className="flex justify-between ">
                <span>Total</span>
                <span>${FinalTotal}</span>
              </div>
            </div>
            <div className="flex items-center p-6 pt-0">
              <button
                disabled={cart.length === 0}
                onClick={handleCheckout}
                className="text-sm bg-primary disabled:cursor-not-allowed  hover:bg-primary/90 h-10 px-4 py-2 w-full rounded-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
