import { Component } from "react";
import "./style.scss";
import leftArrow from "../../../assets/arrowLeft.svg";
import rightArrow from "../../../assets/arrowRight.svg";

class BtnSlider extends Component {
  render() {
    return (
      <button
        onClick={this.props.moveSlide}
        className={
          this.props.direction === "next" ? "btn-slide next" : "btn-slide prev"
        }
      >
        <img
          src={this.props.direction === "next" ? rightArrow : leftArrow}
          alt=""
        />
      </button>
    );
  }
}

export default BtnSlider;
