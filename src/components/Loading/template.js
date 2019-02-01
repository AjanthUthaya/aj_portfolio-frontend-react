// IMPORT: React
import React, { Component } from "react";

// IMPORT: Styles
import "./index.scss";

// EXPORT
export default class Template extends Component {
  // RENDER
  render() {
    return (
      <div className="loading">
        <div className="loading__pulse" />
      </div>
    );
  }
}
