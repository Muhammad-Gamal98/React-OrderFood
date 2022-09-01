import { useEffect, useReducer } from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealsItem/MealItem";

const controllsInitialState = {
  meals: [],
  isLoading: true,
  error: null,
};

const controllsReducer = (state, action) => {
  if (action.type === "SET_MEALS") {
    const updatedMeals = action.data;
    return {
      ...state,
      meals: updatedMeals,
    };
  }
  if (action.type === "SET_LOADING") {
    const updatedLoading = action.data;
    return {
      ...state,
      isLoading: updatedLoading,
    };
  }
  if (action.type === "SET_ERROR") {
    const updatedError = action.data;
    return {
      ...state,
      error: updatedError,
    };
  }
  return controllsInitialState;
};
const AvailableMeals = (props) => {
  const [controlls, dispatchControlls] = useReducer(
    controllsReducer,
    controllsInitialState
  );
  // const [meals, setMeals] = useState([]);
  // const [isLoading, setIsloading] = useState(true);
  // const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://order-food-e043d-default-rtdb.firebaseio.com/meal.json"
      );
      if (!response.ok) {
        throw new Error("Some thing went wrong!");
      }
      const responseData = await response.json();
      const transformedMealsArray = [];
      for (const key in responseData) {
        transformedMealsArray.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      dispatchControlls({ type: "SET_MEALS", data: transformedMealsArray });
      dispatchControlls({ type: "SET_LOADING", data: false });
      // setMeals(transformedMealsArray);

      // setIsloading(false);
    };
    fetchData().catch((err) => {
      dispatchControlls({ type: "SET_LOADING", data: false });
      dispatchControlls({ type: "SET_ERROR", data: err.message });

      // setIsloading(false);
      // setError(err.message);
    });
  }, []);
  if (controlls.isLoading) {
    return (
      <section className={styles.mealsLoading}>
        <p>LOADING...</p>
      </section>
    );
  }
  if (controlls.error) {
    return (
      <section className={styles.mealsError}>
        <p>{controlls.error}</p>
      </section>
    );
  }
  const mealsList = controlls.meals.map((item) => (
    <MealItem
      id={item.id}
      key={item.id}
      name={item.name}
      description={item.description}
      price={item.price}
    />
  ));
  return (
    <>
      <section className={styles.meals}>
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      </section>
    </>
  );
};
export default AvailableMeals;
