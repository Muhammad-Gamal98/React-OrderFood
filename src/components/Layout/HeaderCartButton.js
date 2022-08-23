import { useContext } from "react";
import CartContext from "../../store/Cart-Context";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  console.log(cartCtx);
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    // console.log(curNumber, item);
    return curNumber + item.amount;
  }, 0);
  // console.log(numberOfCartItems);
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
