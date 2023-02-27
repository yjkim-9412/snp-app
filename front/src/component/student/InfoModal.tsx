import React, {useEffect, useRef, useState} from 'react';
import Box from "@mui/material/Box";
import {Button, FormHelperText, Grid, Modal} from "@mui/material";
import Info from "./Info";
import {StudentType} from "../../interface/StudentFieldType";
import SendIcon from '@mui/icons-material/Send';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type InfoType = {
    studentInfo?: StudentType
}

const InfoModal:React.FC<InfoType> = ({studentInfo}) => {
    const [openInfo, setOpenInfo] = useState<boolean>(false);
    const focusRef = useRef<HTMLDivElement>(null);
    const [modalError, setModalError] = useState(false);
    useEffect(() => {
        if (studentInfo !== undefined) {
            setModalError(false)
        }
    },[studentInfo])
    const clickButton = () => {
        if (studentInfo === undefined) {
            setModalError(true);
            setOpenInfo(false);
        } else {
            setModalError(false);
            setOpenInfo(current => !current);
            if (focusRef.current != null) {
                focusRef.current.focus();
            }
        }
    }
    return(
        <div>
            <Box sx={{display:'flex'}} >
                <Grid item xs>
                    <Button
                        variant="contained"
                        onClick={clickButton}
                        endIcon={<SendIcon />}
                        sx={{marginTop:3}}
                    >
                        학생정보
                    </Button>
                    {
                        modalError ? <FormHelperText sx={{color: 'red'}}>
                                학생 정보가 없습니다.</FormHelperText>
                            : <></>
                    }
                </Grid>
            </Box>
            <Modal open={openInfo}>
                <Box sx={style}>
                    <Info idProps={studentInfo?.id} studentInfoProps={studentInfo}/>
                    <Button
                        variant="contained"
                        onClick={clickButton}
                        style={{margin: 12}}
                    >
                        닫기
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}
export default InfoModal;