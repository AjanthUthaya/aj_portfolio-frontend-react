// IMPORT: React
import React, { Component } from "react";
import Fade from "react-reveal/Fade";

// IMPORT: Styles
import "./index.scss";

// IMPORT: Loading & Error
import Loading from "../Loading/index";
import Error from "../Error/index";

// EXPORT
export default class Template extends Component {
  /**
   * @author  Aj
   * @version 1.0
   * @since   2018-12-12
   *
   * RENDER: Map data to HTML
   */
  RenderItems = () => {
    // 1. DEFINE: Working variables
    const Object = this.props.skills,
      Data = this.props.skills.data,
      noData = Data.length === 0;

    // 2. DEFINE: Array to store HTML elements
    let returnArray = [];

    // 3. IF: Loading
    if (Object.isLoading && noData) {
      return <Loading />;
    }

    // 4. IF: Data length is 0
    if (noData && !Object.error) {
      return (
        <span className="mini_boxes__list__no_data">NO RECORDS FOUND</span>
      );
    }

    // 5. IF: Error
    if (Object.error && noData) {
      return <Error onClick={this.props.fetchSkills} />;
    }

    // 6. MAP: Data to HTML
    returnArray = Data.map(function(item, key) {
      return (
        <div className="mini_boxes__list__item" key={key}>
          <div className="mini_boxes__list__item__image_container">
            <img
              className="mini_boxes__list__item__image_container__image"
              src={item.acf.image.sizes.skill_icon}
              alt="Skill"
            />
          </div>

          <div className="mini_boxes__list__item__title_container">
            <span className="mini_boxes__list__item__title_container__title">
              {item.title.rendered}
            </span>
            {/*
            <span className="mini_boxes__list__item__title_container__sub_title">
              View projects
            </span>
          */}
          </div>
        </div>
      );
    });

    // @RETURN
    return returnArray;
  };

  // RENDER
  render() {
    return (
      <div className="mini_boxes">
        <div className="mini_boxes__list">
          <Fade right>{this.RenderItems()}</Fade>
        </div>
      </div>
    );
  }
}
