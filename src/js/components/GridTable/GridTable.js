import React from 'react';
import './GridTable.css';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

class GridTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
    GetPosition = (row, col) => {
        this.props.ChangePosition(row, col);
        this.props.EventKeyBoardChangeValue(this.props.row,this.props.col);
        this.props.changeValueFlag(this.props.dataTable[row][col]);
    }

    render() {
        return (
            <div className="GridTable grid-container" >
                {
                    this.props.dataTable.map((e, row) => {
                        return (
                            <div key={row} className="grid-row" style={{ height:  row === this .props.rowSize ? this.props.height +2 : this.props.heightA + 2 ,
                                width :  this.props.width *(this.props.nColumns +1)}}>
                                {e.map((el, col) =>

                                    <div className={this.props.selectedTable[row][col] === true ? "grid-item grid-item-selected" : "grid-item"} key={col.toString()}
                                        style={{
                                            width: col === this.props.colSize ? this.props.width : this.props.widthA  ,
                                            height: row === this.props.rowSize ? this.props.height : this.props.heightA  
                                        }}

                                        onClick={() => this.GetPosition(row, col)}
                                    >
                                        <div className="styleText" style={{width: col === this.props.colSize ? this.props.width : this.props.widthA  ,
                                            height: row === this.props.rowSize ? this.props.height : this.props.heightA  , textAlign: "center"}}>
                                            <div style={{ fontWeight : this.props.styleText[row][col] , fontStyle : this.props.styleText[row][col]}}>
                                                {el}</div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        )
                    })

                }

            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        dataTable: state.excel.dataTable,
        selectedTable: state.excel.selectedTable,
        width: state.excel.widthCell,
        height: state.excel.heightCell,
        nRows: state.excel.nRows,
        nColumns: state.excel.nColumns,
        widthA: state.excel.widthA,
        heightA: state.excel.heightA,
        colSize: state.excel.colSize,
        rowSize : state.excel.rowSize,
        col : state.excel.col,
        row : state.excel.row,
        styleText : state.excel.styleText,
    }
}
const mapDispacthToProps = (dispatch, props) => {
    return {
        changeValueFlag: (value) =>{
            dispatch(actions.changeValueFlag(value))
        },
    }
}
export default connect(mapStateToProps, mapDispacthToProps)(GridTable);