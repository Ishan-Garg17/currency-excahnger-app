import React, { useState } from "react";
import "./home.scss";
import Form from "./Form";
// import Card from "./Card";

interface Props {
  leftList: string[];
  rightList: string[];
}
const Home: React.FC<Props> = ({ leftList, rightList }) => {
  return (
    <div className="home_container">
      <div className="container">
        <Form leftList={leftList} rightList={rightList} />
      </div>
      <div className="grid_container">
        {/* {currencyData.map((ele,index)=>(
          <Card key={index} data={ele}/>
        ))} */}
      </div>
    </div>
  );
};

export default Home;
