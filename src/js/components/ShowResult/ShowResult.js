import React from 'react';
import './ShowResult.css';
import {connect} from 'react-redux';
class ShowResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="ShowResult result-contain">
        {
          this.props.dataTable.map((e, row) => {
            return (
              <div key={row} className="resultRow">
                {e.map((el, col) =>

                  <div key={col}>
                    {el}
                  </div>
                )}
              </div>
            );
          })

        }
      </div>
    );
  }
}
const mapStateToProps =(state) =>{
  return{
    dataTable : state.excel.dataTable,
  };
};
export default connect(mapStateToProps,null)(ShowResult);