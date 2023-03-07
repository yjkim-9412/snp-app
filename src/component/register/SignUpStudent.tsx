import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useState} from "react";
import PropsAction from "../../interface/PropsAction";
import TextFieldsCpt from "../TextFieldsCpt";
import {Paper, styled} from "@mui/material";
import Gender from "./Gender";
import {useNavigate} from "react-router-dom";
import AddressByKakao from "./AddressByKakao";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import GradeOp from "./GradeOp";
import Footer from "../main/Footer";
import Skill from "./Skill";
import axios from "axios";
import Course from "./Course";
import {FormControl, FormHelperText} from "@mui/material/";
import RegistrationCheck from "./RegistrationCheck";


const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;
const TextFields = styled(TextField)`
   input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    .MuiFormHelperText-root {
  color: #FF0000 !important;
}
`;


type StudentType = {
    [student: string]: string;
}

const theme = createTheme();

export default function SignUpStudent() {
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState<string>('');
    const [ageError, setAgeError] = useState<boolean>(false);
    const [fieldError, setFieldError] = useState<StudentType>({
        name: '', age: '', birth: '', phone: '', email: '', parentName: '',
        parentPhone: '', gender: '', studyType: '', grade: '', gradeLv: '',
        address: '', street: '',
        speed: '0', readLv: '0', intLv: '0'
    });
    const [studentSaveForm, setStudentSaveForm] = useState({
        name: '', age: '', birth: '', phone: '', email: '', parentName: '',
        parentPhone: '', gender: '', studyType: '', grade: '', gradeLv: '',
        address:'', registration: 'false',
        speed: '0', readLv: '0', intLv: '0'
    });

    /**성별 onClick */
    const onClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>, param: string) => {
        setStudentSaveForm({...studentSaveForm, gender: param});
    }
    /**설렉트 onChange */
    const onChangeSelect = (e: { name: string, value: string }) => {
        setStudentSaveForm((prevState) => ({
            ...prevState,[e.name]:e.value
        }))
    }
    /**예비등록생 핸들러 */
    const onChangeSelectBoolean = (e: { name: string, value: string }) => {
        setStudentSaveForm({...studentSaveForm, registration: e.value});

    }
    /**주소 onChange */
    const onChangeAddress = (e: { address:string }) => {
        setStudentSaveForm({...studentSaveForm, address: e.address});
    }

    /**텍스트 onChange */
    const onChange = (e: PropsAction) => {
        let name: string = e.target.name;
        let value: string = e.target.value;
        setStudentSaveForm({...studentSaveForm, [name]: value});
        setFieldError({...fieldError,[name]:''});

    }

    /**학생 나이 onChange*/
    const onChangeAge = (e: PropsAction) => {
        let name: string = e.target.name;
        let value: string = e.target.value
        const errorMessage = "필수 값 입니다";
        setStudentSaveForm({...studentSaveForm, [name]: value});
        if (value === '' || value === null) {
            setAgeError(true);
            setFieldError({...fieldError,[name]:errorMessage});
        }else {
            setAgeError(false);
            setFieldError({...fieldError,[name]:''});
        }

    }

    /** 빈값 텍스트필드 에러표시*/
    const setError = (e: string) => {
        const errorMessage = "필수 값 입니다";
        setFieldError({...fieldError, [e]: errorMessage})
        if (e === 'age') {
            setAgeError(true);
            }
    }

    /** submit 이벤트 핸들러*/
    const onSubmitStudent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        for (const entryElement of Object.entries(studentSaveForm)) {
            if (entryElement[1] === '' || entryElement[1] === null || entryElement[1] === undefined) {

                setSubmitError("필수 값을 입력해 주세요");
                 setError(entryElement[0])
                return;
            }
        }
        await axios.post('/api/students/saveForm', studentSaveForm).then((res) => {
                    navigate('/students/info/'+ res.data);
            }
        ).catch(error => console.log(error));
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        SNP Student Management
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            학생등록
                        </Typography>
                        <Box component="form" noValidate onSubmit={onSubmitStudent} sx={{mt: 3}}>
                            <FormControl component="fieldset" variant="standard">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        {/**학생이름*/}
                                        <TextFieldsCpt onChangeType={onChange} studentValue={studentSaveForm.name}
                                                       textType={'name'} labelType={'학생이름'} fieldErrorType={fieldError.name}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextFields
                                            helperText={fieldError.age}
                                            required
                                            fullWidth
                                            type="number"
                                            id="age"
                                            name="age"
                                            label="나이"
                                            value={studentSaveForm.age}
                                            onChange={onChangeAge}
                                            error={ageError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {/**성별*/}
                                        <Gender onChangeRadio={onClick} studentValue={studentSaveForm.gender}
                                                textType={'gender'}
                                                labelType={'성별'} fieldErrorType={fieldError.gender}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Grid container spacing={0}>
                                        {/**수업코스*/}
                                        <Course onChangeSelect={onChangeSelect} fieldErrorType={fieldError.studyType} courseProps={studentSaveForm.studyType}/>
                                        {/**예비등록 여부*/}
                                        <RegistrationCheck onChangeSelect={onChangeSelectBoolean} registrationProps={studentSaveForm.registration}/>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {/**연락처*/}
                                        <TextFieldsCpt onChangeType={onChange} studentValue={studentSaveForm.phone}
                                                       textType={'phone'}
                                                       labelType={'연락처'} fieldErrorType={fieldError.phone}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {/**생년월일*/}
                                        <TextFieldsCpt onChangeType={onChange} studentValue={studentSaveForm.birth}
                                                       textType={'birth'}
                                                       labelType={'생년월일'} fieldErrorType={fieldError.birth}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/**이메일*/}
                                        <TextFieldsCpt onChangeType={onChange} studentValue={studentSaveForm.email}
                                                       textType={'email'}
                                                       labelType={'이메일'} fieldErrorType={fieldError.email}/>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <GradeOp onChangeSelect={onChangeSelect} fieldErrorType={fieldError.grade}
                                                 gradeProps={studentSaveForm.grade} gradeLvProps={studentSaveForm.gradeLv}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AddressByKakao onChangeAddress={onChangeAddress} fieldErrorType={fieldError.address}
                                        addressProps={studentSaveForm.address}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {/**학부모*/}
                                        <TextFieldsCpt onChangeType={onChange} studentValue={studentSaveForm.parentName}
                                                       textType={'parentName'}
                                                       labelType={'학부모'} fieldErrorType={fieldError.parentName}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {/**학부모*/}
                                        <TextFieldsCpt onChangeType={onChange}
                                                       studentValue={studentSaveForm.parentPhone}
                                                       textType={'parentPhone'}
                                                       labelType={'학부모 연락처'} fieldErrorType={fieldError.parentPhone}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Skill onChangeType={onChange} studentInt={studentSaveForm.intLv}
                                               studentReadLv={studentSaveForm.readLv}
                                               studentSpeed={studentSaveForm.speed}/>
                                    </Grid>
                                    <Grid item xs={12}>

                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{mt: 3, mb: 2}}
                                            onClick={() => navigate('/main')}
                                        >
                                            취소
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{mt: 3, mb: 2}}
                                        >
                                            학생등록
                                        </Button>
                                    </Grid>
                                </Grid>
                            </FormControl>
                            <FormHelperTexts style={{float: 'left'}}>{submitError}</FormHelperTexts>
                        </Box>
                    </Box>
                </Paper>
            </Container>
            <Footer/>
        </ThemeProvider>
    );
}