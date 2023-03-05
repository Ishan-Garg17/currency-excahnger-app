import React from "react";
import "./home.scss";
import Form from "./Form";
import Card from "./Card";
// import Card from './Card';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../redux/store/store";

interface Props {
  leftList: string[];
  rightList: string[];
}
const Home: React.FC<Props> = ({ leftList, rightList }) => {
  const homeState = useSelector((state: RootState) => state.home);
  const { currencyData, converting } = homeState;
  // console.log("======in Homee==============================");
  // console.log(homeState);
  // console.log("====================================");

  return (
    <div className="main_container">
      <h1>Currency Exchanger</h1>
      <div className="container">
        <Form leftList={leftList} rightList={rightList} moreDetailsBtn={true} />
      </div>
      <div className="grid_container">
        {converting && <h2>Loading...</h2>}
        {!converting &&
          currencyData.map((ele: any, index: any) => (
            <Card key={index} data={ele} />
          ))}
      </div>
    </div>
  );
};

export default Home;
