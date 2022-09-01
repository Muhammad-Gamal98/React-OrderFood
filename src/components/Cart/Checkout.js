import { useReducer, useRef, useState } from "react";
import styles from "./Checkout.module.css";
import CheckoutForm from "./CheckoutForm";

const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [validity, setValidity] = useState({
    nameIsvalied: true,
    streetIsValied: true,
    cityIsvalied: true,
    postalCodeIsValied: true,
  });
  const name = useRef();
  const street = useRef();
  const city = useRef();
  const postalCode = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = name.current.value;
    const enteredStreet = street.current.value;
    const enteredCity = city.current.value;
    const enteredPostalCode = postalCode.current.value;
    setValidity({
      nameIsvalied: !isEmpty(enteredName),
      cityIsvalied: !isEmpty(enteredCity),
      streetIsValied: !isEmpty(enteredStreet),
      postalCodeIsValied: isFiveChar(enteredPostalCode),
    });
    const formIsValied =
      !isEmpty(enteredName) &&
      !isEmpty(enteredCity) &&
      !isEmpty(enteredStreet) &&
      isFiveChar(enteredPostalCode);
    console.log("formIS Valid ", formIsValied);

    if (!formIsValied) {
      console.log("invalied");
      return;
    }
    console.log(enteredName, enteredStreet, enteredCity, enteredPostalCode);
  };
  const inputChangeHandler = (event) => {};

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <CheckoutForm
        error={!validity.nameIsvalied}
        label="name"
        input={{
          id: "name",
          type: "text",
        }}
        ref={name}
      />
      <CheckoutForm
        error={!validity.streetIsValied}
        label="street"
        input={{
          id: "street",
          type: "text",
        }}
        ref={street}
      />
      <CheckoutForm
        error={!validity.cityIsvalied}
        label="City"
        input={{
          id: "city",
          type: "text",
        }}
        ref={city}
        onInputChange={inputChangeHandler}
      />
      <CheckoutForm
        error={!validity.postalCodeIsValied}
        label="Post Code"
        input={{
          id: "postal",
          type: "text",
        }}
        ref={postalCode}
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
