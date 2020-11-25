import React from 'react';
import './Indicator.css';
import { connect } from 'react-redux';
import * as actions from '../../actions/index'
class Indicator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.DEFAULT_WIDTH = 90;
        this.DEFAULT_HEIGHT = 50;
        this.DataInput = React.createRef();

    }
    showInput = () => {
        this.props.showInput(true);
        this.props.showValue(this.props.dataTable[this.props.row][this.props.col]);
        this.props.checkPointer(false);
    }
    SubmitForm = (event) => {
        this.props.showInput(false);
        this.props.checkPointer(true);
        event.preventDefault();

    }
    ChangeValue = (value) => {
        this.props.showValue(value);
       
        let newValue = new Array()

        for (let i = 0; i < this.props.nRows; i++) {
            newValue[i] = new Array()
            for (let j = 0; j < this.props.nColumns; j++) {
                newValue[i][j] = this.props.dataTable[i][j];
            }
        }
         
        newValue[this.props.row][this.props.col] = value;
        this.props.setValue(newValue)

    }
    componentDidMount() {
        this.DataInput.current.focus();
    }

    render() {
        return (
            <div onDoubleClick={() => this.showInput()} className="Indicator containIn"
                style={{
                    width: this.props.col === this.props.colSize ? this.props.width : this.props.widthA ,
                     height: this.props.row === this.props.rowSize ? this.props.height : this.props.heightA 
                     , background: this.props.backGround
                    , left: this.props.col >= this.props.colSize +1 ? ((this.props.col -1) * (this.props.widthA  + 2))+ this.props.width + this.props.widthRow :(this.props.col * (this.props.widthA  + 2)) + this.props.widthRow,
                     top: this.props.row >= this.props.rowSize +1 ?((this.props.row -1)* (this.props.heightA + 2)) +this.props.height+ this.props.heightCol :(this.props.row * (this.props.heightA  + 2)) + this.props.heightCol, border: this.props.border
                }}
            >
                <div>
                    <form onSubmit={(event) => this.SubmitForm(event)}>
                        <input type="text" value={this.props.valueFlag}
                            ref={this.DataInput}
                            className={this.props.showInputFlag ? "displayInput" : "displayNoInput"}
                            style={{ width: this.props.width - 10, height: this.props.height - 10, fontSize: 15 }}
                            onChange={(event) => this.ChangeValue(event.target.value)}
                        />
                    </form>
                </div>
                <div className={this.props.pointer === true ? "pointer" : "pointerNone"}
                    
                >
                </div>

            </div>
        )
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
        nRows : state.excel.nRows,
        nColumns : state.excel.nColumns,
        widthA : state.excel.widthA,
        heightA : state.excel.heightA,
        rowSize : state.excel.rowSize,
        colSize : state.excel.colSize,
    }
}
const mapDispatchProps = (dispatch, props) => {
    return {
        showInput: (status) => {
            dispatch(actions.showInput(status))
        },
        showValue: (value) => {
            dispatch(actions.showValue(value))
        },
        setValue: (newValue) => {
            dispatch(actions.setValue(newValue))
        },
        checkPointer: (status) => {
            dispatch(actions.checkPointer(status))
        },
    }
}
export default connect(mapStateToProps, mapDispatchProps)(Indicator);