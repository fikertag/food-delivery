import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ItemsContextPovider } from "./context/itemContext.jsx";
import { AuthContextProvider } from "./context/AuthContext";
import { CatagoryContextPovider } from "./context/CatagoryContext.jsx";
import { CartContextPovider } from "./context/cartContext.jsx";
import { OrderContextProvider } from "./context/OrderContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <CatagoryContextPovider>
        <ItemsContextPovider>
          <CartContextPovider>
            <OrderContextProvider>
              <UserContextProvider>
                <App />
              </UserContextProvider>
            </OrderContextProvider>
          </CartContextPovider>
        </ItemsContextPovider>
      </CatagoryContextPovider>
    </AuthContextProvider>
  </BrowserRouter>
);
