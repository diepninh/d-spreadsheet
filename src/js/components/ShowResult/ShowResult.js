import React from "react";
import './ShowResult.css';
class ShowResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="ShowResult result-contain">
                {
                    this.props.TableResult.map((e, row) => {
                        return (
                            <div key={row} className="resultRow">
                                {e.map((el, col) =>

                                    <div key={col}>
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
export default ShowResult;