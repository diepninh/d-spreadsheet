import React from "react";
import './ColWord.css';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
class ColRow extends React.Component {
  constructor(props) {
    super(props);
  }
  SelectAllCol = (col) => {
    let newData = new Array()
    for (let i = 0; i < this.props.nRows; i++) {
      newData[i] = new Array()
      for (let j = 0; j < this.props.nColumns; j++) {
        if (j === col) {
          newData[i][j] = true;
        }
        else {
          newData[i][j] = false;
        }
      }
    }
    this.props.selectedCell(newData);
    this.props.getPosioion(0, col);

  }
  // ChangeSizeWidth = (size ) => {
  //     if(this.props.col === this.props.colSize){
  //    this.props.changeWidthCell(size.width)}

  // }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div className="ColWord wordCol" style={{ height: this.props.heightCol }}>
          {
            this.props.ColTable.map((e, col) => {
              return (
                <div key={col} className={col === this.props.colIndi ? "itemColIndi" : "itemCol"}
                  style={{ width: col === this.props.colSize ? this.props.width : this.props.widthA }}
                  onClick={() => this.SelectAllCol(col)}
                >
                  <div style={{ display: "flex" }}>

                    <div style={{ textAlign: "center", width: col === this.props.colSize ? this.props.width : (this.props.widthA) }}>
                      {e}
                    </div>
                  </div>

                </div>
              )
            })
          }
        </div>
        <button style={{ height: this.props.heightCol, border: 'none', borderRadius: 10, marginLeft: 3 }}>
          +
        </button>
      </div>

    )
  }
}
const mapStateToProps = (state) => {
  return {
    ColTable: state.excel.ColTable,
    colIndi: state.excel.col,
    width: state.excel.widthCell,
    heightCol: state.excel.heightCol,
    selectedTable: state.excel.selectedTable,
    nRows: state.excel.nRows,
    nColumns: state.excel.nColumns,
    colSize: state.excel.colSize,
    widthA: state.excel.widthA,
    heightA: state.excel.heightA,
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    selectedCell: (newData) => {
      dispatch(actions.selectedCell(newData))
    },
    getPosioion: (row, col) => {
      dispatch(actions.getPosition(row, col))

    },
    checkPointer: (status) => {
      dispatch(actions.checkPointer(status))
    },
    changeWidthCell: (value) => {
      dispatch(actions.changeWidthCell(value))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ColRow)