import React from 'react'
import ReactDOM from 'react-dom'
import ExcelTable from './js/components/ExcelTable/ExcelTable.js'
const wrapper = document.getElementById("diepContainer");
let nRows = 5
let nColumns =5
let arrExcel = new Array()

for (let i = 0; i < nRows; i++) {
    arrExcel[i] = new Array()
    for (let j = 0; j < nColumns; j++) {
        arrExcel[i][j] = "x" + i + "-" + j;
    }
}
 
wrapper ? ReactDOM.render(
    <div className="container" style={{position: "relative"}}>
       <ExcelTable widthCell={180} heightCell={50}  dataTable={arrExcel} />
      
    </div>, wrapper) : false;
