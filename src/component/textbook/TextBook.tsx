import React, {useEffect, useRef, useState} from 'react';

import Box from "@mui/material/Box";
import {Paper} from "@mui/material";
import {Button, Grid} from "@mui/material/";
import {createTheme} from "@mui/material/styles";
import AppBarComp from "../AppBarComp";
import {DataGrid, GridColDef, GridToolbar, GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid";
import CustomNoRowsOverlay from "../CustomNoRowsOverlay";
import CustomPagination from "../CustomPagination";
import LocalizedTextsMap from "../../LocalizedTextsMap";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import TextBookRegister from "./TextBookRegister";
import QuestionOfTextBook from "./QuestionOfTextBook";


const theme = createTheme();
type QuestionNumberType = {
    number: number, questionType?: string, answerType?: string
}[]
type TexBookType = {
    id: string, code: string, name: string, numberOfCharacters: string,
    questionCount: number, categoryName: string, textBookType: string,categoryId:string
}
const TextBook = () => {
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dataGridRef = useRef<HTMLDivElement | null>(null);
    const [questionValue, setQuestionValue] = useState<QuestionNumberType>([{number:1, questionType:'NONE',answerType:'SHORT'}]);

    const [questionCount, SetQuestionCount] = useState(1);
    const [textBookForm, setTextBookForm] = useState<TexBookType>({
        id: '', code: '', name: '', numberOfCharacters: '',
        questionCount: 1, categoryName: '', textBookType: '',categoryId:''
    });
    const columns: GridColDef[] = [
        {field: 'code', headerName: '교재코드', width: 150},
        {field: 'classification', headerName: '교재구분', width: 100},
        {field: 'name', headerName: '교재명', width: 300},
        {field: 'numberOfCharacters', headerName: '글자수', width: 100},
        {field: 'questionCount', headerName: '문제수', width: 100},
        {field: 'categoryName', headerName: '장르', width: 150},
        {field: 'info', headerName: '정보', width: 150, renderCell: (params) => (
                <Button onClick={() => getInfo(params.row.code)}>정보</Button>
            )},
        {field: 'delete', headerName: '삭제', width: 150, renderCell: (params) => (
                <Button onClick={() => deleteTextBook(params.row.code)}>삭제</Button>
            )}


    ];
    const getInfo = (code:any) => {
        axios.get(`/api/textbooks/info/${code}`)
            .then(res => {
                if(res.status === 200) {
                    setTextBookForm(res.data.textBookForm);
                    questionValue.length = 0;
                    setQuestionValue(res.data.questionArray);
                }
            })
            .catch(error => {
                if (error.status === 401) {
                    navigate('/login');
                }
            })
    }
    const deleteTextBook = (code:any) => {
        if (window.confirm(`${code}교재를 삭제 하시겠습니까?`)){
            axios.delete(`/api/textbooks/delete/${code}`)
                .catch(error => {
                    if (error.status === 401) {
                        navigate('/login');
                    }
                })
        }else {
            return;
        }
    }
    const countMinus = (count:number) => {
        setQuestionValue(questionValue.filter(item => item.number <= count));
        SetQuestionCount(count)
    }
    const countPlus = (count:number) => {
        setQuestionValue(prevState => {
            return [...prevState, {number:count, questionType:'NONE', answerType:'SHORT'}];
        });
        SetQuestionCount(count)
    }

    const onChangeQuestion = (num: number, name: string, value: string) => {
        if (name)
        setQuestionValue(
            questionValue.map(item =>
                item.number === num ? { ...item, [name]:value } : item
            )
        );
    }

    const url = '/api/textbooks/';
    const navigate = useNavigate();
    useEffect(() => {
        setIsLoading(true);
        axios.get(url)
            .then(res => {
                setRows(res.data)
            })
            .catch(error => {
                if (error.response.status === 401) {
                    navigate('/login');
                } else {
                    console.log(error);
                }
            }).finally(() => setIsLoading(false));
    }, []);
    const clearQuestionArray = () =>{
        setQuestionValue([]);
        setQuestionValue([{number: 1, questionType: 'LOGICAL', answerType: 'SHORT'}]);
    }


    return (
        <Grid container spacing={3}>
            <TextBookRegister questionCountParent={questionCount} questionArray={questionValue} textbook={textBookForm} clear={clearQuestionArray}/>
            <QuestionOfTextBook countPlus={countPlus} countMinus={countMinus} onChangeQuestion={onChangeQuestion}
                                questionArray={questionValue} getCount={textBookForm.questionCount !== undefined? textBookForm.questionCount : 0}/>
            <Grid item xs={12}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <AppBarComp typography={'교재 정보'}/>
                    <Box display='flex'>
                        <div style={{minHeight: 540, width: '100%'}} ref={dataGridRef}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[30]}
                                components={{
                                    NoRowsOverlay: (() => <CustomNoRowsOverlay noList={'교재목록이 없습니다.'}/>),
                                    Pagination: CustomPagination,
                                    Toolbar: GridToolbar
                                }}

                                loading={isLoading}
                                hideFooterSelectedRowCount={true}
                                localeText={LocalizedTextsMap}
                            />
                        </div>
                    </Box>
                </Paper>
            </Grid>

        </Grid>

    )

}

export default TextBook;
