import React from 'react'
import GridTable from '../GridTable/GridTable.js'
import Indicator from '../Indicator/Indicator.js'
import ColWord from '../ColWord/ColWord.js'
import RowNumber from '../RowNumber/RowNumber.js'
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import Extentions from '../Extentions/Extentions.js';
class ExcelTable extends React.Component {
    constructor(props) {
        super(props);
    }
    ChangeTextStyleWhenHightLighted = (row, col) => {
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
                            newData[i][j] = this.props.textStatus;
                        }
                    }
                }
                else {
                    for (let i = oldRow; i <= row; i++) {
                        for (let j = col; j <= oldCol; j++) {
                            newData[i][j] = this.props.textStatus;
                        }
                    }
                }
            }
            else if (oldRow > row) {
                if (oldCol <= col) {
                    for (let i = row; i <= oldRow; i++) {
                        for (let j = oldCol; j <= col; j++) {
                            newData[i][j] = this.props.textStatus;
                        }
                    }
                }
                else {
                    for (let i = row; i <= oldRow; i++) {
                        for (let j = col; j <= oldCol; j++) {
                            newData[i][j] = this.props.textStatus;
                        }
                    }
                }
            }

            this.props.changeBold(newData);
        }
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
        this.ChangeTextStyleWhenHightLighted(row, col);
    }
    EventKeyBoardChangeValue = (row, col) => {
        this.props.showInput(false);
        this.props.checkPointer(true);
        let newValue = new Array();
        for (let i = 0; i < this.props.nRows; i++) {
            newValue[i] = new Array()
            for (let j = 0; j < this.props.nColumns; j++) {
                newValue[i][j] = this.props.dataTable[i][j];
            }
        }
        if (this.props.value[0] != '=') {
            newValue[row][col] = this.props.value;
        }
        else {
            if (this.props.value.length === 1) {
                newValue[row][col] = '';
            } else if (this.props.value[1] > 'a' && this.props.value[1] < 'z' || this.props.value[1] > 'A' && this.props.value[1] < 'Z') {
                for (let i = 0; i < this.props.value.length; i++) {
                    for (let j = 1; j < this.props.value.length; j++) {
                        if (this.props.value[i] > 'a' && this.props.value[i] < 'z' || this.props.value[i] > 'A' && this.props.value[i] < 'Z') {
                            newValue[row][col] = '#NAME?';
                        }
                        else if (this.props.value[i] === '+' || this.props.value[i] === '-' || this.props.value[i] === '*' || this.props.value[i] === '/') {
                            if (this.props.value[j] === '+') {
                                newValue[row][col] = '#ERROR!';
                            }
                        }
                    }
                }
            }
            else if (this.props.value[1] >= 0 && this.props.value[1] <= 9) {
                newValue[row][col] = require("../../../calculator").parse(this.props.value.slice(1));
            }


        }
        this.props.setValue(newValue)
    }
    handleDown = (event) => {
        let oldRow = this.props.row
        let oldCol = this.props.col
        if (event.key === "Shift") { this.props.changeKeyboard(true) }
        else if (event.key === "ArrowUp" && oldRow >= 1) {
            this.props.checkKey(oldRow - 1, oldCol);
            this.EventKeyBoardChangeValue(this.props.row + 1, this.props.col);
            this.props.showInput(false);
            this.props.checkPointer(true);
            this.props.changeValueFlag(this.props.dataTable[this.props.row][this.props.col]);
        }
        else if (event.key === "ArrowDown" && oldRow < this.props.nRows - 1) {
            this.props.checkKey(oldRow + 1, oldCol);
            this.EventKeyBoardChangeValue(this.props.row - 1, this.props.col);
            this.props.showInput(false);
            this.props.checkPointer(true);
            this.props.changeValueFlag(this.props.dataTable[this.props.row][this.props.col]);
        }
        else if (event.key === "ArrowRight" && oldCol < this.props.nColumns - 1) {
            this.props.checkKey(oldRow, oldCol + 1);
            this.EventKeyBoardChangeValue(this.props.row, this.props.col - 1);
            this.props.showInput(false);
            this.props.checkPointer(true);
            this.props.changeValueFlag(this.props.dataTable[this.props.row][this.props.col]);
        }
        else if (event.key === "ArrowLeft" && oldCol >= 1) {
            this.props.checkKey(oldRow, oldCol - 1);
            this.EventKeyBoardChangeValue(this.props.row, this.props.col + 1);
            this.props.showInput(false);
            this.props.checkPointer(true);
            this.props.changeValueFlag(this.props.dataTable[this.props.row][this.props.col]);
        }
        else if (event.ctrlKey && event.keyCode === 67) {
            let newValue = new Array();
            for (let i = 0; i < this.props.nRows; i++) {
                newValue[i] = new Array()
                for (let j = 0; j < this.props.nColumns; j++) {
                    newValue[i][j] = this.props.copiedTable[i][j];
                }
            }
            for (let i = 0; i < this.props.nRows; i++) {
                for (let j = 0; j < this.props.nColumns; j++) {
                   if(i=== this.props.row && j ===this.props.col){
                       newValue[i][j] = true;
                   }else{
                       newValue[i][j] = false;
                   }
                }
                
            }
            
            this.props.copyData(newValue);
            this.props.changeDataCopied(this.props.dataTable[this.props.row][this.props.col])
        }
        else if (event.ctrlKey && event.keyCode === 86){
            let newValue = new Array();
            for (let i = 0; i < this.props.nRows; i++) {
                newValue[i] = new Array()
                for (let j = 0; j < this.props.nColumns; j++) {
                    newValue[i][j] = false;
                }
            }
            let newData = new Array();
            for (let i = 0; i < this.props.nRows; i++) {
                newData[i] = new Array()
                for (let j = 0; j < this.props.nColumns; j++) {
                    // newData[i][j] = this.props.dataTable[i][j];
                    newData[i][j] === "1";
                }
            }
             
            this.props.setValue(newData);
            console.log(this.props.dataTable[this.props.row][this.props.col])
            this.props.copyData(newValue);
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
    ChangeRow = (value) => {
        if (value < this.props.nRows) {
            this.props.changeRow(parseInt(value));
        }
    }
    ChangeCol = (value) => {
        if (value < this.props.nColumns) {
            this.props.changeCol(parseInt(value));
        }
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

                <Extentions />

                <div  >
                    <div style={{ display: "flex", width: this.props.width * (this.props.nColumns + 1) + this.props.widthRow }}>
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
                        <GridTable ChangePosition={this.ChangeIndicatorPosition} EventKeyBoardChangeValue={this.EventKeyBoardChangeValue} />
                        <Indicator backGround={"none"} border={"2px solid blue"} />

                    </div>
                </div>

                {/* <form onSubmit={(event) => this.Submit(event)}>
                    <label>widthRow :
                        <input type="text" onChange={(event) => this.ChangeWidthRow(event.target.value)} />
                    </label><div style={{ display: "flex" ,width : this.props.width *(this.props.nColumns+1) +this.props.widthRow, marginTop: 100}}>
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
                    <GridTable ChangePosition={this.ChangeIndicatorPosition} EventKeyBoardChangeValue={this.EventKeyBoardChangeValue}/>
                    <Indicator backGround={"none"} border={"2px solid blue"} />

                </div>
                {/* <form onSubmit={(event) => this.Submit(event)}>
                    <label
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
                {this.props.dataTable} */}
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
        width: state.excel.widthCell,
        textStatus: state.excel.textStatus,
        copiedTable: state.excel.copiedTable,
        dataCopied : state.excel.dataCopied,
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
        changeRow: (row) => {
            dispatch(actions.changeRow(row))
        },
        changeCol: (col) => {
            dispatch(actions.changeCol(col))
        },
        setValue: (newValue) => {
            dispatch(actions.setValue(newValue))
        },
        changeValueFlag: (value) => {
            dispatch(actions.changeValueFlag(value))
        },
        changeBold: (style) => {
            dispatch(actions.changeBold(style))
        },
        changeInti: (style) => {
            dispatch(actions.changeIntinate(style))
        },
        changeNor: (style) => {
            dispatch(actions.changeNormal(style))
        },
        copyData: (newValue) => {
            dispatch(actions.copyData(newValue))
        },
        changeDataCopied: (data) =>{
            dispatch(actions.changeDataCopied(data))
        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ExcelTable);