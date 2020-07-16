import React, { Component, useEffect, useState } from "react";
import axios from "axios";

const DishesList = props => {
  const [dishesData, setDishesData] = useState({
    dishes: [],
    loading: false,
    perPage: 25,
    pagesTotal: 1,
    page: 1
  });

  this.props = dishesData;

  useEffect(() => {
    setDishesData({ loading: true });

    const restURL = `https://pizzariameurancho.com.br/wp-json/wp/v2/food_menu/?per_page=${perPage}`;
    const dishesEndpoint = "/food_menu/";

    async function loadData() {
      axios
        .get(restURL)
        .then(response => {
          const allDishes = response.data;
          console.log(response);
          setDishesData({
            dishes: allDishes,
            loading: false,
            pagesTotal: Number(response.headers["x-wp-totalpages"]),
            page: page + 1
          });
        })
        .catch(err => {
          console.log(err);
        });
    }

    loadData();
  }, [setDishesData]);

  const { dishes, loading, perPage, pagesTotal, page } = dishesData;

  return (
    <>
      <div style={{ paddingBottom: "2rem" }}>
        Pizza, pasta & other delicous meals
      </div>

      {dishes &&
        dishes.map((dish, index) => {
          {
            /*dishes && dishes.map((dish, index) => {*/
          }
          {
            /*{dishes.slice(0, this.state.totalItems).map((food, index) => {*/
          }
          if ( dish.slug && dish.slug == "vazio" || dish.slug && dish.slug == "empty" ) {
            return <></>;
          }
          return (
            <>
              <div className="card" key={dish.id}>
                <div className="card-body">
                <h4>{dish.title.rendered}</h4>
                </div>
              </div>
            </>
          );
        })}
    </>
  );
};

export default DishesList;
