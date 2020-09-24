import React from 'react'
import GridTable from '../GridTable/GridTable.js'
import Indicator from '../Indicator/Indicator.js'
 
class ExcelTable extends React.Component {
    constructor(props) {
        super(props);
        let tempTable = new Array()
        for (let i = 0; i < (this.props.dataTable.length); i++) {

            tempTable[i] = new Array()
         for (let j = 0; j < this.props.dataTable[i].length; j++) {
                tempTable[i][j] = false

            }
        }
        this.state = {
            row: 0,
            col: 0,
            dataTable: this.props.dataTable,
            selectedTable: tempTable,
            display: "none",
            backGround: "blue",
            keyboard: false,
            value : "123",
            rowValue : " ",
            colValue : " "
        }

    }
    HightLighted = (row ,col) =>{
        let oldRow = this.state.row;
        let oldCol = this.state.col;
        let newData = new Array()
        for (let i = 0; i < (this.props.dataTable.length); i++) {
            newData[i] = new Array()
            for (let j = 0; j < this.props.dataTable[i].length; j++) {
                newData[i][j] = false;
            }
        }
        if (this.state.keyboard === true) {
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
            
            this.setState({ selectedTable: newData });
        }
        else
        {
            for (let i = 0; i < (this.props.dataTable.length); i++) {
                for (let j = 0; j < this.props.dataTable[i].length; j++) {
                    newData[i][j] = false;
                }
            }
            this.setState({ selectedTable: newData });
        }
    }
    GetCellValue = (row,col) => {
        console.log(row ,col,this.state.dataTable[row][col])
        return this.state.dataTable[row][col]
        
    }
    SetCellValue = (row , col, value) => {
        this.setState(function(oldState){
            oldState.dataTable[row][col] = value;
            return oldState
        })
    }
    ChangeIndicatorPosition = (row, col) => {
       
        this.setState({ row: parseInt(row), col: parseInt(col) })
        this.HightLighted(row,col)
       
    }
    handleDown = (event) => {
        let oldRow = this.state.row
        let oldCol = this.state.col
        if (event.key === "Shift") { this.setState({ keyboard: true }) }
        else if(event.key === "ArrowUp" && oldRow >= 1){ this.setState({row : oldRow-1})}
        else if(event.key === "ArrowDown"&& oldRow < this.state.dataTable.length-1){ this.setState({row : oldRow + 1})}
        else if(event.key === "ArrowRight" && oldCol < this.state.dataTable.length-1){ this.setState({col :  oldCol +1})}
        else if(event.key === "ArrowLeft"&&oldCol >=1){this.setState({col : oldCol -1})}
    }
    handleUp = (event) =>{
        this.setState({keyboard : false})
    }
    UpdateValue = (value)=>{
       this.setState({value : value})
       
    }

    componentDidMount(event) {

        window.addEventListener("keydown", this.handleDown)
        window.addEventListener("keyup", this.handleUp)

    }

    render() {
        return (
            <div className="ExcelTable">
                <Indicator backGround={"none"} row={this.state.row} col={this.state.col} border={"2px solid blue"}
                    width={this.props.widthCell} height={this.props.heightCell} value={ this.GetCellValue(this.state.row, this.state.col) } 
                    OnValueChanged={  (value) =>{this.SetCellValue(this.state.row, this.state.col, value) }  }
                />

                <GridTable widthCell={this.props.widthCell} heightCell={this.props.heightCell}
                    dataTable={this.state.dataTable} ChangePosition={this.ChangeIndicatorPosition} selectedTable={this.state.selectedTable}  
                />
            </div>
        )
    }
}
export default ExcelTable