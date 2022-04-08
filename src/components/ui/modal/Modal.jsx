import { Component } from "react";
import style from "./style.module.scss";

export default class Modal extends Component {
  render() {
    const active = this.props.active ? style.active : "";
    return (
      <div
        className={`${style.modal} ${active}`}
        onClick={this.props.setActive}
      >
        <div className={style.modal_wrapper}>
          <div
            className={style.modal_content}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
