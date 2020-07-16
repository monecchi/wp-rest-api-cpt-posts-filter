import React, { Component, useEffect, useState } from "react";
import axios from "axios";

const DishesList = props => {
  const [dishesData, setDishesData] = useState({
    dishes: [],
    loading: false,
    perPage: 25
  });

  this.props = dishesData;

  useEffect(() => {
    setDishesData({ loading: true });

    const restURL = "https://pizzariameurancho.com.br/wp-json/wp/v2/food_menu/";
    const dishesEndpoint = "/food_menu/";

    async function loadData() {
      axios
        .get(restURL)
        .then(response => {
          const allDishes = response.data;
          console.log(response);
          setDishesData({ loading: false, dishes: allDishes });
        })
        .catch(err => {
          console.log(err);
        });
    }

    loadData();
  }, [setDishesData]);

  const { dishes } = dishesData;

  return (
    <>
      <div style={{ paddinBottom: "1.2rem" }}>
        Pizza, pasta & other delicous meals
      </div>

      {dishes &&
        dishes.map((dish, index) => {
          return <>{dish.title.rendered}</>;
        })}
    </>
  );
};

export default DishesList;
