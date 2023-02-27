import React, {useEffect, useState} from 'react';
import {FormHelperText, Grid, Paper, styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import PropsAction from "../../interface/PropsAction";

const TextFields = styled(TextField)`
   input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    .MuiFormHelperText-root {
  color: #FF0000 !important;
}
`;
type FigureFieldType = {
    num:number
    getClearName:string
    getName:string

    getFigureClear?: number,
    getFigure?: number,
    onChange: (name:string, value:number) => void
}

const FigurePractice:React.FC<FigureFieldType> = ({num,getFigureClear,getFigure,
                                                      onChange,getClearName,getName, }) => {
    const figureValue = 4000;
    const [figure, setFigure] = useState({clearScore:0,score:0});
    const [errorField, setErrorField] = useState('');

    const onChangeField = (e: PropsAction) => {
        let name = e.target.name
        let value = e.target.value;
        let valueInt = parseInt(value)
        if (name === 'clearScore' && value.length > 1) {
            setErrorField('최대 9');
            return
        } else if (name === 'score' && value.length > 4) {
            setErrorField('최대 9999');
            return;
        }
        setFigure({...figure, [name]:value});

        if (value === ''){
            setErrorField('필수 값');
        }else {
            setErrorField('');
        }
        if (value !== '') {
            if (name === 'clearScore') {
                onChange(getClearName,valueInt);
            }else {
                onChange(getName,valueInt);
            }
        }

    }
    useEffect(()=>{
        if (typeof getFigureClear === "number" && typeof getFigure === 'number'){
            setFigure({...figure,clearScore: getFigureClear, score: getFigure})
        }
    },[getFigureClear,getFigure]);

    return(
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}>
            <Grid item xs={12} >
                <Typography sx={{p:1, fontSize:12,float:'left'}}>{`도형훈련 ${num}차`}</Typography>
                <FormHelperText sx={{color:'red', marginTop:1}}>{errorField}</FormHelperText>
            </Grid>
            <Grid item xs={12} >
                <TextFields size='small' type='number' name='clearScore' label='전체완료 횟수' variant="outlined"
                            sx={{width:100,marginLeft:1,marginRight:1,marginBottom:1}} error={errorField !== ''}
                            value={figure.clearScore} focused onChange={onChangeField}
                />
                <TextFields size='small' name='score' label='진행 횟수' variant="outlined"
                            sx={{width:100,marginLeft:1,marginRight:1}}  error={errorField !== ''}
                            value={figure.score} focused onChange={onChangeField}
                />
            </Grid>

        </Paper>
    )
}

export default FigurePractice;