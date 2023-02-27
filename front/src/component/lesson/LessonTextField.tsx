import React, {useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import {FormControl, InputLabel} from "@mui/material";

type TextFieldType = {
    getName: string,
    getValue?: string,
    getLabel: string,
    widthValue: number
}
const LessonTextField: React.FC<TextFieldType> = ({widthValue, getName, getValue, getLabel}) => {
    const [parameter, setParameter] = useState('');
    useEffect(() => {
        if (typeof getValue === 'string') {
            setParameter(getValue);
        }
    },[getValue])
    return (
            <TextField size='small' id={getName} label={getLabel} name={getName} variant="standard"
                       sx={{width: widthValue,marginLeft: 1, marginRight: 1}}
                        value={parameter} focused/>
    )
}

export default LessonTextField;