import React, {useRef} from 'react';
import {
    DataGrid,
    GridColDef, GridFooter, GridFooterContainer,
    gridPageCountSelector,
    gridPageSelector, GridToolbar, GridToolbarContainer, GridToolbarExport,
    useGridApiContext,
    useGridSelector
} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import CustomNoRowsOverlay from "../CustomNoRowsOverlay";
import CustomPagination from "../CustomPagination";
import LocalizedTextsMap from "../../LocalizedTextsMap";


type Date = {
    dayOfWeek: number
}

type StudentList = {
    id: number,
    time: string,
    studentName: string,
    parentPhone: string,
    stepName: string
}


const TodayStudent: React.FC<Date> = ({dayOfWeek}) => {
    const [rows, setRows] = useState<readonly StudentList[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dataGridRef = useRef<HTMLDivElement | null>(null);
    const columns: GridColDef[] = [
        {field: 'time', headerName: '수업시간', width: 125},
        {field: 'studentName', headerName: '학생이름', width: 125},
        {field: 'parentPhone', headerName: '부모님 연락처', width: 150},
        {field: 'stepName', headerName: '수업단계', width: 140},
        {
            field: 'info', headerName: '학생정보', width: 100, renderCell: (params) => (
                <Link to={`/students/info/${params.row.id}`} style={{marginLeft: 10}}>보기</Link>
            )
        }

    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport csvOptions={{fileName: '오늘 수업 학생'}}/>
            </GridToolbarContainer>
        );
    }

    function CustomFooter() {
        return (
            <GridFooterContainer>
                <GridFooter sx={{
                    border: 'none',
                }}/>
                <CustomToolbar/>
            </GridFooterContainer>
        );
    }

    useEffect(() => {
        setIsLoading(true);
        axios.get('/api/main/' + dayOfWeek)
            .then(res => {
                setRows(res.data);
                setIsLoading(false);
            }).catch(error => console.log(error));
    }, [dayOfWeek])

    return (
            <div style={{height: 400, width: '100%'}} ref={dataGridRef}>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
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
    )
}
export default TodayStudent;

