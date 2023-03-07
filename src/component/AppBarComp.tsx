import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";



type TypographyProps = {
    typography: string
}

const AppBarComp:React.FC<TypographyProps> = ({typography}) =>{
    return(
        <AppBar
            color="default"
            elevation={1}
            sx={{
                position: 'relative',
                marginBottom:1
            }}
        >
            <Toolbar>
                <Typography component="h1" variant="h6" >
                    {typography}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
export default AppBarComp;