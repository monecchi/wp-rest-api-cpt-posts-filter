import React from "react";

//
// Decode render html - https://stackoverflow.com/questions/42361689/implement-html-entity-decode-in-react-js
//
const renderHTML = (rawHTML, className) => {
  const className = className || null;
  return React.createElement("div", {
    className: className,
    dangerouslySetInnerHTML: { __html: rawHTML }
  });
};

export default renderHTML;
