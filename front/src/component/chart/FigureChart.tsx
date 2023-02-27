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
    figureData:ScatterType[]
    loaded:boolean,
    chartName:string

}
type ScatterType = {
    x: number, y: number
}
const FigureChart:React.FC<EyeBallType> = ({ loaded, figureData, chartName}) => {
    ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
    const [data, setData] = useState({
        datasets: [
            {
                label: chartName,
                data: figureData,
                backgroundColor: 'rgba(100, 255, 71, 0.8)',
            },
        ],
    });

    useEffect(() => {
        if (loaded) {
            setData({
                ...data,
                datasets: [{
                    ...data.datasets[0],
                    data: figureData,
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

export default FigureChart;