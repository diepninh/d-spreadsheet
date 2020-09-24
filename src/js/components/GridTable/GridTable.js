import React from 'react';
import './GridTable.css'

class GridTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    GetPosition = (row, col) => {
        this.props.ChangePosition(row, col)
        console.log(this.props.value)
    }
   
    render() {
        return (

            <div className="GridTable grid-container" >
                {
                    this.props.dataTable.map((e, row) => {
                        return (
                            <div key={row} className="grid-row">
                                {e.map((el, col) =>

                                    <div className={this.props.selectedTable[row][col] === true ? "grid-item grid-item-selected" : "grid-item"} key={col.toString()}
                                        style={{ width: this.props.widthCell, height: this.props.heightCell, background: this.props.backGround }}

                                        onClick={() => this.GetPosition(row, col)}
                                    >
                                        {el}
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
export default GridTable;