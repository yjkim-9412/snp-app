import React, {useEffect, useState} from 'react';
import {Paper} from "@mui/material";
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
export const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};


type EyeBallType = {
    eyeBallData:ScatterType[]
    loaded:boolean

}
type ScatterType = {
    x: number, y: number
}
const EyeBallChart:React.FC<EyeBallType> = ({ loaded, eyeBallData}) => {
    ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
    const [data, setData] = useState({
        datasets: [
            {
                label: '안구 훈련',
                data: eyeBallData,
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    });

    useEffect(() => {
        if (loaded) {
            setData({
                ...data,
                datasets: [{
                    ...data.datasets[0],
                    data: eyeBallData,
                    }]
            });
        }
    },[loaded])

    return(
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}>
            <Scatter options={options} data={data} />
        </Paper>
    )

}

export default EyeBallChart;