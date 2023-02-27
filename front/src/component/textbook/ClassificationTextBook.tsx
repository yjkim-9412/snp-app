import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, Select, SelectChangeEvent} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";


type onChangeParent = {
    onChangeValue: (name:string, value:string) => void
    getClassification:string
}

const ClassificationTextBook:React.FC<onChangeParent> = ({onChangeValue, getClassification}) => {
    const [value, setValue] = useState('none');
    const onChange = (e: SelectChangeEvent) => {
        setValue(e.target.value);
        onChangeValue(e.target.name, e.target.value);
    }
    useEffect(()=> {
        setValue(getClassification);
    },[getClassification])
    return(
        <FormControl fullWidth>
            <InputLabel id="textBookType">교재구분</InputLabel>
            <Select
                labelId="textBookType"
                name='textBookType'
                id="textBookType"
                value={value}
                autoWidth={false}
                label="textBookType"
                onChange={onChange}
                sx={{minWidth: 120}}
                // error={isError}
            >
                <MenuItem disabled={true} value='none'>분류선택</MenuItem>
                <MenuItem value='NIE'>NIE</MenuItem>
                <MenuItem value='PERUSAL'>정독</MenuItem>
                <MenuItem value="ESSAY">논술</MenuItem>
                <MenuItem value="BASIC">기초평가</MenuItem>
                <MenuItem value="OT">O/T</MenuItem>

            </Select>
        </FormControl>
    )
}

export default ClassificationTextBook;