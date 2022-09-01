import { useState } from "react";

const useCheckout = (validityCheck) => {
  const [inputValue, setInputValue] = useState("");
  const [inputIsTouched, setInputIsTouched] = useState(false);
  const inputInValied = validityCheck(inputValue);
  const FieldIsValied = !inputInValied || !inputIsTouched;
  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };
  const inputBlurHandler = (event) => {
    setInputIsTouched(true);
  };
  const changeIsTouched = (val) => {
    setInputIsTouched(val);
  };

  return {
    inputValue,
    changeIsTouched,
    inputInValied,
    FieldIsValied,
    inputChangeHandler,
    inputBlurHandler,
  };
};
export default useCheckout;
