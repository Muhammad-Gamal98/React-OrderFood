import Modal from "../UI/Modal";
import styles from "./Cart.module.css";

const DUMY_DATA = [{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }];
const Cart = (props) => {
  const cartItem = DUMY_DATA.map((item) => <li>{item.name}</li>);
  return (
    <Modal>
      <ul className={styles["cart-items"]}>{cartItem}</ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]}>Close</button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};
export default Cart;
