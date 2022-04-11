import { Component } from "react";
import BtnSlider from "./BtnSlider";
import "./style.scss";

class Slider extends Component {
  state = { slideIndex: 1 };

  nextSlide() {
    if (this.state.slideIndex !== this.props.dataSlider.length) {
      this.setState((state) => ({
        slideIndex: state.slideIndex + 1,
      }));
    } else if (this.state.slideIndex === this.props.dataSlider.length) {
      this.setState({
        slideIndex: 1,
      });
    }
  }

  prevSlide() {
    if (this.state.slideIndex !== 1) {
      this.setState((state) => ({
        slideIndex: state.slideIndex - 1,
      }));
    } else if (this.state.slideIndex === 1) {
      this.setState({
        slideIndex: this.props.dataSlider.length,
      });
    }
  }

  render() {
    return (
      <div className="container-slider">
        {this.props.dataSlider.map((img, index) => {
          return (
            <div
              key={index}
              className={
                this.state.slideIndex === index + 1
                  ? "slide active-anim"
                  : "slide"
              }
            >
              <img src={img} alt="" />
            </div>
          );
        })}
        {this.props.dataSlider.length <= 1 ? null : (
          <>
            <BtnSlider
              moveSlide={this.nextSlide.bind(this)}
              direction={"next"}
            />
            <BtnSlider
              moveSlide={this.prevSlide.bind(this)}
              direction={"prev"}
            />
          </>
        )}
      </div>
    );
  }
}

export default Slider;
