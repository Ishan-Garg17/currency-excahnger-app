import React, { useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  convertCurrency,
  getConversionData,
  setConvertedAmount,
} from "../redux/features/FormSlice";
import "./form.scss";
import {
  setAmount,
  setBaseCurr,
  setToCurr,
  swapBaseAndTo,
} from "../redux/features/FormSlice";
import { useNavigate } from "react-router";
import { convertTo9PopularCurrency } from "../redux/features/HomeSlice";
import { AppDispatch, RootState } from "../redux/store/store";

interface Props {
  leftList: string[];
  rightList: string[];
  moreDetailsBtn: boolean;
}

const Form: React.FC<Props> = ({ leftList, rightList, moreDetailsBtn }) => {
  const navigate = useNavigate();
  const formState = useSelector((state: RootState) => state.formData);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getConversionData());
  }, [dispatch, formState.baseCurr, formState.toCurr]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (formState.amount === 0) {
      window.alert("Please enter amount");
      return;
    }
    dispatch(convertCurrency());
    dispatch(convertTo9PopularCurrency());
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
          onChange={(e) => {
            dispatch(setAmount(+e.target.value));
            dispatch(setConvertedAmount());
          }}
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
              disabled={formState.amount <= 0 || !moreDetailsBtn}
              name="baseCurr"
              onChange={(e) => dispatch(setBaseCurr(e.target.value))}
              value={formState.baseCurr}
            >
              {leftList.map((ele, index) => (
                <option key={index} value={ele}>
                  {ele}
                </option>
              ))}
            </select>
          </div>

          {moreDetailsBtn && (
            <span
              onClick={() => dispatch(swapBaseAndTo())}
              className="material-symbols-outlined swap_icon"
            >
              sync_alt
            </span>
          )}

          <div>
            <label htmlFor="baseCurr">To</label>
            <select
              disabled={formState.amount <= 0}
              name="toConvertCurr"
              onChange={(e) => dispatch(setToCurr(e.target.value))}
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

        <button
          // disabled={formState.amount <= 0}
          type="submit"
          className={formState.amount > 0 ? "btn" : "btn-disabled"}
          name="convertCurr"
        >
          Convert
        </button>

        <div className="converted_amount_details">
          <p>
            {formState.converting
              ? "Converting..."
              : formState.convertedAmount === 0
              ? 0
              : formState.convertedAmount == null
              ? "Click Convert"
              : formState.convertedAmount}
          </p>
          {moreDetailsBtn && (
            <button
              onClick={() => navigate("/details")}
              className="more_details_btn"
              name="convertCurr"
            >
              More Details
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default Form;
