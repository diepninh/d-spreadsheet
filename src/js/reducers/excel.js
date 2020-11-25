import * as types from '../constaints/Actiontypes'
let nRows = 5
let nColumns = 6
let arrExcel = new Array()

for (let i = 0; i < nRows; i++) {
    arrExcel[i] = new Array()
    for (let j = 0; j < nColumns; j++) {
        arrExcel[i][j] = "";
    }
}

let ColTable = new Array();
let DataChar = ['A', 'B', 'C', 'D', 'E', 'F']
for (let i = 0; i < nColumns; i++) {
    ColTable[i] = DataChar[i];
}

let RowTable = new Array();
for (let i = 0; i < nRows; i++) {
    RowTable[i] = i;
}

let tempTable = new Array()
for (let i = 0; i < nRows; i++) {

    tempTable[i] = new Array()
    for (let j = 0; j < nColumns; j++) {
        tempTable[i][j] = false

    }
}

const initalState = {
    dataTable: arrExcel,
    row: 1,
    col: 1,
    widthCell: 180,
    heightCell: 50,
    nRows: nRows,
    nColumns: nColumns,
    ColTable: ColTable,
    RowTable: RowTable,
    selectedTable: tempTable,
    keyboard: false,
    showInputFlag: false,
    value: "",
    widthRow: 50,
    heightCol: 30,
    pointer : true,
    heitghtIndicator : 1 ,
    widthIndicator : 1,
    widthA : 180,
    heightA : 50,
    rowSize : 3 ,
    colSize : 4,
}
const myReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.SHOW_TABLE:
            return state;
        case types.GETPOSITION:
            state.row = parseInt(action.row);
            state.col = parseInt(action.col);
            return { ...state };
        case types.SELECTED_CELL:
            state.selectedTable = action.newData;
            return { ...state };
        case types.CHECKKEY:
            state.row = parseInt(action.row);
            state.col = parseInt(action.col);
            return { ...state };
        case types.CHANGEKEYBOARD:
            state.keyboard = action.status;
            return { ...state };
        case types.SETVALUE:
            state.dataTable = [...action.newValue];
            return { ...state };
        case types.SETSHOWINPUT:
            state.showInputFlag = action.status;
            return { ...state };
        case types.SETSHOWVALUE:
            state.value = action.value;
            return { ...state };
        case types.CHANGEWIDTH:
            state.widthRow = action.value;
            return { ...state };
        case types.CHANGEHEIGHTCOL:
            state.heightCol = action.value;
            return { ...state };
        case types.CHANGEWIDTHCELL:
            state.widthCell = action.value;
            return { ...state };
        case types.CHANGEHEIGHTCELL:
            state.heightCell = action.value;
            return { ...state };
        case types.CHECKPOINTER:
            state.pointer =action.status;
            return{...state};
        case types.CHANGEROW:
            state.rowSize = action.row;
            return{...state};
        case types.CHANGECOL:
            state.colSize = action.col;
            return{...state};
        default:
            return state;
    }
}
export default myReducer;