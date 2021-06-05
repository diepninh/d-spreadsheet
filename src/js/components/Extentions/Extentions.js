import React from "react";
import "./Extentions.css";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { SketchPicker, GithubPicker } from "react-color";
import { BsTextCenter, BsTextLeft, BsTextRight } from "react-icons/bs";
import fillColor from "../Image/fill-color-40.png";

class Extentions extends React.Component {
  constructor(props) {
    super(props);
  }
  initArray = (arrayCorres) => {
    let newValue = new Array();
    for (let i = 0; i < this.props.nRows; i++) {
      newValue[i] = new Array();
      for (let j = 0; j < this.props.nColumns; j++) {
        newValue[i][j] = arrayCorres[i][j];
      }
    }
    return newValue;
  };
  initArrayAndChange = (form, arrayCorres) => {
    let newValue = this.initArray(arrayCorres);
    newValue[this.props.row][this.props.col] = form;
    this.props.changeBold(newValue);
    this.props.changeTextStatus(form);
  };
  changeBoldText = () => {
    this.initArrayAndChange("bold", this.props.styleText);
  };
  changeIntiText = () => {
    this.initArrayAndChange("italic", this.props.styleText);
  };
  changeNorText = () => {
    this.initArrayAndChange("normal", this.props.styleText);
  };
  sizeDown = () => {
    let newValue = this.initArray(this.props.sizeText);
    newValue[this.props.row][this.props.col] =
      this.props.sizeText[this.props.row][this.props.col] - 1;
    this.props.changeSizeTextDown(newValue);
  };
  sizeUp = () => {
    let newValue = this.initArray(this.props.sizeText);
    newValue[this.props.row][this.props.col] =
      this.props.sizeText[this.props.row][this.props.col] + 1;
    this.props.changeSizeTextUp(newValue);
  };
  changeFontFamily = (value) => {
    let newValue = this.initArray(this.props.fontFamily);
    newValue[this.props.row][this.props.col] = value;
    this.props.changeFontFamily(newValue);
  };
  openColorBoard = () => {
    this.props.openColorBoard();
  };
  openFillColorBoard = () => {
    this.props.openFillColorBoard();
  };
  handleChangeColor = (color) => {
    let newValue = this.initArray(this.props.styleText);
    newValue[this.props.row][this.props.col] = color.rgb;
    this.props.changeColor(newValue);
  };
  handleChangeBackGround = (color) => {
    let newValue = this.initArray(this.props.backgroundGrid);
    newValue[this.props.row][this.props.col] = color.hex;
    this.props.changeBackgroundGrid(newValue);
  };
  ChangeValueAll = (value) => {
    if (value[0] === " ") {
      this.props.showValue(value.slice(1));
    } else {
      this.props.showValue(value);
    }
  };
  SubmitFormAll = (event) => {
    let newValue = this.initArray(this.props.dataTable);
    if (this.props.valueFlag[0] != "=") {
      newValue[this.props.row][this.props.col] = this.props.valueFlag;
    } else {
      if (this.props.valueFlag.length === 1) {
        newValue[this.props.row][this.props.col] = "";
      } else if (
        (this.props.valueFlag[1] > "a" && this.props.valueFlag[1] < "z") ||
        (this.props.valueFlag[1] > "A" && this.props.valueFlag[1] < "Z")
      ) {
        for (let i = 0; i < this.props.valueFlag.length; i++) {
          for (let j = 1; j < this.props.valueFlag.length; j++) {
            if (
              (this.props.valueFlag[i] > "a" &&
                this.props.valueFlag[i] < "z") ||
              (this.props.valueFlag[i] > "A" && this.props.valueFlag[i] < "Z")
            ) {
              newValue[this.props.row][this.props.col] = "#NAME?";
            } else if (
              this.props.valueFlag[i] === "+" ||
              this.props.valueFlag[i] === "-" ||
              this.props.valueFlag[i] === "*" ||
              this.props.valueFlag[i] === "/"
            ) {
              if (this.props.valueFlag[j] === "+") {
                newValue[this.props.row][this.props.col] = "#ERROR!";
              }
            }
          }
        }
      } else if (this.props.valueFlag[1] >= 0 && this.props.valueFlag[1] <= 9) {
        newValue[this.props.row][
          this.props.col
        ] = require("../../../calculator").parse(this.props.valueFlag.slice(1));
      }
    }
    this.props.setValue(newValue);
    event.preventDefault();
  };

  render() {
    return (
      <div className="Extentions toolBar">
        <div className="extentions">
          <button
            onClick={this.changeBoldText}
            className="customButton"
            style={{ fontWeight: "bold" }}
          >
            B
          </button>
          <button
            onClick={this.changeIntiText}
            className="customButton"
            style={{ fontStyle: "italic", fontFamily: "fantasy" }}
          >
            I
          </button>
          <button onClick={this.changeNorText} className="customButton">
            N
          </button>

          <div style={{ height: 35, background: "#cccccc", width: 1 }}></div>
          <div className="formSizeText">
            <button onClick={this.sizeDown} className="customButton2">
              -
            </button>
            <p className="formSizeNumber">
              {this.props.sizeText[this.props.row][this.props.col]}
            </p>
            <button onClick={this.sizeUp} className="customButton2">
              +
            </button>
          </div>
          <div style={{ height: 35, background: "#cccccc", width: 1 }}></div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                <select
                  className="formSelect"
                  value={this.props.fontFamily[this.props.row][this.props.col]}
                  onChange={(e) => this.changeFontFamily(e.target.value)}
                >
                  <option value="'Times New Roman', Times, serif">
                    Times New Roman
                  </option>
                  <option value=" Georgia, 'Times New Roman', Times, serif">
                    Georgia
                  </option>
                  <option value="Arial, Helvetica, sans-serif">Arial</option>
                  <option value="Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif">
                    Impact
                  </option>
                </select>
              </label>
            </form>
          </div>
          <div
            style={{
              height: 35,
              background: "#cccccc",
              width: 1,
              marginRight: 20,
              marginLeft: 20,
            }}
          ></div>
          <div>
            <button
              style={{
                borderRadius: 100,
                width: 30,
                height: 30,
                border: "none",
                background: `rgba(${
                  this.props.color[this.props.row][this.props.col].r
                }, ${this.props.color[this.props.row][this.props.col].g}, ${
                  this.props.color[this.props.row][this.props.col].b
                }, ${this.props.color[this.props.row][this.props.col].a})`,
              }}
              onClick={this.openColorBoard}
            ></button>
            {this.props.ColorBoard === true ? (
              <div style={{ position: "absolute", zIndex: 2 }}>
                <SketchPicker
                  color={`rgba(${
                    this.props.color[this.props.row][this.props.col].r
                  }, ${this.props.color[this.props.row][this.props.col].g}, ${
                    this.props.color[this.props.row][this.props.col].b
                  }, ${this.props.color[this.props.row][this.props.col].a})`}
                  onChange={this.handleChangeColor}
                />
              </div>
            ) : null}
          </div>
          <div
            style={{
              height: 35,
              background: "#cccccc",
              width: 1,
              marginRight: 20,
              marginLeft: 20,
            }}
          ></div>
          <div>
            <img
              src={fillColor}
              width={20}
              height={20}
              onClick={this.openFillColorBoard}
            />
            <div
              style={{
                width: 20,
                height: 5,
                background: this.props.backgroundGrid[this.props.row][
                  this.props.col
                ],
              }}
            ></div>
            {this.props.FillColorBoard === true ? (
              <div style={{ position: "absolute", zIndex: 2 }}>
                <GithubPicker
                  color={
                    this.props.backgroundGrid[this.props.row][this.props.col]
                  }
                  onChange={this.handleChangeBackGround}
                />
              </div>
            ) : null}
          </div>
          <div
            style={{
              height: 35,
              background: "#cccccc",
              width: 1,
              marginRight: 20,
              marginLeft: 20,
            }}
          ></div>
          <BsTextLeft
            className="iconPosition"
            size="30"
            color="gray"
            style={{ marginTop: 3, marginRight: 10 }}
          />
          <BsTextCenter
            className="iconPosition"
            size="30"
            color="gray"
            style={{ marginTop: 3, marginRight: 10 }}
          />
          <BsTextRight
            className="iconPosition"
            size="30"
            color="gray"
            style={{ marginTop: 3, marginRight: 10 }}
          />
          <div
            style={{
              height: 35,
              background: "#cccccc",
              width: 1,
              marginRight: 20,
              marginLeft: 10,
            }}
          ></div>
          <form>
            <label>
              <select className="formSelect" value={this.props.heightCol}>
                <option value="103">30</option>
                <option value=" 90">40</option>
                <option value="150">50</option>
                <option value="160">60</option>
              </select>
            </label>
          </form>

          <form>
            <label>
              <select className="formSelect" value={this.props.widthRow}>
                <option value="103">103</option>
                <option value=" 90">90</option>
                <option value="150">150</option>
                <option value="160">160</option>
              </select>
            </label>
          </form>
        </div>

        <div className="formInput" style={{ display: "flex" }}>
          <div className="dropdown">
            <span
              style={{
                color: "#ccc ",
                fontSize: 28,
                marginTop: 2,
                fontFamily: "cursive",
                fontStyle: "italic",
                marginLeft: 25,
              }}
            >
              fx
            </span>
            <div className="dropdown-content">
              <p>+ , - </p>
              <p>* , / </p>
              <p>^</p>
              <p>PI, E</p>
            </div>
          </div>
          <p>
            {this.props.ColTable[this.props.col]}
            {this.props.row}
          </p>
          <div
            style={{
              height: 35,
              background: "#cccccc",
              width: 2,
              marginLeft: 4,
            }}
          ></div>
          <form
            style={{ marginTop: 5, fontSize: 15, width: "100%" }}
            onSubmit={(event) => this.SubmitFormAll(event)}
          >
            <input
              type="text"
              className="inputAll"
              value={this.props.valueFlag}
              onChange={(event) => this.ChangeValueAll(event.target.value)}
            />
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    nRows: state.excel.nRows,
    nColumns: state.excel.nColumns,
    styleText: state.excel.styleText,
    col: state.excel.col,
    row: state.excel.row,
    textStatus: state.excel.textStatus,
    sizeText: state.excel.sizeText,
    ColorBoard: state.excel.ColorBoard,
    color: state.excel.color,
    valueFlag: state.excel.value,
    dataTable: state.excel.dataTable,
    fontFamily: state.optionsFontFamily.fontFamily,
    FillColorBoard: state.excel.FillColorBoard,
    backgroundGrid: state.excel.backgroundGrid,
    ColTable: state.excel.ColTable,
    widthRow: state.excel.widthRow,
    heightCol: state.excel.heightCol,
  };
};
const mapDispacthToProps = (dispatch, props) => {
  return {
    changeBold: (style) => {
      dispatch(actions.changeBold(style));
    },
    changeInti: (style) => {
      dispatch(actions.changeIntinate(style));
    },
    changeNor: (style) => {
      dispatch(actions.changeNormal(style));
    },
    changeTextStatus: (status) => {
      dispatch(actions.changeTextStatus(status));
    },
    changeSizeTextDown: (size) => {
      dispatch(actions.changeTextSizeDown(size));
    },
    changeSizeTextUp: (size) => {
      dispatch(actions.changeTextSizeUp(size));
    },
    openColorBoard: () => {
      dispatch(actions.ColorBoard());
    },
    openFillColorBoard: () => {
      dispatch(actions.fillColorBoard());
    },
    changeColor: (color) => {
      dispatch(actions.changeColor(color));
    },
    showValue: (value) => {
      dispatch(actions.showValue(value));
    },
    setValue: (newValue) => {
      dispatch(actions.setValue(newValue));
    },
    changeFontFamily: (font) => {
      dispatch(actions.changeFontFamily(font));
    },
    changeBackgroundGrid: (color) => {
      dispatch(actions.changeBackground(color));
    },
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Extentions);
