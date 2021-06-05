import React from "react";
import "./Indicator.css";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
class Indicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.DEFAULT_WIDTH = 90;
    this.DEFAULT_HEIGHT = 50;
    this.DataInput = React.createRef();
  }
  showInput = () => {
    this.props.showInput(true);
    this.props.showValue(this.props.dataTable[this.props.row][this.props.col]);
    let newValue = new Array();
    for (let i = 0; i < this.props.nRows; i++) {
      newValue[i] = new Array();
      for (let j = 0; j < this.props.nColumns; j++) {
        newValue[i][j] = this.props.dataTable[i][j];
      }
    }
    newValue[this.props.row][this.props.col] = "";
    this.props.setValue(newValue);
    this.props.checkPointer(false);
  };
  SubmitForm = (event) => {
    this.props.showInput(false);
    this.props.checkPointer(true);
    let newValue = new Array();
    for (let i = 0; i < this.props.nRows; i++) {
      newValue[i] = new Array();
      for (let j = 0; j < this.props.nColumns; j++) {
        newValue[i][j] = this.props.dataTable[i][j];
      }
    }

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
  ChangeValue = (value) => {
    if (value[0] === " ") {
      this.props.showValue(value.slice(1));
    } else {
      this.props.showValue(value);
    }
  };

  render() {
    return (
      <div
        onDoubleClick={() => this.showInput()}
        className="Indicator containIn"
        style={{
          width:
            this.props.col === this.props.colSize
              ? this.props.width
              : this.props.widthA,
          height:
            this.props.row === this.props.rowSize
              ? this.props.height
              : this.props.heightA,
          background: this.props.backGround,
          left:
            this.props.col >= this.props.colSize + 1
              ? (this.props.col - 1) * (this.props.widthA + 2) +
                this.props.width +
                this.props.widthRow
              : this.props.col * (this.props.widthA + 2) + this.props.widthRow,
          top:
            this.props.row >= this.props.rowSize + 1
              ? (this.props.row - 1) * (this.props.heightA + 2) +
                this.props.height +
                this.props.heightCol +
                72
              : this.props.row * (this.props.heightA + 2) +
                this.props.heightCol +
                72,
          border: this.props.border,
        }}
      >
        <div>
          <form onSubmit={(event) => this.SubmitForm(event)}>
            <input
              type="text"
              value={this.props.valueFlag}
              className={
                this.props.showInputFlag ? "displayInput" : "displayNoInput"
              }
              style={{
                width: this.props.width - 10,
                height: this.props.height - 10,
                fontSize: 15,
                background: this.props.backGround,
                textAlign: "center",
              }}
              onChange={(event) => this.ChangeValue(event.target.value)}
              autoFocus
            />
          </form>
        </div>
        <div
          className={this.props.pointer === true ? "pointer" : "pointerNone"}
        ></div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    width: state.excel.widthCell,
    height: state.excel.heightCell,
    row: state.excel.row,
    col: state.excel.col,
    showInputFlag: state.excel.showInputFlag,
    valueFlag: state.excel.value,
    widthRow: state.excel.widthRow,
    heightCol: state.excel.heightCol,
    dataTable: state.excel.dataTable,
    pointer: state.excel.pointer,
    nRows: state.excel.nRows,
    nColumns: state.excel.nColumns,
    widthA: state.excel.widthA,
    heightA: state.excel.heightA,
    rowSize: state.excel.rowSize,
    colSize: state.excel.colSize,
  };
};
const mapDispatchProps = (dispatch) => {
  return {
    showInput: (status) => {
      dispatch(actions.showInput(status));
    },
    showValue: (value) => {
      dispatch(actions.showValue(value));
    },
    setValue: (newValue) => {
      dispatch(actions.setValue(newValue));
    },
    checkPointer: (status) => {
      dispatch(actions.checkPointer(status));
    },
  };
};
export default connect(mapStateToProps, mapDispatchProps)(Indicator);
