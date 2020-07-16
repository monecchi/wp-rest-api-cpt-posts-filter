import React, { Component, useEffect, useState } from "react";

const DishesList = props => {
  const [dishesData, setDishesData] = useState({
    dishes: [],
    loading: false,
    perPage: 25
  });

  //this.props = dishesData;

  useEffect(() => {
    setDishesData({ loading: true });

    const restURL = "https://pizzariameurancho.com.br/wp-json/wp/v2/food_menu/";
    const dishesEndpoint = "/food_menu/";

    async function loadData() {
      const response = await fetch(restURL);
      if (!response.ok) {
        // oups! something went wrong
        //return console.log(response);
      }

      const allDishes = await response.json();
      console.log(JSON.stringify(allDishes));
      setDishesData({ loading: false, dishes: allDishes });
    }

    loadData();
  }, [setDishesData]);

  const { dishes, loading } = dishesData;

  return (
    <>
      <div style={{ paddinBottom: "1.2rem" }}>
        Pizza, pasta & other delicous meals
      </div>

      {dishes && dishes.map(dish => {

        {dish.title}

      })}

    </>
  );
};

export default DishesList;
