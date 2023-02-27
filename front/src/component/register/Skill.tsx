import React, {ReactElement, useState} from 'react';
import {Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButtonProps, styled} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import {Box, TextField, Typography} from "@mui/material/";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from "@mui/material/Grid";
import {StudentFieldSkill} from "../../interface/StudentFieldType";

const TextFields = styled(TextField)`
   input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`;

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
    const ExpandMore = styled((props: ExpandMoreProps) => {
        const {expand, ...other} = props;
        return <IconButton {...other} />;
    })(({theme, expand}) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

const Skill:React.FC<StudentFieldSkill>  = ({onChangeType, studentReadLv,studentSpeed,studentInt}) => { {
        const [expanded, setExpanded] = React.useState(false);

        const handleExpandClick = () => {
            setExpanded(!expanded);
        };

        return (
            <Box>
                    <CardActions>
                        <label aria-label="skill-label" style={{marginTop:10, marginLeft:250}}>기초검사</label>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="skill-label"
                        >
                            <ExpandMoreIcon/>
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Box sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextFields
                                    fullWidth
                                    type="number"
                                    id="speed"
                                    name="speed"
                                    label="속독"
                                    value={studentSpeed}
                                    onChange={onChangeType}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextFields
                                    fullWidth
                                    type="number"
                                    id="readLv"
                                    name="readLv"
                                    label="독서능력"
                                    value={studentReadLv}
                                    onChange={onChangeType}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextFields
                                    fullWidth
                                    type="number"
                                    id="intLv"
                                    name="intLv"
                                    label="지능역량"
                                    value={studentInt}
                                    onChange={onChangeType}
                                />
                            </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Collapse>
            </Box>
        )

    }
}
export default Skill;