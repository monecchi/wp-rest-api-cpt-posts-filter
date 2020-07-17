import React, { Component, useState } from "react";

//
// react-loading-skeleton
//
import Skeleton from "react-loading-skeleton";

//
// Dishes Menu Loading Component
//

const ListLoading = (props) => {

  const {dishes, loading, perPage, pagesTotal, page } = props;

  //const perPage = 25;

  const totalItems = Array.from(Array(25).keys());
  console.log(totalItems);

  return (
    <>
      <div className="list">
        {totalItems.map((dish, index) => {
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
                <div className="list-item" key={index}>
                  <div className="list-content">
                    <div className="dish-info">
                      <Skeleton style={{ width: "45%" }} />
                      <Skeleton style={{ width: "65%" }} />
                    </div>
                    <div className="dish-card__container-image justify-content-end">
                      <Skeleton className="dish-card__image" />
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
          <Skeleton style={{ width: "100%", padding: "0 20px", borderRadius: "4px" }} />
          </div>
        </>
      )}
    </>
  );
};

export default ListLoading;
