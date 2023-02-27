import * as React from 'react';
import dayjs, {Dayjs} from 'dayjs';
import 'dayjs/locale/ko';
import TextField from '@mui/material/TextField';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {StaticDatePicker} from '@mui/x-date-pickers/StaticDatePicker';
import TodayStudent from "./TodayStudent";
import {Container, Grid, Paper} from "@mui/material/";
import {Box} from "@mui/material";
import AppBarComp from "../AppBarComp";


const isWeekend = (date: Dayjs) => {

    const day = date.day();

    return day === 0 || day === 7;
};

const CalendarMain = () => {
    dayjs.locale('ko');
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());
    const dayOfWeek = value?.day();

    return (
        <Grid container spacing={3}>

            <Grid item xs={12} sm={6}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            orientation="landscape"
                            openTo="day"
                            value={value}
                            shouldDisableDate={isWeekend}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            componentsProps={{
                                actionBar: {
                                    actions: ['today'],
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Paper>
            </Grid>

                <Grid item xs={12} >
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <AppBarComp typography={'수업예정 학생 목록'} />

                        {
                        dayOfWeek === undefined ?
                            <TodayStudent dayOfWeek={0}/>
                            : <TodayStudent dayOfWeek={dayOfWeek}/>

                    }
                    </Paper>
                </Grid>
        </Grid>

    );
}
export default CalendarMain;
