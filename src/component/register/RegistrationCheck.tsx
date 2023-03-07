import React, {useEffect, useState} from 'react';
import {FormControl, FormHelperText, InputLabel, Select, SelectChangeEvent, styled} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {Box, Grid} from "@mui/material/";
import {StudentFieldSelect, StudentFieldSelectBoolean} from "../../interface/StudentFieldType";

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;
type RegistrationProps = {
    registrationProps: string
}
const RegistrationCheck:React.FC<StudentFieldSelectBoolean & RegistrationProps> = ({onChangeSelect, registrationProps}) => {
    const [registration, setRegistration] = useState<string>('false');
    useEffect(() => {
        setRegistration(registrationProps);
    },[registrationProps])
    const onChange = (e: SelectChangeEvent) => {
        let name = e.target.name;
        let value = e.target.value;
        setRegistration(value);
        onChangeSelect({name, value});
    }
    return(

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="registration">예비등록</InputLabel>
                        <Select
                            labelId="registration"
                            name='registration'
                            id="registration"
                            value={registration}
                            autoWidth={false}
                            label="registration"
                            onChange={onChange}
                            sx={{minWidth: 120}}

                        >
                            <MenuItem value='false'>예비생</MenuItem>
                            <MenuItem value='true'>등록생</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
    )
}

export default RegistrationCheck;