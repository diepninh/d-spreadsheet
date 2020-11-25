import React from 'react'
import GridTable from '../GridTable/GridTable.js'
import Indicator from '../Indicator/Indicator.js'
import ColWord from '../ColWord/ColWord.js'
import RowNumber from '../RowNumber/RowNumber.js'
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
class ExcelTable extends React.Component {
    constructor(props) {
        super(props);
    }
    HightLighted = (row, col) => {
        let oldRow = this.props.row;
        let oldCol = this.props.col;
        let newData = new Array()
        for (let i = 0; i < this.props.nRows; i++) {
            newData[i] = new Array()
            for (let j = 0; j < this.props.nColumns; j++) {
                newData[i][j] = false;
            }
        }
        if (this.props.keyboard === true) {
            if (oldRow <= row) {
                if (oldCol <= col) {
                    for (let i = oldRow; i <= row; i++) {
                        for (let j = oldCol; j <= col; j++) {
                            newData[i][j] = true;
                        }
                    }
                }
                else {
                    for (let i = oldRow; i <= row; i++) {
                        for (let j = col; j <= oldCol; j++) {
                            newData[i][j] = true;
                        }
                    }
                }
            }
            else if (oldRow > row) {
                if (oldCol <= col) {
                    for (let i = row; i <= oldRow; i++) {
                        for (let j = oldCol; j <= col; j++) {
                            newData[i][j] = true;
                        }
                    }
                }
                else {
                    for (let i = row; i <= oldRow; i++) {
                        for (let j = col; j <= oldCol; j++) {
                            newData[i][j] = true;
                        }
                    }
                }
            }

            this.props.selectedCell(newData);
        }
        else {
            for (let i = 0; i < (this.props.nRows); i++) {
                for (let j = 0; j < this.props.nColumns; j++) {
                    newData[i][j] = false;
                }
            }
            this.props.selectedCell(newData);
        }
    }
    ChangeIndicatorPosition = (row, col) => {
        this.props.showInput(false);
        this.HightLighted(row, col);
        this.props.getPosition(row, col);
        this.props.checkPointer(true);
    }
    handleDown = (event) => {
        let oldRow = this.props.row
        let oldCol = this.props.col
        if (event.key === "Shift") { this.props.changeKeyboard(true) }
        else if (event.key === "ArrowUp" && oldRow >= 1) {
            this.props.checkKey(oldRow - 1, oldCol);
            this.props.showInput(false);
            this.props.checkPointer(true);
        }
        else if (event.key === "ArrowDown" && oldRow < this.props.nRows - 1) {
            this.props.checkKey(oldRow + 1, oldCol);
            this.props.showInput(false);
            this.props.checkPointer(true);
        }
        else if (event.key === "ArrowRight" && oldCol < this.props.nColumns - 1) {
            this.props.checkKey(oldRow, oldCol + 1);
            this.props.showInput(false);
            this.props.checkPointer(true);
        }
        else if (event.key === "ArrowLeft" && oldCol >= 1) {
            this.props.checkKey(oldRow, oldCol - 1);
            this.props.showInput(false);
            this.props.checkPointer(true);
        }
        else {

        }
    }
    handleUp = (event) => {
        this.props.changeKeyboard(false)
    }
    componentDidMount(event) {

        window.addEventListener("keydown", this.handleDown)
        window.addEventListener("keyup", this.handleUp)

    }
    ChangeWidthRow = (value) => {
        this.props.changeWidth(parseInt(value));
    }
    ChangeHeightCol = (value) => {
        this.props.changeHeightCol(parseInt(value));
    }
    ChangeWidthCell = (value) => {
        this.props.changeWidthCell(parseInt(value));
    }
    ChangeHeightCell = (value) => {
        this.props.changeHeightCell(parseInt(value));
    }
    ChangeRow = (value) =>{
        if(value < this.props.nRows){
        this.props.changeRow(parseInt(value));}
    }
    ChangeCol = (value) =>{
        if(value< this.props.nColumns){
        this.props.changeCol(parseInt(value));}
    }
    Submit = (event) => {
        event.preventDefault();
    }
    SelectAllCell = () => {
        let newData = new Array()
        for (let i = 0; i < this.props.nRows; i++) {
            newData[i] = new Array()
            for (let j = 0; j < this.props.nColumns; j++) {
                newData[i][j] = true;
            }
        }
        this.props.selectedCell(newData);
        this.props.checkPointer(false);
        this.props.getPosition(0, 0);
    }

    render() {
        return (
            <div className="ExcelTable">
                <div style={{ display: "flex" }}>
                    <div style={{
                        width: this.props.widthRow, height: this.props.heightCol,
                        backgroundColor: '#eee', borderRight: '2px solid #ccc'
                    }}
                        onClick={this.SelectAllCell}
                    > </div>
                    <ColWord />
                </div>
                <div style={{ display: "flex" }}>
                    <RowNumber />
                    <GridTable ChangePosition={this.ChangeIndicatorPosition} />
                    <Indicator backGround={"none"} border={"2px solid blue"} />

                </div>
                <form onSubmit={(event) => this.Submit(event)}>
                    <label>widthRow :
                        <input type="text" onChange={(event) => this.ChangeWidthRow(event.target.value)} />
                    </label>
                    <label>heightCol :
                        <input type="text" onChange={(event) => this.ChangeHeightCol(event.target.value)} />
                    </label>
                    <label>widthCell :
                        <input type="text" onChange={(event) => this.ChangeWidthCell(event.target.value)} />
                    </label>
                    <label>heightCell :
                        <input type="text" onChange={(event) => this.ChangeHeightCell(event.target.value)} />
                    </label>
                    <label>Col :
                        <input type="text" onChange={(event) => this.ChangeCol(event.target.value)} />
                    </label>
                     <label>Row :
                        <input type="text" onChange={(event) => this.ChangeRow(event.target.value)} />
                    </label>
                </form>
                {this.props.dataTable}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        dataTable: state.excel.dataTable,
        row: state.excel.row,
        col: state.excel.col,
        selectedTable: state.excel.selectedTable,
        nRows: state.excel.nRows,
        nColumns: state.excel.nColumns,
        keyboard: state.excel.keyboard,
        widthRow: state.excel.widthRow,
        showInputFlag: state.excel.showInputFlag,
        value: state.excel.value,
        heightCol: state.excel.heightCol,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        getPosition: (row, col) => {
            dispatch(actions.getPosition(row, col))

        },
        selectedCell: (newData) => {
            dispatch(actions.selectedCell(newData))
        },
        checkKey: (row, col) => {
            dispatch(actions.checkKey(row, col))
        },
        changeKeyboard: (status) => {
            dispatch(actions.changeKeyboard(status))
        },
        showInput: (status) => {
            dispatch(actions.showInput(status))
        },
        changeWidth: (value) => {
            dispatch(actions.changeWidth(value))
        },
        changeHeightCol: (value) => {
            dispatch(actions.changeHeightCol(value))
        },
        changeHeightCell: (value) => {
            dispatch(actions.changeHeightCell(value))
        },
        changeWidthCell: (value) => {
            dispatch(actions.changeWidthCell(value))
        },
        checkPointer: (status) => {
            dispatch(actions.checkPointer(status))
        },
        changeRow : (row) =>{
            dispatch(actions.changeRow(row))
        },
        changeCol: (col) =>{
            dispatch(actions.changeCol(col))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ExcelTable);