import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import renderHTML from "../../utils/htmlRender";
//import ListLoading from "./ListLoading";

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
const DishesList = (props) => {
  const [dishesData, setDishesData] = useState({
    dishes: [],
    loading: false,
    perPage: 25,
    pagesTotal: 1,
    page: 1
  });

  //this.loadMore = this.loadMore.bind(this);

  const restURL = `https://pizzariameurancho.com.br/wp-json/wp/v2/food_menu/?per_page=${dishesData.perPage}&page=${dishesData.page}`;
  const dishesEndpoint = "/food_menu/";

  const loadData = async => {
    setDishesData({ loading: true });
    return axios
      .get(restURL)
      .then(response => {
        setDishesData({
          dishes: dishesData.dishes.concat(response.data),
          loading: false,
          perPage: 25,
          pagesTotal: Number(response.headers["x-wp-totalpages"]),
          page: page + 1
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const loadMore = () => {
    loadData();
  };

  useEffect(() => {

    loadData();
  }, [setDishesData]);


  const { dishes, loading, perPage, pagesTotal, page } = dishesData;
  const totalItems = Array.from(Array(25).keys());

  if(loading) return <div><p>Loading...</p></div>;

  return (
    <>
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

      {/* this.state.per_page < this.state.foods.length &&*/}
      {page <= pagesTotal && dishes.length && (
        <>
          <div
            style={{
              width: "100%",
              paddingTop: "1.2rem",
              paddingBottom: "1.2rem"
            }}
          >
            <button
              onClick={() => loadMore()}
              type="button"
              role="button"
              className="btn btn--default btn--white btn--size-m btn--full-width restaurants-list__load-more"
              aria-label="More items"
              target=""
              rel=""
              style={{ outline: "0" }}
            >
              More dishes
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default DishesList;
