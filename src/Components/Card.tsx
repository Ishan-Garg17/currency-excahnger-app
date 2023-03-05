import React from "react";
import { item } from "../redux/features/HomeSlice";
import "./card.scss";

const Card: React.FC<{ data: item }> = ({ data }) => {
  return (
    <div className="card">
      <p>{data.from}</p>
      <p>{data.to}</p>
      <p>{data.amount}</p>
    </div>
  );
};

export default Card;
