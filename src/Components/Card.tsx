import React from "react";
import "./card.scss";

const Card: React.FC<{ data: string }> = ({ data }) => {
  return <div className="card">{data}</div>;
};

export default Card;
