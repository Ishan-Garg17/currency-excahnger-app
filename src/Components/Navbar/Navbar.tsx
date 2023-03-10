import React from "react";
import "./navbar.scss";
import { useDispatch } from "react-redux/es/exports";
import { changeBaseandToCurr } from "../../redux/features/FormSlice";
import logo from "./BITCS LOGO.png";
const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const changeCurrency = (curr: string[]) => {
    dispatch(changeBaseandToCurr(curr));
  };
  return (
    <div className="navbar">
      <ul className="nav_list">
        {/* <li> */}
        <img className="logo" src={logo} alt="" />
        {/* </li> */}
        <li>
          <button onClick={() => changeCurrency(["EUR", "USD"])}>
            EUR TO USD
          </button>
        </li>
        <li>
          <button onClick={() => changeCurrency(["EUR", "GBP"])}>
            EUR TO GBP
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
