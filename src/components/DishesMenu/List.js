import React, { Component, useEffect, useState } from "react";
import renderHTML from "../../utils/htmlRender";
import axios from "axios";

//
// react-loading-skeleton
//
import Skeleton from "react-loading-skeleton";

//
// Dishes Menu Component
// Retrieves WordPress "food_menu" custom post type
// Handles load more posts
// Handles post filtering
//
const DishesList = props => {
  const [dishesData, setDishesData] = useState({
    dishes: [],
    loading: false,
    perPage: 25,
    pagesTotal: 1,
    page: 1
  });

  useEffect(() => {
    setDishesData({ loading: true });

    const restURL = `https://pizzariameurancho.com.br/wp-json/wp/v2/food_menu/?per_page=${perPage}&page=${page}`;
    const dishesEndpoint = "/food_menu/";

    const loadData = async () => {
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

  const loadMore = () => {
      loadData();
  }


  const { dishes, perPage, pagesTotal, page } = dishesData;
  const { loading } = dishesData.loading;

  return (
    <>
      <div style={{ paddingBottom: "2rem" }}>
        Pizza, pasta & more delicious meals
      </div>

      <div className="list">
        {dishes &&
          dishes.map((dish, index) => {
            {
              /*dishes && dishes.map((dish, index) => {*/
            }
            {
              /*{dishes.slice(0, this.state.totalItems).map((food, index) => {*/
            }
            if (
              (dish.slug && dish.slug == "vazio") ||
              (dish.slug && dish.slug == "empty")
            ) {
              return <></>;
            }
            return (
              <>
                <div className="list-item" key={dish.id}>
                  <div className="list-content">
                    <div className="dish-info">
                       <h4>{dish.title.rendered}</h4>
                      {renderHTML(dish.excerpt.rendered, "description")}
                    </div>
                    <div className="dish-card__container-image justify-content-end">
                      {dish.featured_image_src.thumbnail ? (
                        <img
                          src={dish.featured_image_src.thumbnail}
                          alt={dish.title.rendered}
                          className="dish-card__image"
                        />
                      ) : (
                        <div className="dish-card__image" />
                      )}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default DishesList;
