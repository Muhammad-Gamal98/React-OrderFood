import { useContext, useReducer } from "react";
import CartContext from "../../store/Cart-Context";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import Checkout from "./Checkout";

const InitialState = {
  showCheckout: false,
  isSubmit: false,
  didSubmit: false,
  isError: false,
};
const controlsReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_CHECKOUT":
      return {
        ...state,
        showCheckout: action.payload,
      };
    case "IS_SUBMIT":
      return {
        ...state,
        isSubmit: action.payload,
      };
    case "DID_SUBMIT":
      return {
        ...state,
        didSubmit: action.payload,
      };
    case "IS_ERROR":
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return InitialState;
  }
};
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [controlStates, dispatchControls] = useReducer(
    controlsReducer,
    InitialState
  );
  const addHandler = (item) => {
    console.log(item);
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const orderHandler = () => {
    dispatchControls({ type: "SHOW_CHECKOUT", payload: true });
  };
  const confirmOrderHandler = async (userData) => {
    dispatchControls({ type: "IS_SUBMIT", payload: true });
    const response = await fetch(
      "https://order-food-e043d-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          OrderItems: cartCtx.items,
        }),
      }
    );
    if (!response.ok) {
      dispatchControls({ type: "IS_ERROR", payload: true });
      dispatchControls({ type: "IS_SUBMIT", payload: false });

      throw new Error("Some Thing Went Wrong!");
    }
    dispatchControls({ type: "IS_ERROR", payload: false });
    dispatchControls({ type: "IS_SUBMIT", payload: false });
    dispatchControls({ type: "DID_SUBMIT", payload: true });
    cartCtx.clearItems();
  };
  const cartItem = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      price={item.price}
      amount={item.amount}
      onRemove={removeHandler.bind(null, item.id)}
      onAdd={addHandler.bind(null, item)}
    />
  ));
  const isSubmitingModal = (
    <>
      <p>Sending the Order</p>
    </>
  );
  const didSubmitModal = (
    <>
      <p>successfull Order</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onCartHide}>
          Close
        </button>
      </div>
    </>
  );
  const isErrorModal = (
    <>
      <p>Some Thing Went Wrong!</p>
    </>
  );
  return (
    <Modal onModalClick={props.onCartHide}>
      {!controlStates.isSubmit && !controlStates.didSubmit && (
        <>
          <ul className={styles["cart-items"]}>{cartItem}</ul>
          <div className={styles.total}>
            <span>Total Amount</span>
            <span>{cartCtx.totalAmout.toFixed(2)}</span>
          </div>
          {controlStates.showCheckout && (
            <Checkout
              onConfirmOrder={confirmOrderHandler}
              onCancel={props.onCartHide}
            />
          )}
          {!controlStates.showCheckout && (
            <div className={styles.actions}>
              <button
                className={styles["button--alt"]}
                onClick={props.onCartHide}
              >
                Close
              </button>
              {cartCtx.items.length > 0 && (
                <button className={styles.button} onClick={orderHandler}>
                  Order
                </button>
              )}
            </div>
          )}
        </>
      )}
      {controlStates.isSubmit && isSubmitingModal}
      {!controlStates.isSubmit && controlStates.didSubmit && didSubmitModal}
      {controlStates.isError &&
        !controlStates.didSubmit &&
        !controlStates.isSubmit &&
        isErrorModal}
    </Modal>
  );
};
export default Cart;
