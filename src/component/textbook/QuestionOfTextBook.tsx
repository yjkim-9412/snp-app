import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material/";
import AppBarComp from "../AppBarComp";
import {Button, FormControl, Paper, Select, SelectChangeEvent, styled, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import PropsAction from "../../interface/PropsAction";
import QuestionSelector from "./QuestionSelector";

const TextFields = styled(TextField)`
   input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    .MuiFormHelperText-root {
  color: #FF0000 !important;
}
`;
type QuestionCountType = {
    onChangeQuestion:(num: number, name: string, value: string) => void
    countPlus: (count:number) => void,
    countMinus: (count:number) => void,
    questionArray: QuestionNumberType,
    getCount: number;
}
type QuestionNumberType = {
    number: number, questionType?: string, answerType?: string
}[]


const QuestionOfTextBook: React.FC<QuestionCountType> = ({onChangeQuestion,countPlus,countMinus, questionArray,getCount}) => {
    const [errorText, setErrorText] = useState('');
    const [questionCount, setQuestionCount] = useState(1);
    useEffect(() => {
        setQuestionCount(questionArray.length);
    },[questionArray])
    const onClickPlus = () => {
        let count = questionCount +1;
        if (count > 10) {
            setErrorText("최대 10문제");
            return;
        }
        setErrorText("");
        countPlus(count);
        setQuestionCount(count);
    };
    const onClickMinus = () => {
        let count = questionCount - 1;
        if (count < 1) {
            setErrorText("최소 1문제");
            return
        }
        setErrorText("");
        countMinus(count);
        setQuestionCount(count);
    };
    return (
        <Grid item xs={12} sm={6}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <AppBarComp typography={'교재 문항'}/>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                        <Grid container spacing={2} sx={{marginTop: 1}}>
                            <QuestionSelector num={1} questionSize={questionCount} onChangeQuestion={onChangeQuestion}
                                              getQuestionValue={questionArray[0] !== undefined? questionArray[0]:undefined}/>
                            <QuestionSelector num={2} questionSize={questionCount} onChangeQuestion={onChangeQuestion}
                                              getQuestionValue={questionArray[1] !== undefined? questionArray[1]:undefined}/>
                            <QuestionSelector num={3} questionSize={questionCount} onChangeQuestion={onChangeQuestion}
                                              getQuestionValue={questionArray[2]!== undefined? questionArray[2]:undefined}/>
                            <QuestionSelector num={4} questionSize={questionCount} onChangeQuestion={onChangeQuestion}
                                              getQuestionValue={questionArray[3] !== undefined? questionArray[3]:undefined}/>
                            <QuestionSelector num={5} questionSize={questionCount} onChangeQuestion={onChangeQuestion}
                                              getQuestionValue={questionArray[4] !== undefined? questionArray[4]:undefined}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sm={6} sx={{marginBottom: 3.7}}>
                        <Grid container spacing={2} sx={{marginTop: 1}}>
                            <QuestionSelector num={6} questionSize={questionCount} onChangeQuestion={onChangeQuestion}
                                              getQuestionValue={questionArray[5]!== undefined? questionArray[5]:undefined}/>
                            <QuestionSelector num={7} questionSize={questionCount} onChangeQuestion={onChangeQuestion}
                                              getQuestionValue={questionArray[6] !== undefined? questionArray[6]:undefined}/>
                            <QuestionSelector num={8} questionSize={questionCount} onChangeQuestion={onChangeQuestion}
                                              getQuestionValue={questionArray[7] !== undefined? questionArray[7]:undefined}/>
                            <QuestionSelector num={9} questionSize={questionCount} onChangeQuestion={onChangeQuestion}
                                              getQuestionValue={questionArray[8] !== undefined? questionArray[8]:undefined}/>
                            <QuestionSelector num={10} questionSize={questionCount} onChangeQuestion={onChangeQuestion}
                                              getQuestionValue={questionArray[9] !== undefined? questionArray[9]:undefined}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextFields
                            error={errorText != ''}
                            helperText={errorText}
                            aria-readonly={true}
                            fullWidth
                            type="number"
                            name="questionCount"
                            label="문항수"
                            value={questionCount}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button fullWidth
                                variant="contained"
                                onClick={onClickMinus}
                                sx={{mt: 1, mb: 1}}>감소</Button>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button fullWidth
                                variant="contained"
                                onClick={onClickPlus}
                                sx={{mt: 1, mb: 1}}>증가</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}
export default QuestionOfTextBook;