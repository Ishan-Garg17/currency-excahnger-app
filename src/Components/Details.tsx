import React, { useEffect, useState } from "react";
import "./details.scss";
import { useNavigate } from "react-router";
import { leftListData, rightListData } from "../API DATA/symbols";
import Form from "./Form";
import { symbols } from "../API DATA/symbols";
import { useSelector } from "react-redux/es/hooks/useSelector";
const Details: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("EUR");

  const formState: any = useSelector<any>(
    (state: { formData: {} }) => state.formData
  );
  const someObj: {} = symbols;

  useEffect(() => {
    const baseCurr: string = formState.baseCurr;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    const fullNameofCurr = someObj[baseCurr as keyof {}];
    setFullName(fullNameofCurr);
  }, [formState.baseCurr]);

  return (
    <div className="main_container">
      <div className="header">
        <h1>
          {formState.baseCurr} - {fullName}
        </h1>
        <button onClick={() => navigate("/home")} className="btn_header">
          Back To Home
        </button>
      </div>
      <div className="container">
        <Form
          leftList={leftListData}
          rightList={rightListData}
          moreDetailsBtn={false}
        />
      </div>
      <div className="histogram_container"></div>
    </div>
  );
};

export default Details;
