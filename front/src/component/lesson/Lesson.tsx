import React, {useRef} from 'react';
import {
    DataGrid,
    GridColDef,
    gridPageCountSelector,
    gridPageSelector, GridToolbar

} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import CustomNoRowsOverlay from "../CustomNoRowsOverlay";
import CustomPagination from "../CustomPagination";
import LocalizedTextsMap from "../../LocalizedTextsMap";
import {Button} from "@mui/material/";
import dayjs, {Dayjs} from "dayjs";
import {FormControl, Grid, InputLabel, Paper, Select, SelectChangeEvent} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import LessonRegister from "./LessonRegister";
import {StudentType} from "../../interface/StudentFieldType";
import AppBarComp from "../AppBarComp";
import LogChart from "../chart/LogChart";


type StudentList = {
    id: number,
    time: string,
    studentName: string,
    parentPhone: string,
    stepName: string
}
const isWeekend = (date: Dayjs) => {

    const day = date.day();

    return day === 0 || day === 7;
};
type DayOfStudyType = {
    studentId: string,
    studyId: string,
    studyDetail: string,
    currentStudyCount: string,
    studyType: string,
    lastDate: string,
    studentInfo?: StudentType,
    studyTypeString: string,
}
type logType = {
    id: string,
    studentId: string,
    studyDetail: string,
    studyCount: string,
    concentration: string,
    concentrationAnswer: string,
    rapidEyeball: string,
    eyeBallCount: string,
    figureOneClear: number,
    figureOne: number,
    figureTwoClear: number,
    figureTwo: number,
    textBookCode: string,
    intelligibility: number | null,
    processingTime: string,
    processingMin: string,
    processingSec: string,
    readCount: string,
    memo: string,
    studyType: string,
    dayOfWeek: string
}
type answerType = {
    [answer: string]: string ;
}

const Lesson: React.FC = () => {
    dayjs.locale('ko');
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());
    const [daySelect, setDaySelect] = useState(value?.day() === undefined ? 0 : value.day());
    const [dayOfStudy, setDayOfStudy] = useState<DayOfStudyType>({
        studentId: '',
        studyId: '',
        studyDetail: '',
        currentStudyCount: '',
        studyType: "",
        lastDate: "",
        studentInfo: undefined,
        studyTypeString: ""
    });
    const [studyList, setStudyList] = useState(['']);

    const navigate = useNavigate();
    const [studentRows, setStudentRows] = useState<readonly StudentList[]>([]);
    const [studentName, setStudentName] = useState('');
    const [studentId, setStudentId] = useState('');

    const [logRows, setLogRows] = useState<logType[]>([]);
    const [logInfo, setLogInfo] = useState<logType | undefined>();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLogLoading, setIsLogLoading] = useState<boolean>(false);
    const [getAnswerMap, setGetAnswerMap] = useState<answerType>({})
    const [getQuestionCount, setGetQuestionCount] = useState(0);

    const dataGridRef = useRef<HTMLDivElement | null>(null);
    const dayOfStudyColumns: GridColDef[] = [
        {
            field: 'grade', headerName: '구분', width: 80, renderCell: (params) => (
                `${params.row.grade} ${params.row.gradeLv}`
            )
        },
        {
            field: 'studentName', headerName: '학생이름', width: 85, align: "right", renderCell: (params) => (
                <Button fullWidth onClick={() => {
                    getStudentStudy(params.row.id, params.row.studentName)
                }}>
                    {params.row.studentName}</Button>
            )
        },
        {field: 'stepName', headerName: '수업단계', width: 110},

    ];
    const logColumns: GridColDef[] =[
        {field: 'createDate', headerName: '수업일자', width: 110},
        {field: 'studyDetail', headerName: '수업단계', width: 110, renderCell: (params) => (
                <Button fullWidth onClick={() => {
                    getStudentLog(params.row.id)
                }}>
                    {params.row.studyDetail}</Button>
            )},
        {field: 'studyCount', headerName: '일수', width: 50},
        {field: 'concentration', headerName: '정신집중', width: 90, renderCell: (params) => (
        `${params.row.concentration} - ${params.row.concentrationAnswer === true? 'O':'X'}`
    )},
        {field: 'eyeball', headerName: '안구훈련', width: 90, renderCell: (params) => (
                `${params.row.rapidEyeball} - ${params.row.eyeBallCount}`
            )},
        {field: 'figureOne', headerName: '도형1차', width: 90, renderCell: (params) => (
                `${params.row.figureOneClear} - ${params.row.figureOne}`
            )},
        {field: 'figureTwo', headerName: '도형2차', width: 90, renderCell: (params) => (
                `${params.row.figureTwoClear} - ${params.row.figureTwo}`
            )},
        {field: 'textBookTypeString', headerName: '교재종류', width: 90},
        {field: 'textBookName', headerName: '교재제목', width: 200},
        {field: 'readCount', headerName: '글자수', width: 90},
        {field: 'intelligibilityReadOnly', headerName: '이해도', width: 90},
        {field: 'processingTime', headerName: '처리시간', width: 110, renderCell: (params) => (
                `${params.row.processingMin}분 ${params.row.processingSec}초`
            )},
        {field: 'memo', headerName: '수업메모', width: 300},

    ]

    const onChangeDay = (e: SelectChangeEvent) => {
        let day = parseInt(e.target.value);
        setDaySelect(day);
    }
    const getStudentLog = (logId:string) => {
        axios.get(`/api/lesson/log/${logId}`, {params: {daySelect}})
            .then(res => {

                setLogInfo(res.data.studentLog);
                setGetAnswerMap(res.data.answerMap);
                setGetQuestionCount(res.data.questionCount);
            }).catch(error => {
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
        })
    }
    const getStudentStudy = (id: string, name:string) => {
        axios.get(`/api/lesson/${id}`, {params: {daySelect}})
            .then(res => {
                setDayOfStudy(res.data.dayOfStudy);
                setStudyList(res.data.studyDetailList);
                setStudentName(name);
            }).catch(error => {
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
        });
        getLogData(id);
    }
    const getLogData = (id:string) => {
        setIsLogLoading(true);
        axios.get(`/api/lesson/list/${id}`)
            .then(res => {
                setLogRows(res.data);
                setIsLogLoading(false);
                setStudentId(id);
            }).catch(error => {
            if (error.response.status === 401) {
                navigate('/login');
            }
        })
    }
    useEffect(() => {
        setIsLoading(true);
        axios.get(`/api/schedule/day/${daySelect}`)
            .then(res => {
                setStudentRows(res.data);
                setIsLoading(false);
            }).catch(error => {
            if (error.response.status === 401) {
                navigate('/login');
            }
        });
    }, [daySelect])


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <AppBarComp typography={'수업 학생'}/>
                    <FormControl size="small" sx={{marginTop:1}}>
                        <InputLabel id="day" >요일</InputLabel>
                        <Select
                            id="day"
                            value={daySelect.toString()}
                            label="요일"
                            onChange={onChangeDay}
                            sx={{minWidth: 100, maxWidth: 120}}
                            style={{marginBottom: 2}}

                        > <MenuItem disabled={true} value='0'>시간선택</MenuItem>
                            <MenuItem value='1'>월요일</MenuItem>
                            <MenuItem value='2'>화요일</MenuItem>
                            <MenuItem value='3'>수요일</MenuItem>
                            <MenuItem value='4'>목요일</MenuItem>
                            <MenuItem value='5'>금요일</MenuItem>
                            <MenuItem value='6'>토요일</MenuItem>
                        </Select>
                    </FormControl>
                    <div style={{height: 1152, width: '100%'}} ref={dataGridRef}>

                        <DataGrid
                            rows={studentRows}
                            columns={dayOfStudyColumns}
                            pageSize={10}
                            rowsPerPageOptions={[20]}
                            components={{
                                NoRowsOverlay: (() => <CustomNoRowsOverlay noList={'오늘 수업 예정 학생이 없습니다.'}/>),
                                Pagination: CustomPagination,
                                Toolbar: GridToolbar
                            }}
                            loading={isLoading}
                            hideFooterSelectedRowCount={true}
                            localeText={LocalizedTextsMap}
                        />
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={9} >
                <Grid item xs={12}  >
                <LessonRegister dayOfStudy={dayOfStudy} dayCount={dayOfStudy.currentStudyCount} study={studyList}
                                getDay={daySelect} getLogInfo={logInfo} getAnswerMap={getAnswerMap} getQuestionCount={getQuestionCount}/>
                </Grid>
                <Grid item xs={12}  sx={{marginTop:2}}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <AppBarComp typography={studentName + " 수업자료"}/>
                        <div style={{height: 508, width: '100%'}} ref={dataGridRef}>

                            <DataGrid
                                rows={logRows}
                                columns={logColumns}
                                pageSize={10}
                                rowsPerPageOptions={[20]}
                                components={{
                                    NoRowsOverlay: (() => <CustomNoRowsOverlay noList={'학생 기록이 없습니다.'}/>),
                                    Pagination: CustomPagination,
                                    Toolbar: GridToolbar
                                }}
                                loading={isLogLoading}
                                hideFooterSelectedRowCount={true}
                                localeText={LocalizedTextsMap}
                            />
                        </div>
                    </Paper>
                </Grid>
            </Grid>

            <LogChart id={studentId} studentName={studentName}/>
        </Grid>
    )
}
export default Lesson;

