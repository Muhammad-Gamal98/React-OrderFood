import { useRef } from "react";
import useCheckout from "../../hooks/use-checkout";
import styles from "./Checkout.module.css";
import CheckoutForm from "./CheckoutForm";

const isEmpty = (value) => value.trim() === "";
const isNotFiveChar = (value) => {
  return value.trim().length !== 5 || isNaN(Number(value));
};

const Checkout = (props) => {
  // const name = useRef();
  // const street = useRef();
  // const city = useRef();
  // const postalCode = useRef();
  const {
    inputValue: nameInput,
    inputInValied: nameInValied,
    FieldIsValied: nameFieldIsValied,
    changeIsTouched: nameIsTouched,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlureHandler,
  } = useCheckout(isEmpty);
  const {
    inputValue: streetInput,
    changeIsTouched: streetIsTouched,
    inputInValied: streetInValied,
    FieldIsValied: streetFieldIsValied,
    inputChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlureHandler,
  } = useCheckout(isEmpty);
  const {
    inputValue: cityInput,
    changeIsTouched: cityIsTouched,
    inputInValied: cityInValied,
    FieldIsValied: cityFieldIsValied,
    inputChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlureHandler,
  } = useCheckout(isEmpty);
  const {
    inputValue: postalInput,
    changeIsTouched: postalIsTouched,
    inputInValied: postalInValied,
    FieldIsValied: postalFieldIsValied,
    inputChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlureHandler,
  } = useCheckout(isNotFiveChar);
  let formIsValied = true;
  const submitHandler = async (event) => {
    event.preventDefault();
    nameIsTouched(true);
    streetIsTouched(true);
    cityIsTouched(true);
    postalIsTouched(true);
    if (nameInValied || streetInValied || cityInValied || postalInValied) {
      formIsValied = false;
    }
    if (!formIsValied) {
      console.log("invalied");
      return;
    }
    try {
      await props.onConfirmOrder({
        name: nameInput,
        street: streetInput,
        city: cityInput,
        postCode: postalInput,
      });
      console.log("success");
    } catch (error) {
      // console.log("some Thing went wrong!");
      console.log(error.message);
      return;
    }
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <CheckoutForm
        error={!nameFieldIsValied}
        errorMessage="Please Enter Valid Name"
        label="name"
        input={{
          id: "name",
          type: "text",
          onBlur: nameBlureHandler,
          onChange: nameChangeHandler,
          value: nameInput,
        }}
        // ref={name}
      />
      <CheckoutForm
        error={!streetFieldIsValied}
        errorMessage="Please Enter Valid Street"
        label="street"
        input={{
          id: "street",
          type: "text",
          onBlur: streetBlureHandler,
          onChange: streetChangeHandler,
          value: streetInput,
        }}
        // ref={street}
      />
      <CheckoutForm
        error={!cityFieldIsValied}
        errorMessage="Please Enter Valid city"
        label="City"
        input={{
          id: "city",
          type: "text",
          onBlur: cityBlureHandler,
          onChange: cityChangeHandler,
          value: cityInput,
        }}
        // ref={city}
      />
      <CheckoutForm
        error={!postalFieldIsValied}
        errorMessage="Please Enter Valid Post Code (5 Charchters)"
        label="Post Code"
        input={{
          id: "postal",
          type: "text",
          onBlur: postalBlureHandler,
          onChange: postalChangeHandler,
          value: postalInput,
        }}
        // ref={postalCode}
      />
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default Checkout;

// const enteredName = name.current.value;
// const enteredStreet = street.current.value;
// const enteredCity = city.current.value;
// const enteredPostalCode = postalCode.current.value;
// setValidity({
//   nameIsvalied: !isEmpty(enteredName),
//   cityIsvalied: !isEmpty(enteredCity),
//   streetIsValied: !isEmpty(enteredStreet),
//   postalCodeIsValied: isFiveChar(enteredPostalCode),
// });
// const formIsValied =
//   !isEmpty(enteredName) &&
//   !isEmpty(enteredCity) &&
//   !isEmpty(enteredStreet) &&
//   isFiveChar(enteredPostalCode);
// if (!formIsValied) {
//   console.log("invalied");
//   return;
// }
// console.log(enteredName, enteredStreet, enteredCity, enteredPostalCode);
