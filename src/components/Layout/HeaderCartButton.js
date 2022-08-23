import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/Cart-Context";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  const [btnHighlighted, setBtnHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  console.log(cartCtx);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((curNumber, item) => {
    // console.log(curNumber, item);
    return curNumber + item.amount;
  }, 0);

  const btnClass = `${styles.button}  ${btnHighlighted ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnHighlighted(true);

    const timer = setTimeout(() => {
      setBtnHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <>
      <button className={btnClass} onClick={props.onCartClick}>
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
