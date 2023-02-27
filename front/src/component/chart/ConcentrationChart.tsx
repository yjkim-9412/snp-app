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
import {Paper} from "@mui/material";

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



type chartType = {
    concentration: number,
    concentrationAnswer: boolean,
    createDate: string
    eyeBallCount: string,
    figureOne: number
    figureOneClear: number,
    figureTwo: number,
    figureTwoClear: number,
    rapidEyeball: number
}[]
type PropsType ={
    getDate:string[],
    getConcentration:number[],
    chartColor:string[]
    loaded:boolean
}

const ConcentrationChart:React.FC<PropsType> = ({getConcentration, chartColor,getDate, loaded}) => {

    const [data, setData] = useState({
        labels: getDate,
        datasets: [{
            label: '일자별 집중훈련',
            data: [0],
            backgroundColor: chartColor,
            borderWidth: 1
        }]
    });

    useEffect(() => {
        if (loaded) {
            setData({
                ...data,
                labels: getDate,
                datasets: [{
                    ...data.datasets[0],
                    data: getConcentration,
                    backgroundColor: chartColor
                }]
            });
        }
    }, [loaded])



    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Bar options={options} data={data}/>
        </Paper>);
}
export default ConcentrationChart;