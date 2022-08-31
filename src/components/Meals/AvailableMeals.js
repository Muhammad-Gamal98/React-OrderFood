import { useEffect, useState } from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealsItem/MealItem";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://order-food-e043d-default-rtdb.firebaseio.com/meal"
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
      setMeals(transformedMealsArray);
      setIsloading(false);
    };
    fetchData().catch((err) => {
      setIsloading(false);
      setError(err.message);
    });
  }, []);
  console.log(error);
  if (isLoading) {
    return (
      <section className={styles.mealsLoading}>
        <p>LOADING...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={styles.mealsError}>
        <p>{error}</p>
      </section>
    );
  }
  const mealsList = meals.map((item) => (
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
