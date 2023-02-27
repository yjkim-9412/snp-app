import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {FormControl, InputLabel, Paper, Select} from "@mui/material";
import AppBarComp from "../AppBarComp";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import MenuItem from "@mui/material/MenuItem";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
        },
    },
};

type StepChartType = {
    processingTime:number[],
    studyDetail:string[],
    loaded:boolean,
    studentName: string

}

const StepChart:React.FC<StepChartType> = ({processingTime, studyDetail,loaded, studentName}) => {
    const [data, setData] = useState({
        labels: studyDetail,
        datasets: [{
            label: '단계별 훈련',
            data: processingTime,
            backgroundColor: ['rgb(255, 148, 112)'],
            borderWidth: 1
        }]
    });
    useEffect(() => {
        if (loaded) {
            setData({
                ...data,
                labels: studyDetail,
                datasets: [{
                    ...data.datasets[0],
                    data: processingTime,
                }]
            });
        }
    }, [loaded])

    return(

            <Bar options={options} data={data} />
    )
}

export default StepChart;