import React from "react";
import { Order } from "../data/Order";
import DisplayOrder from "./DisplayOrder";

const OrderDataLayout = () => {
  return (
    <div
      style={{ border: "1px solid black", margin: "0.5rem", padding: "0.6rem" }}
    >
      {Order.map((data) => (
        <DisplayOrder key={data.id} data={data} depth={10} />
      ))}
    </div>
  );
};

export default OrderDataLayout;
