import { useContext } from "react";
import CartContext from "../../../store/Cart-Context";
import styles from "./MealItem.module.css";
import MealForm from "./MealItemForm";

const MealItem = (props) => {
  const cartCTX = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    console.log(amount);
    cartCTX.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
    console.log(cartCTX);
  };
  return (
    <>
      <li className={styles.meal}>
        <div>
          <h3>{props.name}</h3>
          <div className={styles.description}>{props.description}</div>
          <div className={styles.price}>{price}</div>
        </div>
        <div>
          <MealForm id={props.id} onAddToCart={addToCartHandler} />
        </div>
      </li>
    </>
  );
};
export default MealItem;
