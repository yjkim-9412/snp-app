import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    indexAxis: 'y' as const,
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right' as const,
        },
        title: {
            display: true,
        },
    },
};

type DataType = {
    labelData: string[],
    averageData: number[],
    chartName: string
    loaded:boolean
}


const HorizontalChart:React.FC<DataType> = ({labelData, averageData, chartName, loaded}) => {

    const [data, setData] = useState({
        labels: labelData,
        datasets: [{
            label: chartName,
            data: averageData,
            backgroundColor: ['rgb(255, 148, 112)','rgba(255, 99, 132, 1)','rgba(100, 255, 71, 0.8)','rgba(49, 130, 237, 1)',
            'rgba(237, 190, 49, 1)','rgba(237, 115, 49, 1)', 'rgba(49, 58, 237, 1)','rgba(237, 49, 67, 1)'],
            borderWidth: 1
        }]
    });
    useEffect(() => {
        if (loaded) {
            setData({
                ...data,
                labels: labelData,
                datasets: [{
                    ...data.datasets[0],
                    data: averageData,
                }]
            });
        }
    }, [loaded])
    return <Bar options={options} data={data} />;
}

export default HorizontalChart;