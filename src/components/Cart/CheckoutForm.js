import React from "react";
import styles from "./Checkout.module.css";

const CheckoutForm = React.forwardRef((props, ref) => {
  return (
    <>
      <div className={`${styles.control} ${props.error ? styles.invalid : ""}`}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input {...props.input} ref={ref} />
        {props.error && <p>{props.errorMessage}</p>}
      </div>
    </>
  );
});
export default CheckoutForm;
