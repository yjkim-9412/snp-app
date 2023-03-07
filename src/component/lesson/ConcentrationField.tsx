import React, {useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import {Checkbox, FormControlLabel, FormGroup, FormHelperText, Paper, styled} from "@mui/material";
import PropsAction from "../../interface/PropsAction";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material/";

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
    name?: string,
    getValue?: string,
    answer?: string
    onChange: (name: string, value: string) => void
}


const ConcentrationField: React.FC<ConcentrationFieldType> = ({name, getValue, answer, onChange}) => {
    const [concentration, setConcentration] = useState('');
    const [isCheck, setIsCheck] = useState(false);
    const [errorField, setErrorField] = useState('');
    const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        let checked = e.target.checked;
        if (checked) {
            setIsCheck(true)
            onChange('concentrationAnswer', 'true');
        } else {
            setIsCheck(false)
            onChange('concentrationAnswer', 'false');
        }
    }
    const onChangeField = (e: PropsAction) => {
        let value = e.target.value
        let name = e.target.name
        setConcentration(value);
        if (value === '') {
            setErrorField('필수 값');
        } else {
            setErrorField('');
        }
        onChange(name, value);
    }
    useEffect(() => {
        if (answer === 'true') {
            setIsCheck(true)
        } else if (answer === 'false') {
            setIsCheck(false);
        }
    }, [answer])
    useEffect(() => {
        if (getValue !== undefined) setConcentration(getValue);
    }, [getValue])

    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}>
            <Grid item xs={12}  >
                <Typography sx={{p:1, fontSize:12,float:'left'}}>정신집중 훈련</Typography>
                <FormHelperText sx={{color:'red'}}>{errorField}</FormHelperText>
            </Grid>
            <Grid item xs={12}>
                <TextFields size='small' type='number' name={name} label='정신집중' variant="outlined"
                            sx={{width: 100, marginLeft: 1, marginRight: 1,marginBottom:1}}
                            error={errorField !== ''}
                            value={concentration} focused onChange={onChangeField}
                />
                <FormControlLabel control={<Checkbox name='concentrationAnswer' checked={isCheck}
                                                     onChange={onChangeCheckBox}/>} label="정답여부"/>
            </Grid>
        </Paper>
    )
}

export default ConcentrationField;