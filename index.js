import React, { Component } from "react";
import { render } from "react-dom";
import "./style.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
      <div className="main">
        <section className="intro">
          <div className="container">
            <h1 className="text-center">WordPress React</h1>
            <p className="text-center">WP REST API Custom Post Type retrieval & filtering</p>
          </div>
        </section>

        <section className="intro">
          <div className="container">
            <p>WP REST API Custom Post Type retrieval & filtering</p>
          </div>
        </section>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
