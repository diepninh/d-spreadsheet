import React from "react";
import './ColWord.css'
class ColRow extends React.Component {
    constructor(props) {
        super(props);
        let ColTable = new Array();
        let DataChar = [' ', 'A', 'B', 'C', 'D', 'E', 'F']
        for (let i = 0; i <= this.props.nColumns; i++) {

            ColTable[i] = DataChar[i];
        }

        this.state = { ColTable: ColTable }
    }

    render() {
        return (
            <div className="ColWord wordCol">
                {
                    this.state.ColTable.map((e, col) => {
                        return (
                            <div key={col} className={col != 0 ? col === this.props.colIndi+1 ? "itemColIndi" :"itemCol" : "itemColFirst"} >
                                <div className="formChar">
                                    {e}
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
export default ColRow