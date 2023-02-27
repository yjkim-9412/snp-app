import React, {useEffect, useState} from 'react';
import {CssBaseline, FormHelperText, Grid, styled, TextField, ThemeProvider, Typography} from "@mui/material";
import PropsAction from "../interface/PropsAction";
import {StudentFieldType} from "../interface/StudentFieldType";

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;
const TextFields = styled(TextField)`
   input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
        .MuiFormHelperText-root {
  color: #FF0000 !important;
}
`;


const TextFieldsCpt:React.FC<StudentFieldType> = ({onChangeType, studentValue,textType,labelType,fieldErrorType}) => {
    const [isError, setIsError] = useState<boolean>(false);
    const [ErrorText, setErrorText] = useState<string>('');
    useEffect(() => {
        setErrorText(fieldErrorType);
        if (fieldErrorType === '') {
            setIsError(false);
        }else {
            setIsError(true);
        }
    },[fieldErrorType])
    const onChangeText = (e:React.ChangeEvent<HTMLInputElement> & EventTarget) => {
        onChangeType(e)
        if (e.target.value === '' || e.target.value === null) {
            setIsError(true);
            setErrorText("필수 값 입니다.")
        }else {
            setErrorText('');
            setIsError(false);
        }
    }
    return(
        <>
            <TextFields
                error={isError}
                helperText={ErrorText}
                required
                fullWidth
                type="text"
                id={textType}
                name={textType}
                label={labelType}
                value={studentValue}
                onChange={onChangeText}
            />
        </>
    )
}
export default TextFieldsCpt;