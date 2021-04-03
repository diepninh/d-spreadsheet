import * as types from '../constaints/Actiontypes';
let nRows = 28;
let nColumns = 16;
let arrExcel = new Array();
for (let i = 0; i < nRows; i++) {

  arrExcel[i] = new Array();
  for (let j = 0; j < nColumns; j++) {
    arrExcel[i][j] = '';
  }
}
let ColTable = new Array();
let DataChar = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
for (let i = 0; i < nColumns; i++) {
  ColTable[i] = DataChar[i];
}

let RowTable = new Array();
for (let i = 0; i < nRows; i++) {
  RowTable[i] = i;
}

let tempTable = new Array();
for (let i = 0; i < nRows; i++) {

  tempTable[i] = new Array();
  for (let j = 0; j < nColumns; j++) {
    tempTable[i][j] = false;

  }
}
let styleText = new Array();
for (let i = 0; i < nRows; i++) {

  styleText[i] = new Array();
  for (let j = 0; j < nColumns; j++) {
    styleText[i][j] = 'normal';
  }
}
let sizeText = new Array();
for (let i = 0; i < nRows; i++) {

  sizeText[i] = new Array();
  for (let j = 0; j < nColumns; j++) {
    sizeText[i][j] = 15;
  }
}
let colorText = new Array();
for (let i = 0; i < nRows; i++) {

  colorText[i] = new Array();
  for (let j = 0; j < nColumns; j++) {
    colorText[i][j] = {
      r: '0',
      g: '0',
      b: '0',
      a: '100',
    };
  }
}
let backgroundGrid = new Array();
for (let i = 0; i < nRows; i++) {

  backgroundGrid[i] = new Array();
  for (let j = 0; j < nColumns; j++) {
    backgroundGrid[i][j] = 'none';
  }
}

const initalState = {
  dataTable: arrExcel,
  row: 1,
  col: 1,
  widthCell: 103,
  heightCell: 30,
  nRows: nRows,
  nColumns: nColumns,
  ColTable: ColTable,
  RowTable: RowTable,
  selectedTable: tempTable,
  keyboard: false,
  showInputFlag: false,
  value: '',
  widthRow: 50,
  heightCol: 30,
  pointer: true,
  heitghtIndicator: 1,
  widthIndicator: 1,
  widthA: 103,
  heightA: 30,
  rowSize: '',
  colSize: '',
  styleText: styleText,
  textStatus: '',
  sizeText: sizeText,
  ColorBoard: false,
  FillColorBoard: false,
  color: colorText,
  backgroundGrid: backgroundGrid,
  copiedTable: tempTable,
  dataCopied: '',
};
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
      state.pointer = action.status;
      return { ...state };
    case types.CHANGEROW:
      state.rowSize = action.row;
      return { ...state };
    case types.CHANGECOL:
      state.colSize = action.col;
      return { ...state };
    case types.CHANGEVALUEFLAG:
      state.value = action.value;
      return { ...state };
    case types.CHANGEBOLD:
      state.styleText = [...action.newValue];
      return { ...state };
    case types.CHANGEITALIC:
      state.styleText = [...action.newValue];
      return { ...state };
    case types.CHANGENORMAL:
      state.styleText = [...action.newValue];
      return { ...state };
    case types.CHANGETEXTSTATUS:
      state.textStatus = action.status;
      return { ...state };
    case types.CHANGETEXTSIZEDOWN:
      state.sizeText = [...action.size];
      return { ...state };
    case types.CHANGETEXTSIZEUP:
      state.sizeText = [...action.size];
      return { ...state };
    case types.COLORBOARD:
      state.ColorBoard = !state.ColorBoard;
      return { ...state };
    case types.FILLCOLORBOARD:
      state.FillColorBoard = !state.FillColorBoard;
      return { ...state };
    case types.CHANGECOLOR:
      state.color = [...action.color];
      return { ...state };
    case types.CHANGEBACKGROUND:
      state.backgroundGrid = [...action.color];
      return { ...state };
    case types.COPY:
      state.copiedTable = [...action.newValue];
      return { ...state };
    case types.CHANGEDATACOPIED:
      state.dataCopied = action.data;
      return { ...state };
    case types.ADDROW:
      state.nRows = state.nRows +1 ;
      return {...state};
    case types.ADDCOL:
      state.nColumns = state.nColumns + 1;
      return {...state};
    default:
      return state;
  }
};
export default myReducer;