import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import {StudentFieldSelect} from "../../interface/StudentFieldType";
import {FormHelperText, InputLabel, Select, SelectChangeEvent, styled} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {Box, FormControl} from "@mui/material/";

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;
const GradeOp: React.FC<StudentFieldSelect> = ({onChangeSelect, fieldErrorType,gradeProps, gradeLvProps}) => {
    const [grade, setGrade] = useState('');
    const [gradeLv, setGradeLv] = useState('');
    const [rock, setRock] = useState<string>('block');
    const [isError, setIsError] = useState<boolean>(false);
    const [ErrorText, setErrorText] = useState<string>('');
    useEffect(() =>{
        setGrade(gradeProps);
    },[gradeProps])
    useEffect(() =>{
        setGradeLv(gradeLvProps);
    },[gradeLvProps]);
    useEffect(() => {
        if (fieldErrorType !== '') {
            setIsError(true);
            setErrorText(fieldErrorType);
        }
    }, [fieldErrorType])

    const onChange = (e: SelectChangeEvent) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name === 'grade') {
            setGrade(value as string);
            if (value === 'MIDDLE' || value === 'HIGH') {
                setRock('none');
                setGradeLv(prev => prev = '1');
                onChangeSelect({name:'gradeLv', value:'1'});
            } else {
                setRock('block');
            }
            onChangeSelect({name, value});
        } else if (name === 'gradeLv') {
            setGradeLv(value as string);
            onChangeSelect({name, value});
        }
        setErrorText('');
        setIsError(false);
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="grade">학급</InputLabel>
                        <Select
                            labelId="grade"
                            name='grade'
                            id="grade"
                            value={grade}
                            autoWidth={false}
                            label="grade"
                            onChange={onChange}
                            sx={{minWidth: 120}}
                            error={isError}
                        >
                            <MenuItem value='ELEMENTARY'>초등학교</MenuItem>
                            <MenuItem value='MIDDLE'>중학교</MenuItem>
                            <MenuItem value="HIGH">고등학교</MenuItem>
                        </Select>

                    </FormControl>
                    <FormHelperTexts>{ErrorText}</FormHelperTexts>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="gradeLv">학년</InputLabel>
                        <Select
                            labelId="gradeLv"
                            name='gradeLv'
                            id="gradeLv"
                            value={gradeLv}
                            autoWidth={false}
                            label="gradeLv"
                            onChange={onChange}
                            sx={{minWidth: 120}}
                            error={isError}
                        >

                            <MenuItem value='1'>1학년</MenuItem>
                            <MenuItem value='2'>2학년</MenuItem>
                            <MenuItem value='3'>3학년</MenuItem>
                            <MenuItem value='4' style={{display: rock}}>4학년</MenuItem>
                            <MenuItem value='5' style={{display: rock}}>5학년</MenuItem>
                            <MenuItem value='6' style={{display: rock}}>6학년</MenuItem>
                        </Select>
                    </FormControl>
                    <FormHelperTexts>{ErrorText}</FormHelperTexts>
                </Grid>
            </Grid>
        </Box>
    );
}
export default GradeOp;