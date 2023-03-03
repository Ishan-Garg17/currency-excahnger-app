import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  convertCurrency,
  getConversionData,
} from "../redux/features/FormSlice";
import "./form.scss";
import {
  setAmount,
  setBaseCurr,
  setConversionData,
  setConvertedAmount,
  setToCurr,
} from "../redux/features/FormSlice";
interface Props {
  leftList: string[];
  rightList: string[];
}
const Form: React.FC<Props> = ({ leftList, rightList }) => {
  const formState: any = useSelector<any>(
    (state: { formData: {} }) => state.formData
  );
  console.log("====================================");
  console.log(formState);
  console.log("====================================");
  const dispatch = useDispatch<any>();

  useEffect(() => {
    console.log("useEffect Called");

    dispatch(setConversionData(null));
    dispatch(getConversionData());
  }, [formState.baseCurr, formState.toCurr]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Form Submitted", e);
    dispatch(convertCurrency());
  };
  const handleSwap = (): void => {
    const temp = formState.baseCurr;
    dispatch(setBaseCurr(formState.toCurr));
    dispatch(setToCurr(temp));
  };
  const handleBaseChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(setBaseCurr(e.target.value));
  };
  const handleToConvertChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    dispatch(setToCurr(e.target.value));
  };
  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setAmount(+e.target.value));
  };
  return (
    <form onSubmit={handleSubmit} className="form" name="signupform">
      <div className="left_div">
        <h3 className="input_label">Amount</h3>
        <input
          type="number"
          className="inputFields"
          name="amount"
          placeholder="Enter Amount"
          onChange={(e) => handleAmount(e)}
          value={formState.amount}
          required
        />
        {formState.conversionData === null ? (
          <p className="currency_value">Fetching Rates...</p>
        ) : (
          <p className="currency_value">
            1 {formState.baseCurr} = {formState.conversionData}
            {formState.toCurr}
          </p>
        )}
      </div>

      <div className="right_div">
        <div className="select_inputs_container">
          <div>
            <label htmlFor="baseCurr">From</label>
            <select
              name="baseCurr"
              onChange={(e) => handleBaseChange(e)}
              value={formState.baseCurr}
            >
              {leftList.map((ele, index) => (
                <option key={index} value={ele}>
                  {ele}
                </option>
              ))}
            </select>
          </div>
          <span
            onClick={handleSwap}
            className="material-symbols-outlined swap_icon"
          >
            swan_alt
          </span>
          <div>
            <label htmlFor="baseCurr">To</label>
            <select
              name="toConvertCurr"
              onChange={(e) => handleToConvertChange(e)}
              value={formState.toCurr}
            >
              {rightList.map((ele, index) => (
                <option key={index} value={ele}>
                  {ele}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn" name="convertCurr">
          Convert
        </button>

        <div className="converted_amount_details">
          <p>
            {formState.amount === 0
              ? 0
              : formState.converting
              ? "Converting..."
              : formState.convertedAmount}
          </p>
          <button type="submit" className="more_details_btn" name="convertCurr">
            More Details
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
