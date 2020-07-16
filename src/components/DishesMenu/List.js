import React, { Component, useEffect, useState } from "react";

const DishesList = props => {
  const [dishesData, setDishesData] = useState({
    dishes: null,
    loading: false,
    perPage: 25
  });

  //this.props = dishesData;

  useEffect(() => {
    setDishesData({ loading: true });

    const restURL = "https://pizzariameurancho.com.br/wp-json/wp/v2/food_menu/";
    const dishesEndpoint = "/food_menu/";

    fetch(restURL).then(response => {
      const allDishes = [];
      allDishes = response.json();
      console.log(allDishes);
      setDishesData({ loading: false, dishes: allDishes });
    });
  }, [setDishesData]);

  return (
    <>
      <div stye={{paddinBottom: "1.2rem"}}>Pizza, pasta & other delicous meals</div>
    </>
  );
};

export default DishesList;
