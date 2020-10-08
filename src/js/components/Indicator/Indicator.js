import React from 'react'
import './Indicator.css'
import GridTable from '../GridTable/GridTable.js'
class Indicator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            showInputFlag: false,
            
            value : ""
            }
        this.DEFAULT_WIDTH = 90;
        this.DEFAULT_HEIGHT = 50;
    }
    showInput = () => {
        this.setState({
            showInputFlag: true,
            
            value : this.props.value
        });
    }
    hideInput=(event)=>{
        this.setState({
            showInputFlag: false,
        });
    }
    ChangeValue = (value)=>{
        this.setState({value : value})
        this.props.OnValueChanged(value)
    }
    
    render() {
        return (
            <div onDoubleClick={() => this.showInput()} className="Indicator containIn"
                style={{
                    width: this.props.width || this.DEFAULT_WIDTH, height: this.props.height || this.DEFAULT_HEIGHT, background: this.props.backGround
                    , left: (this.props.col * (this.props.width + 2))+30, top:(this.props.row * (this.props.height + 2))+30 , border: this.props.border
                }}
            >
                <div>
                    <input type="text" value={this.state.value}
                        className={ this.state.showInputFlag ? "displayInput" : "displayNoInput"}
                        onChange={(event)=>this.ChangeValue(event.target.value )}
                        onBlur={this.hideInput}/>
                    
                </div>
                <div className="pointer">
                </div>

            </div>



        )
    }
}
export default Indicator