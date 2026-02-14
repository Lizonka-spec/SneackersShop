import { Card } from "../components/index";
import { useAppContext } from "../context/AppContextProvider";

import style from "../styles/general.module.css";

export const CartPage = () => {
  const { cartItems, createOrder } = useAppContext();

  return (
    <>
      <div className={style.mainContent}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => <Card key={item.id} product={item} />)
        ) : (
          <div className={style.messageBox}>
            <div className={style.emptyMessage}>
              <h2>There is nothing in the cart yet :( </h2>
              <p>Add at least one pair of sneakers to place your order.</p>
            </div>
          </div>
        )}
      </div>
      <div className={style.orderContent}>
        <button
          onClick={() => createOrder()}
          disabled={cartItems.length === 0}
          className={style.orderButton}
        >
          Place an order
        </button>
      </div>
    </>
  );
};
