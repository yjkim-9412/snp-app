import React, {useEffect, useState} from 'react';
import {
    FormControlLabel, FormHelperText,
    FormLabel,
    Radio,
    RadioGroup, styled,

} from "@mui/material";
import {StudentFieldRadio} from "../../interface/StudentFieldType";
import {FormControl} from "@mui/material/";
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;
const Gender:React.FC<StudentFieldRadio> = ({onChangeRadio, studentValue, textType,fieldErrorType}) => {
    const [ErrorText, setErrorText] = useState<string>('');
    useEffect(() => {
        if (fieldErrorType === ''){
            setErrorText('');
        }else {
            setErrorText(fieldErrorType);
        }
    },[fieldErrorType])
    useEffect(() => {
        if (studentValue != '') {
            if (ErrorText != ''){
                setErrorText('');
            }
        }
    },[studentValue])
    return (
        <><FormControl>
            <FormLabel id="gender-label" style={{marginLeft:10}}>성별</FormLabel>
            <RadioGroup style={{marginLeft:18, marginRight:32}}
                row
                aria-labelledby="gender-label"
                name="gender"
                value={studentValue}
            >
                <FormControlLabel value="여자" control={<Radio/>} label="여자" name={textType} onClick={(e) => onChangeRadio(e,"여자")}/>
                <FormControlLabel value="남자" control={<Radio/>} label="남자" name={textType} onClick={(e) => onChangeRadio(e,"남자")}/>
            </RadioGroup>
        </FormControl>
    <FormHelperTexts>{ErrorText}</FormHelperTexts></>
    );
}
export default Gender;
