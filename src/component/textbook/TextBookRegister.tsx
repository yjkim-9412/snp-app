import React, {useEffect, useState} from 'react';
import {FormControl, FormHelperText, Grid, InputLabel, Paper, Select, styled} from "@mui/material";
import AppBarComp from "../AppBarComp";
import MenuItem from "@mui/material/MenuItem";
import ClassificationTextBook from "./ClassificationTextBook";
import CategoryList from "./CategoryList";
import {Button, TextField} from "@mui/material/";
import PropsAction from "../../interface/PropsAction";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import Box from "@mui/material/Box";
const TextFields = styled(TextField)`
   input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    .MuiFormHelperText-root {
  color: #FF0000 !important;
}
`;

type TexBookType = {
    id: string, code: string, name: string, numberOfCharacters: string,
    questionCount: number, categoryName: string, textBookType: string, categoryId:string
}

type QuestionType = {
    questionCountParent: number
    questionArray: { number: number, questionType?: string, pattern?: string}[]
    textbook: TexBookType,
    clear:() => void
}

const TextBookRegister: React.FC<QuestionType> = ({questionCountParent,questionArray, textbook,clear}) => {
    const [textBookForm, setTextBookForm] = useState<TexBookType>({
        id: '', code: '', name: '', numberOfCharacters: '',
        questionCount: 1, categoryName: '', textBookType: '',categoryId:''
    });
    const textBookClear:TexBookType=({
        id: '', code: '', name: '', numberOfCharacters: '',
        questionCount: 1, categoryName: '', textBookType: '',categoryId:''
    });
    const [errorText, setErrorText] = useState({
        id: '', code: '', name: '', numberOfCharacters: '',
        questionCount: '', categoryName: '', textBookType: ''
    });
    const [questions, setQuestions] = useState([]);


    const [isLoading, setIsLoading] = useState(false);
    const [successMes, setSuccessMes] = useState('');
    const colorType = ['green', 'red'];
    const [color, setColor] = useState(colorType[0]);
    useEffect(()=> {
        setTextBookForm({...textBookForm, questionCount:questionCountParent})
    },[questionCountParent])
    useEffect(()=> {
        setTextBookForm(textbook);
    },[textbook])
    const onChangeValue = (name: string, value: string) => {
        setTextBookForm({...textBookForm, [name]: value});
    }
    const onChangeText = (e: PropsAction) => {
        setTextBookForm({...textBookForm, [e.target.name]: e.target.value});
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccessMes('');
        setIsLoading(true);
        axios.post('/api/textbooks/save', {textBookForm, questionArray})
            .then(res => {
                if (res.status === 200) {
                    setTextBookForm({...textBookForm, code: res.data})
                    setColor(colorType[0]);
                    setSuccessMes('저장 완료');
                }
            })
            .catch(error => {
                console.log(error)
                setColor(colorType[1]);
                setSuccessMes('저장 실패');
            })
            .finally(()=>{
                setIsLoading(false);
            });
    }
    const onClickClear = () => {
        setTextBookForm(textBookClear);
        clear();
    }

    return (
        <>
            <Grid item xs={12} sm={6}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <AppBarComp typography={'교재 등록'}/>
                    <Box component="form" noValidate onSubmit={onSubmit} >
                    <Grid container spacing={2} sx={{marginTop: 1}}>
                        <Grid item xs={12} sm={6}>
                            <ClassificationTextBook onChangeValue={onChangeValue} getClassification={textBookForm.textBookType}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CategoryList onChangeValue={onChangeValue} getCategory={textBookForm.categoryName} getCategoryId={textBookForm.categoryId}/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                // error={isError}
                                // helperText={ErrorText}
                                required
                                fullWidth
                                type="text"
                                name="name"
                                label="제목"
                                value={textBookForm.name}
                                onChange={onChangeText}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextFields
                                // error={isError}
                                // helperText={ErrorText}
                                required
                                fullWidth
                                type="number"
                                name="numberOfCharacters"
                                label="글자수"
                                value={textBookForm.numberOfCharacters}
                                onChange={onChangeText}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                required
                                fullWidth
                                disabled={true}
                                placeholder="교재 저장시 생성"
                                type="text"
                                name="code"
                                label="교재코드"
                                value={textBookForm.code}
                            />
                        </Grid>
                        <Grid item xs={1} sm={1.5} sx={{float:"right"}}>
                            <FormHelperText sx={{marginLeft:2,marginTop: 2, color: {color}}}>{successMes}</FormHelperText>
                        </Grid>
                        <Grid item xs={1} sm={1.5} sx={{float:"right"}}>
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 1, mb: 2}}
                                loading={isLoading}
                            >
                                저장
                            </LoadingButton>

                        </Grid>
                        <Grid item xs={1} sm={4} sx={{float:"right"}}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                onClick={onClickClear}
                            >
                                초기화
                            </Button>

                        </Grid>
                    </Grid>
                    </Box>
                </Paper>
            </Grid>
        </>
    )
}

export default TextBookRegister;
