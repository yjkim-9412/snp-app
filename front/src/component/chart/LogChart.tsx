import React, {useEffect, useState} from 'react';
import axios from "axios";
import {FormControl, Grid, InputLabel, Paper, Select, SelectChangeEvent} from "@mui/material";
import ConcentrationChart from "./ConcentrationChart";
import {useNavigate} from "react-router-dom";
import StepChart from "./StepChart";
import EyeBallChart from "./EyeBallChart";
import FigureChart from "./FigureChart";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import HorizontalChart from "./HorizontalChart";
import Box from "@mui/material/Box";
import MultiTypeChart from "./MultiypeChart";


type PropsType = {
    id: string,
    studentName: string
}
type DayChartType = {
    concentration: number,
    concentrationAnswer: boolean,
    createDate: string
    eyeBallCount: number,
    figureOne: number
    figureOneClear: number,
    figureTwo: number,
    figureTwoClear: number,
    rapidEyeball: number
}[]
type StepChartType = {
    processingTime: number
    studyDetail: string
}[]
type ScatterType = {
    x: number, y: number
}[]
type QuestionType = {
    average: number,
    numberOfQuestion: number,
    totalScore: number,
    questionType: string,
    questionTypeString: string
}[]
type CategoryType = {
    average: number,
    numberOfQuestion: number,
    totalScore: number,
    categoryName: string
}[]

type TextBookChartType = {
    intelligibility: number,
    readCount: number,
    textBookType: string,
    textBookTypeString: string
}[]
const LogChart: React.FC<PropsType> = ({id, studentName}) => {
    const [date, setDate] = useState<string[]>([]);
    const [studyDetail, setStudyDetail] = useState<string[]>([]);

    const [chartColor, setChartColor] = useState<string[]>([])

    const [figureOne, setFigureOne] = useState<ScatterType>([]);
    const [figureTwo, setFigureTwo] = useState<ScatterType>([]);

    const [concentration, setConcentration] = useState<number[]>([]);

    const [processingTime, setProcessingTime] = useState<number[]>([]);

    const [eyeball, setEyeball] = useState<ScatterType>([]);

    const [averageQuestion, setAverageQuestion] = useState<number[]>([]);
    const [questionType, setQuestionType] = useState<string[]>([]);

    const [averageQuestionCat, setAverageQuestionCat] = useState<number[]>([]);
    const [category, setCategory] = useState<string[]>([]);
    const[perusalCount, setPerusalCount] = useState<number[]>([]);
    const[perusalAvg, setPerusalAvg] = useState<number[]>([]);
    const[essayCount, setEssayCount] = useState<number[]>([]);
    const[essayAvg, setEssayAvg] = useState<number[]>([]);
    const[NIECount, setNIECount] = useState<number[]>([]);
    const[NIEAvg, setNIEAvg] = useState<number[]>([]);
    const[basicCount, setBasicCount] = useState<number[]>([]);
    const[basicAvg, setBasicAvg] = useState<number[]>([]);



    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const [select, setSelect] = useState('1');
    const handleChange = (e: SelectChangeEvent) => {
        setSelect(e.target.value);
    }
    const setCategoryData = (categoryData: CategoryType) => {
        categoryData.forEach(record => {
            setCategory((prevState) => [...prevState, record.categoryName + "(" + record.numberOfQuestion + ")"]);
            setAverageQuestionCat((prevState) => [...prevState, record.average]);
        })
    }
    const setQuestionData = (questionData: QuestionType) => {
        questionData.forEach(record => {
            setQuestionType((prevState) => [...prevState, record.questionTypeString + "(" + record.numberOfQuestion + ")"]);
            setAverageQuestion((prevState) => [...prevState, record.average]);
        })
    }
    const setDayChartData = (dayChartData: DayChartType) => {
        dayChartData.forEach(record => {
            setDate((prevState) => [...prevState, record.createDate])
            setConcentration((prevState) => [...prevState, record.concentration])
            setFigureOne(prevState => {
                return [...prevState, {x: record.figureOne, y: record.figureOneClear}];
            })
            setFigureTwo(prevState => {
                return [...prevState, {x: record.figureTwo, y: record.figureTwoClear}];
            })
            setChartColor((prevChartColor) => [...prevChartColor, record.concentrationAnswer ? 'rgb(153, 102, 255)' : 'rgb(255,0,0)']);
            setEyeball(prevState => {
                return [...prevState, {x: record.rapidEyeball, y: record.eyeBallCount}];
            });
        })
    }
    const setTextBookChartData = (textBookData: TextBookChartType) => {
        textBookData.forEach(record => {
            switch (record.textBookType){
                case 'PERUSAL':
                    setPerusalCount((prevState) => [...prevState, record.readCount])
                    setPerusalAvg((prevState) => [...prevState, record.intelligibility])
                    break;
                case 'ESSAY':
                    setEssayCount((prevState) => [...prevState, record.readCount])
                    setEssayAvg((prevState) => [...prevState, record.intelligibility])
                    break;
                case 'NIE':
                    setNIECount((prevState) => [...prevState, record.readCount])
                    setNIEAvg((prevState) => [...prevState, record.intelligibility])
                    break;
                case 'BASIC':
                    setBasicCount((prevState) => [...prevState, record.readCount])
                    setBasicAvg((prevState) => [...prevState, record.intelligibility])
                    break;
            }
        })
    }
    const setStepChartData = (stepChartData: StepChartType) => {
        stepChartData.forEach(record => {
            setProcessingTime((prevState) => [...prevState, record.processingTime === null ? 0 : record.processingTime]);
            setStudyDetail((prevState) => [...prevState, record.studyDetail]);
        })
    }
    const clearAllChart = () => {
        setChartColor(prevColor => []);
        setConcentration(prevConcentration => []);
        setDate(prevDate => []);
        setProcessingTime(prevProcessingTime => []);
        setStudyDetail(prevStudyDetail => []);
        setEyeball(prevEyeball => []);
        setFigureOne(prevFigureOne => []);
        setFigureTwo(prevFigureTwo => []);
        setAverageQuestion(prevAverageQuestion => []);
        setQuestionType(prevQuestionType => []);
        setAverageQuestionCat(prevAverageQuestionCat => []);
        setCategory(prevCategory => []);
        setCategory(prevCategory => []);
        setPerusalCount(prevCategory => []);
        setPerusalAvg(prevCategory => []);
        setEssayCount(prevCategory => []);
        setEssayAvg(prevCategory => []);
        setNIECount(prevCategory => []);
        setNIEAvg(prevCategory => []);
        setBasicCount(prevCategory => []);
        setBasicAvg(prevCategory => []);
    }

    useEffect(() => {
        setIsLoaded(false)
        if (id !== '') {
            clearAllChart();
            axios.get(`/api/lesson/chart/${id}`)
                .then(
                    async (res) => {
                        const dayChartData: DayChartType = res.data.dayChart;
                        const stepChartData: StepChartType = res.data.stepChart;
                        const categoryData: CategoryType = res.data.categoryChart;
                        const questionData: QuestionType = res.data.questionChart;
                        const perusal: TextBookChartType = res.data.perusalList;
                        const essay: TextBookChartType = res.data.essayList;
                        const NIE: TextBookChartType = res.data.nieList;
                        const basic: TextBookChartType = res.data.basicList;
                        const textBookArray: TextBookChartType[] | null = [perusal, essay, NIE, basic];
                        for (const textBookArrayElement of textBookArray) {
                            if (textBookArrayElement !== null) {
                                setTextBookChartData(textBookArrayElement);
                            }
                        }

                        setCategoryData(categoryData);
                        setQuestionData(questionData);
                        setDayChartData(dayChartData);
                        setStepChartData(stepChartData);

                        await setIsLoaded(true);
                    })
                .catch(error => {
                    setIsLoaded(false);
                    if (error.status === 401) {
                        navigate('/login');
                    }else {
                        console.log(error)
                    }
                });
        }
    }, [id])
    return (
        <>
            <Grid item xs={12}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    <AppBar
                        color="default"
                        elevation={1}
                        sx={{
                            position: 'relative',
                            marginBottom: 1
                        }}
                    >
                        <Toolbar>
                            <Typography component="h1" variant="h6">
                                {`${studentName} 학생훈련 통계`}
                            </Typography>
                            <FormControl variant="standard" sx={{m: 1, minWidth: 120, marginBottom: 1}}>
                                <Select
                                    labelId="selectChart"
                                    value={select}
                                    onChange={handleChange}
                                    label="통계 분류"
                                    sx={{width: 140}}
                                >
                                    <MenuItem value={'1'}>훈련 통계</MenuItem>
                                    <MenuItem value={'2'}>수업 통계</MenuItem>
                                    <MenuItem value={'3'}>독서 자료 분석</MenuItem>
                                </Select>
                            </FormControl>
                        </Toolbar>
                    </AppBar>
                    {select === '1' ?
                        <Grid container spacing={1}>
                            <StepChart processingTime={processingTime} studyDetail={studyDetail} loaded={isLoaded}
                                       studentName={studentName}/>
                        </Grid>
                        :
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <HorizontalChart labelData={questionType} averageData={averageQuestion}
                                                 chartName={'문항 유형별'} loaded={isLoaded}/>
                            </Grid>
                            <Grid item xs={6}>
                                <HorizontalChart labelData={category} averageData={averageQuestionCat}
                                                 chartName={'문항 장르별 '} loaded={isLoaded}/>
                            </Grid>
                            <Grid item xs={6}>
                               <MultiTypeChart loaded={isLoaded} average={perusalAvg} readCount={perusalCount} textBookType={'정독'}/>
                            </Grid>
                            <Grid item xs={6}>
                                <MultiTypeChart loaded={isLoaded} average={essayAvg} readCount={essayCount} textBookType={'논술'}/>
                            </Grid>
                            <Grid item xs={6}>
                                <MultiTypeChart loaded={isLoaded} average={NIEAvg} readCount={NIECount} textBookType={'NIE'}/>
                            </Grid>
                            <Grid item xs={6}>
                                <MultiTypeChart loaded={isLoaded} average={basicAvg} readCount={basicCount} textBookType={'기초평가'}/>
                            </Grid>
                        </Grid>
                    }
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <ConcentrationChart getConcentration={concentration} chartColor={chartColor} getDate={date}
                                    loaded={isLoaded}/>
            </Grid>
            <Grid item xs={6}>
                <EyeBallChart eyeBallData={eyeball} loaded={isLoaded}/>
            </Grid>
            <Grid item xs={6}>
                <FigureChart chartName={'도형 1차 훈련'} figureData={figureOne} loaded={isLoaded}/>
            </Grid>
            <Grid item xs={6}>
                <FigureChart chartName={'도형 2차 훈련'} figureData={figureTwo} loaded={isLoaded}/>
            </Grid>
        </>
    )
}
export default LogChart;
