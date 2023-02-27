import React, {useState} from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {useNavigate} from "react-router-dom";
import Divider from "@mui/material/Divider";



const MainListItems:React.FC = () => {
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleListItemClick = (url: string, index:number) => {
        setSelectedIndex(index);
        navigate(url);
    }

    return (
        <React.Fragment>
            <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick('/main',0)}>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="오늘수업"/>
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick('/students',1)}>
                <ListItemIcon>
                    <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary="학생목록"/>
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 2} onClick={() => handleListItemClick('/chart',2)}>
                <ListItemIcon>
                    <BarChartIcon/>
                </ListItemIcon>
                <ListItemText primary="학생통계"/>
            </ListItemButton >
            <ListItemButton selected={selectedIndex === 3} onClick={() => handleListItemClick('/lesson',3)}>
                <ListItemIcon>
                    <LayersIcon/>
                </ListItemIcon>
                <ListItemText primary="수업등록"/>
            </ListItemButton>
            <Divider sx={{my: 1}}/>
            <ListSubheader component="div" inset>
                개인정보
            </ListSubheader>
            <ListItemButton selected={selectedIndex === 4} onClick={() => handleListItemClick('/',4)}>
                <ListItemIcon>
                    <AssignmentIcon/>
                </ListItemIcon>
                <ListItemText primary="개인정보 수정"/>
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 5} onClick={() => handleListItemClick('/',5)}>
                <ListItemIcon>
                    <AssignmentIcon/>
                </ListItemIcon>
                <ListItemText primary="쪽지"/>
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon/>
                </ListItemIcon>
                <ListItemText primary="특이사항"/>
            </ListItemButton>
        </React.Fragment>

    );
};
export default MainListItems;
