import { Card, Searching } from "../components/index";
import { useAppContext } from "../context/AppContextProvider";

import general from "../styles/general.module.css";
import orders from "../styles/orders.module.css";
import { useState } from "react";

export const OrdersPage = () => {
  const { orderItems, loading, handleLogOut } = useAppContext();
  const [searchFilter, setSearchFilter] = useState("");

  if (loading) return <div className={general.loading}>Loading orders...</div>;

  const handleSearchChange = (value) => {
    setSearchFilter(value);
  };

  const filteredOrders = orderItems.filter((order) =>
    String(order.id).toLowerCase().includes(searchFilter.toLowerCase()),
  );

  return (
    <div className={general.ordersContainer}>
      <div className={orders.logOutBox}>
        <button onClick={handleLogOut} className={orders.buttonLogOut}>
          Log Out
        </button>
      </div>

      <Searching onSearchChange={handleSearchChange} />

      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <div key={order.id} className={orders.orderBlock}>
            <div className={orders.orderHeader}>
              <h3>Order №{order.id}</h3>
              <p>Issue date: {order.date}</p>
              <p>Price: {order.totalPrice} руб.</p>
            </div>

            <div className={general.mainContent}>
              {order.items &&
                order.items.map((product) => (
                  <Card key={`${order.id}-${product.id}`} product={product} />
                ))}
            </div>
          </div>
        ))
      ) : (
        <div className={general.messageBox}>
          <div className={general.emptyMessage}>
            <h2>You don't have any active orders yet :(</h2>
            <p>You can place an order in the "Cart" section.</p>
          </div>
        </div>
      )}
    </div>
  );
};
