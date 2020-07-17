import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

//import youtubeData from "./data";

//import "./styles.scss";
import "./App.scss";

const Card = ({ food }) => {
  return (
    <li className="card" key={food.id}>
      <a
        href={food.link}
        target="_blank"
        rel="noopener noreferrer"
        className="card-link"
      >
        <img
          src={food.featured_image_src.thumbnail}
          alt={food.title}
          className="card-image"
        />
        <h4 className="card-title">{food.title.rendered}</h4>
        <p className="card-channel">
          <i>{food.excerpt.rendered}</i>
        </p>
        <div className="card-metrics">
          {food.dish_prices[0] ? food.dish_prices[0].preco : ""}
        </div>
      </a>
    </li>
  );
};

const CardList = ({ foods }) => {
  return (
    <ul className="list">
      {foods.map((food, index) => {
        return <Card key={index} food={food} />;
      })}
    </ul>
  );
};

// Skeleton component
const CardSkeleton = ({isLoading}) => {
  if (isLoading)
  return (
    <section>
      <h2 className="section-title">
        <Skeleton height={28} width={300} />
      </h2>

      <ul className="list">
        {Array(25)
        .fill()
          .map((num, index) => (
            <li className="card" key={index}>
              <Skeleton height={180} />
              <h4 className="card-title">
                <Skeleton height={36} width={`80%`} />
              </h4>
              <p className="card-channel">
                <Skeleton width={`60%`} />
              </p>
              <div className="card-metrics">
                <Skeleton width={`90%`} />
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};

const App = () => {
  const [dishes, setDishes] = useState({
    foods: [],
    loading: false,
    perPage: 25,
    pagesTotal: 1,
    page: 1
  });

  const { foods, loading, perPage, pagesTotal, page } = dishes;

  const restURL = `https://pizzariameurancho.com.br/wp-json/wp/v2/food_menu/?per_page=${perPage}&page=${page}`;

  const getPosts = () => {
    setDishes({ loading: true });

    return axios.get(restURL).then(
      response => {
        console.log(response);
        setDishes({
          foods: dishes.foods.concat(response.data),
          loading: false,
          perPage: 25,
          pagesTotal: Number(response.headers["x-wp-totalpages"]),
          page: page + 1
        });
      }).catch(err => {
        console.log(err);
      });
  }

  const loadData = async => {
    setDishes({ loading: true });
    return axios
      .get(restURL)
      .then(response => {
        setDishes({
          foods: dishes.foods.concat(response.data),
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

  // Load this effect on mount
  useEffect(() => {
     getPosts();
    //loadData();
  }, [setDishes]);

  const loadMore = () => {
    getPosts();
    //loadData();
  };

  const { foods, loading, perPage, pagesTotal, page } = dishes;

  return (
    <div className="App">
      {loading && <CardSkeleton isLoading={dishes.loading} />}
      {!loading && foods.length && (
        <section>
          <h2 className="section-title">Our Menu</h2>
          <CardList foods={foods} />
          <hr />
          {page <= pagesTotal && foods.length && (
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
                  aria-label="More foods"
                  target=""
                  rel=""
                  style={{ outline: "0" }}
                >
                  More dishes
                </button>
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default App;
