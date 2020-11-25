import * as types from '../constaints/Actiontypes'
export const showTable = () =>{
    return{
        type : types.SHOW_TABLE

    }
}
export const getPosition = (row,col) =>{
    return{
        type : types.GETPOSITION,
        row : row,
        col : col,
    }
}
export const selectedCell = (newData) =>{
    return{
        type : types.SELECTED_CELL,
        newData : newData,
    }
}
export const checkKey = (row,col) =>{
    return{
        type : types.CHECKKEY,
        row : row ,
        col : col,
    }
}
export const changeKeyboard = (status) =>{
    return{
        type : types.CHANGEKEYBOARD,
        status : status,
    }
}
export const setValue = (newValue) =>{
    return{
        type : types.SETVALUE,
        newValue : [...newValue],
    }
}
export const showInput =(status) =>{
    return{
        type :types.SETSHOWINPUT,
        status : status,
    }
}
export const showValue = (value) =>{
    return{
        type : types.SETSHOWVALUE,
        value : value,
    }
}
export const changeWidth = (value) =>{
    return{
        type : types.CHANGEWIDTH,
        value : value,
    }
}
export const changeHeightCol = (value) =>{
    return{
        type : types.CHANGEHEIGHTCOL,
        value : value,
    }
}
export const changeWidthCell = (value) =>{
    return{
         type : types.CHANGEWIDTHCELL,
         value : value,
    }
}
export const changeHeightCell= (value) =>{
    return{
         type : types.CHANGEHEIGHTCELL,
         value : value,
    }
}
export const checkPointer = (status) =>{
    return{
        type : types.CHECKPOINTER,
        status : status,
    }
}
export const changeRow = (row) =>{
    return{
        type : types.CHANGEROW,
        row : row,
    }
}
export const changeCol = (col) =>{
    return{
        type : types.CHANGECOL,
        col : col,
    }
}
