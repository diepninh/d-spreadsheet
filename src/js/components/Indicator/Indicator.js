import React from 'react'
import './Indicator.css'
import GridTable from '../GridTable/GridTable.js'
class Indicator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            rowShowInput : "", 
            colShowInput:"",
            value : ""
            }
        this.DEFAULT_WIDTH = 90;
        this.DEFAULT_HEIGHT = 50;
    }
    showInput = () => {
        this.setState({
            rowShowInput : this.props.row , 
            colShowInput : this.props.col, 
            value : this.props.value
        });
    }
    ChangeValue = (value)=>{
        this.setState({value : value})
        this.props.OnValueChanged(value)
    }
    render() {
        return (
            <div onDoubleClick={() => this.showInput()}>
                <div className=" Indicator containIn"
                    style={{
                        width: this.props.width || this.DEFAULT_WIDTH, height: this.props.height || this.DEFAULT_HEIGHT, background: this.props.backGround
                        , left: this.props.col * (this.props.width + 2), top: this.props.row * (this.props.height + 2
                        ), border: this.props.border
                    }}

                >
                    <div>
                        <input type="text" value={this.state.value}
                         className={ this.state.rowShowInput === this.props.row && this.state.colShowInput === this.props.col? "displayInput" : "displayNoInput"}
                         onChange={(event)=>this.ChangeValue(event.target.value                     )} />
                        
                    </div>
                    <div className="pointer">
                    </div>

                </div>

            </div>


        )
    }
}
export default Indicator