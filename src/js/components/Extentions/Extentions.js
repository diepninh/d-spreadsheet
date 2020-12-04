import React from 'react';
import './Extentions.css'
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
class Extentions extends React.Component {
    constructor(props) {
        super(props);
    }
    changeBoldText = () => {
        let newValue = new Array();
        for (let i = 0; i < this.props.nRows; i++) {
            newValue[i] = new Array()
            for (let j = 0; j < this.props.nColumns; j++) {
                newValue[i][j] = this.props.styleText[i][j];
            }
        }
        newValue[this.props.row][this.props.col] = "bold";
        this.props.changeBold(newValue);
        this.props.changeTextStatus("bold");
        console.log(this.props.textStatus)
    }
    changeIntiText = () => {
        let newValue = new Array();
        for (let i = 0; i < this.props.nRows; i++) {
            newValue[i] = new Array()
            for (let j = 0; j < this.props.nColumns; j++) {
                newValue[i][j] = this.props.styleText[i][j];
            }
        }
        newValue[this.props.row][this.props.col] = "italic";
        this.props.changeInti(newValue);
        this.props.changeTextStatus("italic");
    }
    changeNorText = () => {
        let newValue = new Array();
        for (let i = 0; i < this.props.nRows; i++) {
            newValue[i] = new Array()
            for (let j = 0; j < this.props.nColumns; j++) {
                newValue[i][j] = this.props.styleText[i][j];
            }
        }
        newValue[this.props.row][this.props.col] = "normal";
        this.props.changeNor(newValue);
        this.props.changeTextStatus("normal");
    }
    GetStyleText = (row, col) => {

    }
    render() {
        return (
            <div className="Extentions toolBar">
                <div className="extentions">
                    <button onClick={this.changeBoldText} className="customButton" style={{ fontWeight: "bold" }} >B</button>
                    <button onClick={this.changeIntiText} className="customButton" style={{ fontStyle: "italic", fontFamily: "fantasy" }}>I</button>
                    <button onClick={this.changeNorText} className="customButton">N</button>
                    <div>
                        <form onSubmit={this.handleSubmit} className="formSizeText">
                            <label>

                                <select  >
                                    <option value= "10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                    <option value="25">25</option>
                                    <option value= "30">30</option>
                                    <option value="35">35</option>
                                    <option value="40">40</option>
                                    <option value="45">45</option>
                                </select>
                            </label>
                        </form>
                    </div>
                </div>


                <div className="formInput"></div>
            </div>
        )
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
    }
}
const mapDispacthToProps = (dispatch, props) => {
    return {
        changeBold: (style) => {
            dispatch(actions.changeBold(style))
        },
        changeInti: (style) => {
            dispatch(actions.changeIntinate(style))
        },
        changeNor: (style) => {
            dispatch(actions.changeNormal(style))
        },
        changeTextStatus: (status) => {
            dispatch(actions.changeTextStatus(status))
        },
    }
}
export default connect(mapStateToProps, mapDispacthToProps)(Extentions);