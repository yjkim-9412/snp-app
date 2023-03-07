import React, {useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import PropsAction from "../../interface/PropsAction";

type QuestionScoreType = {
    num:string,
    getScore?:string,
    onChange: (name: string, value: string) => void,
    questionCount: number,
    notServerInfo:boolean
}

const QuestionScore:React.FC<QuestionScoreType> = ({num,getScore,onChange, questionCount,notServerInfo}) => {
    const [isDisable, setIsDisable] = useState(true);
    const [score, setScore] = useState('');
    const [errorText, setErrorText] = useState('');
    const onChangeScore = (e:PropsAction) => {
        let value = e.target.value;
        let valueInt = parseInt(value);
        if (valueInt > 10) {
            setErrorText('최대 10점');
            return
        }else if (valueInt < 0 ) {
            setErrorText('최소0점');
            return
        }
        setErrorText('');
        setScore(value);
        onChange(num, value);
    }

    useEffect(() => {
        if (notServerInfo){
            setScore('');
        }
        setErrorText('');
        if (parseInt(num) > questionCount) {
            setIsDisable(true)
        }else {
            setIsDisable(false);
        }

    },[questionCount])
    useEffect(() => {
        if (notServerInfo){
            setScore('');
        }
        setErrorText('');
        if (getScore !== undefined && getScore !== '') {
            setScore(getScore.toString());
        }
    },[getScore])
    return(
        <TextField
            size='small' type='number' name={`question${num}`} label={`${num}번 문제`} variant='outlined'
            sx={{width: 100, marginLeft: 1, marginRight: 1, marginBottom: 2}} helperText={errorText} error={errorText !== ''}
            value={score} onChange={onChangeScore} focused={!isDisable} hidden={isDisable}
        />
    )
}

export default QuestionScore;