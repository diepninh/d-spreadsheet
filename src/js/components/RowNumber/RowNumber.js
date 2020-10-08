import React from "react" ;
import './RowNumber.css'
class RowNumber extends React.Component{
    constructor(props){
        super(props);
        let ColTable = new Array();
        for(let i=0;i < this.props.nRows;i++){
            ColTable[i]= i;
        }
        this.state={ColTable :ColTable}
    }
    
    render(){
        return(
            <div className ="RowNumber numberRow"> 
                {
                    this.state.ColTable.map((e,row)=>{
                        return(
                            <div key={row} className={row === this.props.rowIndi ? "itemRowIndi" : "itemRow"} style={{ height: this.props.height}}>{e}</div>
                        )
                    })
                }
            </div>
        )
    }
}
export default RowNumber