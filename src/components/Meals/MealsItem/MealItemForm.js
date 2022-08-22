import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";
const MealForm = (props) => {
  return (
    <>
      <form className={styles.form}>
        <Input
          label="Amount"
          input={{
            id: "number",
            type: "number",
            min: "1",
            max: "5",
            step: "1",
            defaultValue: "1",
          }}
        />
        <button>+ Add Item</button>
      </form>
    </>
  );
};
export default MealForm;
