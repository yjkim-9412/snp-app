import React from 'react';
import TextField from "@mui/material/TextField";

type TextFieldType= {
    name?:string,
    value?:string,
    label?:string,
    widthValue: number
}
const LessonTextFieldOut:React.FC<TextFieldType> = ({widthValue ,name,value,label}) => {
    return(
        <TextField size='small' name={name} label={label} variant="outlined"
                   sx={{width:widthValue,marginLeft:1,marginRight:1}}
                   value={value}
        />
    )
}

export default LessonTextFieldOut;