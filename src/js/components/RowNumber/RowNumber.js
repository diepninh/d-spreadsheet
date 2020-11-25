import React from "react";
import './RowNumber.css';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
class RowNumber extends React.Component {
    constructor(props) {
        super(props);
    }
    SelectAllRow =(row) => {
        let newData = new Array()
        for (let i = 0; i < this.props.nRows; i++) {
            newData[i] = new Array()
            for (let j = 0; j < this.props.nColumns; j++) {
                if( i === row){
                newData[i][j] = true;}
                else{
                    newData[i][j] = false;
                }
            }
        }
        this.props.selectedCell(newData);
        this.props.getPosition( row,0);
        this.props.checkPointer(false);
    }

    render() {
        return (
            <div className="RowNumber numberRow" style={{ width: this.props.widthRow }}>
                {
                    this.props.RowTable.map((e, row) => {
                        return (
                            <div key={row} className={row === this.props.rowIndi ? "itemRowIndi" : "itemRow"}
                                style={{ height:row === this.props.rowSize ? this.props.height : this.props.heightA  , width: this.props.widthRow }}
                                onClick ={() =>this.SelectAllRow(row)}
                            >
                                {e} 
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
        RowTable: state.excel.RowTable,
        height: state.excel.heightCell,
        rowIndi: state.excel.row,
        widthRow: state.excel.widthRow,
        nRows : state.excel.nRows,
        nColumns : state.excel.nColumns,
        widthA : state.excel.widthA,
        heightA : state.excel.heightA,
        rowSize : state.excel.rowSize,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        selectedCell: (newData) => {
            dispatch(actions.selectedCell(newData))
        },
        getPosition: (row, col) => {
            dispatch(actions.getPosition(row, col))

        },
        checkPointer: (status) => {
            dispatch(actions.checkPointer(status))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RowNumber)