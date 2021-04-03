import * as types from '../constaints/Actiontypes';

let nRows = 28;
let nColumns = 16;
let fontFamily = new Array();
for (let i = 0; i < nRows; i++) {

  fontFamily[i] = new Array();
  for (let j = 0; j < nColumns; j++) {
    fontFamily[i][j] = "'Times New Roman', Times, serif";
  }
} 
const initalState = {
  fontFamily : fontFamily,
}

const myReducer = (state = initalState, action) =>{
  switch(action.type){
    case types.CHANGEFONTFAMILY:
      state.fontFamily = [...action.font] ;
      return {...state};
    default:
      return state;
  }
}
export default myReducer;
