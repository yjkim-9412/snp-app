import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, Select, SelectChangeEvent} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
type Time = {
    time?: string,
    onChangeSelect: (selectType: string, value: string) => void
    selectedDay: string,
    checkStatus: boolean
}
const TimeSelector:React.FC<Time> = ({time,onChangeSelect, selectedDay,checkStatus}) => {
    const [dayTime, setDayTime] = useState('none');
    const handleChange = (e: SelectChangeEvent) => {
        // setAge(event.target.value as string);
        let value = e.target.value;
        setDayTime(e.target.value as string);
        onChangeSelect(selectedDay, value);
    };
    useEffect(()=> {
        if (time!== undefined && time !== null){setDayTime(time);
        }else if (time === undefined || ' ') {
            setDayTime('none');
        }

    },[time])


    return(
        <FormControl fullWidth size="small">
            <Select
                id="demo-simple-select"
                value={dayTime}
                onChange={handleChange}
                sx={{minWidth: 100, maxWidth:120}}
                style={{marginBottom:2}}
                disabled={!checkStatus}

            >   <MenuItem disabled={true} value='none'>시간선택</MenuItem>
                <MenuItem value='1:00'>1:00</MenuItem>
                <MenuItem value='2:40'>2:40</MenuItem>
                <MenuItem value='4:15'>4:15</MenuItem>
                <MenuItem value='5:55'>5:55</MenuItem>
                <MenuItem value='7:30'>7:30</MenuItem>
                <MenuItem value='9:05'>9:05</MenuItem>
            </Select>
        </FormControl>
    )
}

export default TimeSelector;