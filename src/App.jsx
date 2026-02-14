import { Route, Routes } from "react-router-dom";
import { useAppContext } from "./context/AppContextProvider";

import {
  AuthPage,
  CartPage,
  OrdersPage,
  WishPage,
  СatalogPage,
} from "./pages/pages";
import { MainLayOut, PrivateRoute } from "./components/index";

const App = () => {
  return (
    <MainLayOut>
      <Routes>
        <Route path="/" element={<СatalogPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/auth" element={<AuthPage />}></Route>
        <Route path="/wishlist" element={<WishPage />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/auth/orders" element={<OrdersPage />} />
        </Route>
      </Routes>
    </MainLayOut>
  );
};

export default App;
