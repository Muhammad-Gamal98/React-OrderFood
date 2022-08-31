import { useEffect, useState } from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealsItem/MealItem";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://order-food-e043d-default-rtdb.firebaseio.com/meal.json"
      );
      const responseData = await response.json();
      console.log(responseData);
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
    };
    fetchData();
  }, []);
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
