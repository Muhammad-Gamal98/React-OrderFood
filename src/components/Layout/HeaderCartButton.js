import { useContext } from "react";
import CartContext from "../../store/Cart-Context";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  const cartCTX = useContext(CartContext);
  const numberOfCartItems = cartCTX.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  return (
    <>
      <button className={styles.button} onClick={props.onCartClick}>
        <span className={styles.icon}>
          <CartIcon />
        </span>
        <span>Yor Cart</span>
        <span className={styles.badge}>{numberOfCartItems}</span>
      </button>
    </>
  );
};
export default HeaderCartButton;
