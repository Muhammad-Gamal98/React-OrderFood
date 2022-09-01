import { useContext, useState } from "react";
import CartContext from "../../store/Cart-Context";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const addHandler = (item) => {
    console.log(item);
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const orderHandler = () => {
    setShowCheckout(true);
  };
  const confirmOrderHandler = async (userData) => {
    console.log(userData);
    await fetch(
      "https://order-food-e043d-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          OrderItems: cartCtx.items,
        }),
      }
    );
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
  return (
    <Modal onModalClick={props.onCartHide}>
      <ul className={styles["cart-items"]}>{cartItem}</ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{cartCtx.totalAmout.toFixed(2)}</span>
      </div>
      {showCheckout && (
        <Checkout
          onConfirmOrder={confirmOrderHandler}
          onCancel={props.onCartHide}
        />
      )}
      {!showCheckout && (
        <div className={styles.actions}>
          <button className={styles["button--alt"]} onClick={props.onCartHide}>
            Close
          </button>
          {cartCtx.items.length > 0 && (
            <button className={styles.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </Modal>
  );
};
export default Cart;
