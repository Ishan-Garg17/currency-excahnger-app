import React, { useEffect, useState } from "react";
import "./form.scss";
interface Props {
  leftList: string[];
  rightList: string[];
  // setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
}
const Form: React.FC<Props> = ({ leftList, rightList }) => {
  const [baseCurr, setBaseCurr] = useState<string>("EUR");
  const [toConvertCurr, setToConvertCurr] = useState<string>("USD");
  const [amount, setAmount] = useState<number>(0);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(0);
  const [conversionData, setConversionData] = useState<number | null>(1.061098);

  useEffect(() => {
    setConversionData(null);
    //API call for default baseCurr and toCurr
    setTimeout(() => {
      setConversionData(1.06); //data received from API
    }, 300);
  }, [baseCurr, toConvertCurr]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Form Submitted", e);
    setConvertedAmount(null);
    //API CALL and store the response in convertedAmount state
    setTimeout(() => {
      setConvertedAmount(100);
      // const formData = {
      //   baseCurr: baseCurr,
      //   toConvertCurr: toConvertCurr,
      //   amount: amount,
      //   convertedAmount: convertedAmount
      // }
    }, 500);
  };
  const handleSwap = (): void => {
    const temp = baseCurr;
    setBaseCurr(toConvertCurr);
    setToConvertCurr(temp);
  };
  const handleBaseChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setBaseCurr(e.target.value);
  };
  const handleToConvertChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setToConvertCurr(e.target.value);
  };
  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
    setAmount(+e.target.value); //added + sign to typecast string to number type.
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
          value={amount}
          required
        />
        {conversionData === null ? (
          <p className="currency_value">Fetching Rates...</p>
        ) : (
          <p className="currency_value">
            1 {baseCurr} = {conversionData}
            {toConvertCurr}
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
              value={baseCurr}
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
            sync_alt
          </span>
          <div>
            <label htmlFor="baseCurr">To</label>
            <select
              name="toConvertCurr"
              onChange={(e) => handleToConvertChange(e)}
              value={toConvertCurr}
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
            {amount === 0
              ? 0
              : convertedAmount == null
              ? "Converting..."
              : convertedAmount}
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
