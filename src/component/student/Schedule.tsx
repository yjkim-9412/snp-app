import React, {useEffect, useState} from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Checkbox, FormControlLabel, FormGroup, Paper} from "@mui/material";
import Box from "@mui/material/Box";
import {FormHelperText, Grid} from "@mui/material/";
import TimeSelector from "./TimeSelector";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';
import AppBarComp from "../AppBarComp";

type StudentId = {
    studentId?: string
}
type Schedule = {
    [day: string]: string;
}

const Schedule: React.FC<StudentId> = ({studentId}) => {
    const dayArray = ['0', '1', '2', '3', '4', '5', '6'];
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [successMes, setSuccessMes] = useState('');
    const colorType = ['green', 'red'];
    const [color, setColor] = useState(colorType[0]);
    const [failMes, setFailMes] = useState('');

    const [daySchedule, setDaySchedule] = useState<Schedule>({
        '1': '', '2': '', '3': '', '4': '', '5': '', '6': ''
    });
    const [isChecked, setIsChecked] = useState({
        '0': false, '1': false, '2': false, '3': false,
        '4': false, '5': false, '6': false
    });
    useEffect(() => {
        setIsLoading(true);
        axios.get(`/api/schedule/${studentId}`)
            .then(res => {
                setDaySchedule(res.data);
                Object.entries(res.data).map(([day, time]) => {
                    if (time !== null && time !== '') {
                        setIsChecked(prevChecked => {
                            return {...prevChecked, [day]: true}
                        });
                    }
                });
                setIsLoading(false);
            }).catch(error => console.log(error));
    }, [])

    function handleIsChecked(name: string, checked: boolean) {
        setIsChecked({...isChecked, [name]: checked})
    }

    const onRemove = (name: string) => {
        delete daySchedule[name];
        setDaySchedule({...daySchedule});
    };

    const onChangeCheckBox = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        let checked = e.target.checked;
        if (!checked) {
            onRemove(name)
        }
         handleIsChecked(name, checked);

    };


    function handleSelectChange(selectedDay: string, value: string) {
        setDaySchedule({...daySchedule, [selectedDay]: value});
    }

    const onChangeSelect = (selectedDay: string, value: string) => {
        if ({...isChecked, selectedDay}) {
            handleSelectChange(selectedDay, value);
        }
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();
        axios.post('/api/schedule/' + studentId, daySchedule)
            .then((res) => {
                let size: number = res.data.size;
                setIsLoading(false);
                if (size > 3) {
                    setColor(colorType[1]);
                    setSuccessMes('저장 실패');
                    setFailMes('최대 3개 까지 선택');
                    return
                }
                setColor(colorType[0]);
                setSuccessMes('저장 완료');
                setFailMes('');})
            .catch(error => {
            if (error.response.status === 401) {
                alert('세션이 만료되었습니다.');
                navigate('/login');
            }
        })
    }
    return (
        <>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                    <AppBarComp typography='시간표'/>
                <Box component="form" onSubmit={onSubmit} noValidate sx={{mt: 3}}>
                    <Grid container flex='auto'>
                        <Grid item xs={6}>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox name='1' checked={isChecked["1"]} onChange={onChangeCheckBox}/>}
                                    label="월요일"/>
                                <FormControlLabel
                                    control={<Checkbox name='2' checked={isChecked["2"]} onChange={onChangeCheckBox}/>}
                                    label="화요일"/>
                                <FormControlLabel
                                    control={<Checkbox name='3' checked={isChecked["3"]} onChange={onChangeCheckBox}/>}
                                    label="수요일"/>
                                <FormControlLabel
                                    control={<Checkbox name='4' checked={isChecked["4"]} onChange={onChangeCheckBox}/>}
                                    label="목요일"/>
                                <FormControlLabel
                                    control={<Checkbox name='5' checked={isChecked["5"]} onChange={onChangeCheckBox}/>}
                                    label="금요일"/>
                                <FormControlLabel
                                    control={<Checkbox name='6' checked={isChecked["6"]} onChange={onChangeCheckBox}/>}
                                    label="토요일"/>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={2} sm={6}>
                            <TimeSelector selectedDay={dayArray[1]}
                                          onChangeSelect={onChangeSelect}
                                          time={daySchedule["1"]}
                                          checkStatus={isChecked["1"]}/>
                            <TimeSelector selectedDay={dayArray[2]}
                                          onChangeSelect={onChangeSelect}
                                          time={daySchedule['2']}
                                          checkStatus={isChecked["2"]}/>
                            <TimeSelector selectedDay={dayArray[3]}
                                          onChangeSelect={onChangeSelect}
                                          time={daySchedule['3']}
                                          checkStatus={isChecked["3"]}/>
                            <TimeSelector selectedDay={dayArray[4]}
                                          onChangeSelect={onChangeSelect}
                                          time={daySchedule['4']}
                                          checkStatus={isChecked["4"]}/>
                            <TimeSelector selectedDay={dayArray[5]}
                                          onChangeSelect={onChangeSelect}
                                          time={daySchedule['5']}
                                          checkStatus={isChecked["5"]}/>
                            <TimeSelector selectedDay={dayArray[6]}
                                          onChangeSelect={onChangeSelect}
                                          time={daySchedule['6']}
                                          checkStatus={isChecked["6"]}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={1} sm={3}>
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                loading={isLoading}

                            >
                                저장
                            </LoadingButton>

                        </Grid>
                        <Grid item xs={1} sm={3}>
                            <FormHelperText sx={{marginTop: 4.5, color: {color}}}>{successMes}</FormHelperText>
                        </Grid>
                    </Grid>
                    <FormHelperText sx={{marginLeft: 0.5, color: colorType[1]}}>{failMes}</FormHelperText>

                </Box>
            </Paper>
        </>
    )
}
export default Schedule;