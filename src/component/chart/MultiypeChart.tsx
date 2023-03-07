import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
} from 'chart.js';
import {Chart} from 'react-chartjs-2';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);



type MultiTypeChartType = {
    average: number[],
    readCount: number[],
    loaded: boolean,
    textBookType:string

}
const MultiTypeChart: React.FC<MultiTypeChartType> = ({readCount, loaded, average,textBookType}) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: textBookType
            },
        },
        scales: {
            y: {
                display: true,
                position: 'left' as const,
            },
            y1: {
                display: true,
                position: 'right' as const,
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };
    const [data, setData] = useState({
        labels:average,
        datasets: [
        {
                type: 'line' as const,
                label: '읽은글자',
                data: readCount,
                backgroundColor: ['rgba(49, 58, 237, 1)'],
                borderWidth: 2,
                fill: false,
                yAxisID: 'y',
            },
            {
                label: '이해도',
                data: average,
                backgroundColor: ['rgb(255, 148, 112)'],
                borderWidth: 1,
                yAxisID: 'y1'
            },
        ]
    });
    useEffect(() => {
        if (loaded) {
            setData({
                ...data,
                labels:average,
                datasets: [
                    {
                    ...data.datasets[0],
                    data: readCount,
                },
                    {
                        ...data.datasets[1],
                        data: average,
                    }
                ]
            });
        }
    }, [loaded])

    return <Chart type='bar' options={options} data={data}/>;
}

export default MultiTypeChart;
