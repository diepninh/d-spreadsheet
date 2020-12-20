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
export const changeValueFlag = (value) =>{
    return{
        type : types.CHANGEVALUEFLAG,
        value : value,
    }
}
export const changeBold = (newValue) =>{
    return{
        type : types.CHANGEBOLD,
        newValue : [...newValue],
    }
}
export const changeIntinate = (newValue) =>{
    return{
        type : types.CHANGEITALIC,
        newValue : [...newValue],
    }
}
export const changeNormal = (newValue) =>{
    return{
        type : types.CHANGENORMAL,
        newValue : [...newValue],
    }
}
export const changeTextStatus = (status) =>{
    return{
        type : types.CHANGETEXTSTATUS,
        status : status,
    }
}
export const changeTextSizeDown = (size) =>{
    return{
        type : types.CHANGETEXTSIZEDOWN,
        size : [...size],
    }
}
export const changeTextSizeUp = (size) =>{
    return{
        type : types.CHANGETEXTSIZEUP,
        size : [...size],
    }
}
export const ColorBoard = () =>{
    return{
        type : types.COLORBOARD,
        
    }
}
export const changeColor = (color) =>{
    return{
        type : types.CHANGECOLOR,
        color : [...color],
    }
}
export const copyData = (newValue) =>{
    return{
        type : types.COPY,
        newValue : [...newValue],
    }
}
export const changeDataCopied = (data) =>{
    return{
        type :  types.CHANGEDATACOPIED,
        data : data,
    }
}