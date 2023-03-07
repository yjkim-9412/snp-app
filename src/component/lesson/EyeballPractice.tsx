import React, {useEffect, useState} from 'react'
import {FormControl, InputLabel, Paper, Select, SelectChangeEvent, styled} from "@mui/material";
import TextField from "@mui/material/TextField";
import PropsAction from "../../interface/PropsAction";
import Typography from "@mui/material/Typography";
import {FormHelperText, Grid} from "@mui/material/";
import MenuItem from "@mui/material/MenuItem";

const TextFields = styled(TextField)`
   input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    .MuiFormHelperText-root {
  color: #FF0000 !important;
}
`;
type ConcentrationFieldType = {

    getRapidEyeball?: string,
    getEyeBallCount?: string,

    onChange: (name: string, value: string) => void
}
const EyeballPractice: React.FC<ConcentrationFieldType> = ({
                                                               getRapidEyeball,
                                                               getEyeBallCount, onChange
                                                           }) => {
    const [eyeball, setEyeball] = useState({rapidEyeball: '', eyeBallCount: 'A'});

    const [errorField, setErrorField] = useState('');

    const onChangeField = (e: PropsAction) => {
        let value = e.target.value
        let name = e.target.name
        if (value.length > 1) {
            setErrorField('최대 9');
            return
        }
        if (value === '') {
            setErrorField('필수 값');
        } else {
            setErrorField('');
        }
        setEyeball({...eyeball, [name]: value})
        onChange(name, value);
    }
    const onChangeSelect = (e: SelectChangeEvent) => {
        let value = e.target.value;
        setEyeball({...eyeball, eyeBallCount: value})
        onChange('eyeBallCount', value);
    }

    useEffect(() => {

        if (typeof getRapidEyeball !== "undefined") {
            setEyeball(prevState => ({...prevState, rapidEyeball: getRapidEyeball}))
        }
    }, [getRapidEyeball]);
    useEffect(() => {
        if (typeof getEyeBallCount === "string") {
            setEyeball(prevState => ({...prevState, eyeBallCount: getEyeBallCount}))
        }
    }, [getEyeBallCount]);

    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Grid item xs={12} sx={{marginBottom: 1}}>

                <Typography sx={{p: 1, fontSize: 12, float: 'left'}}>안구 훈련</Typography>
                <FormHelperText sx={{color: 'red'}}>{errorField}</FormHelperText>
            </Grid>
            <Grid item xs={12}>
                <TextFields size='small' type='number' name='rapidEyeball' label='전체완료 수' variant="outlined"
                            sx={{width: 100, marginLeft: 1, marginRight: 1, marginBottom:1}} error={errorField !== ''}
                            value={eyeball.rapidEyeball} focused onChange={onChangeField}
                />
                <FormControl  size="small">
                <InputLabel>끝난단계</InputLabel>
                    <Select
                        sx={{width:110,marginLeft: 1, marginRight: 1}}
                        id="eyeBallCount"
                        value={eyeball.eyeBallCount}
                        onChange={onChangeSelect}
                        label='끝난단계'
                    > <MenuItem disabled={true} value=''>단계선택</MenuItem>
                        <MenuItem value='A'>A</MenuItem>
                        <MenuItem value='B'>B</MenuItem>
                        <MenuItem value='C'>C</MenuItem>
                        <MenuItem value='D'>D</MenuItem>
                        <MenuItem value='E'>E</MenuItem>
                        <MenuItem value='F'>F</MenuItem>
                        <MenuItem value='G'>G</MenuItem>
                        <MenuItem value='H'>H</MenuItem>
                        <MenuItem value='I'>I</MenuItem>
                        <MenuItem value='J'>J</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

        </Paper>
    )
}
export default EyeballPractice;