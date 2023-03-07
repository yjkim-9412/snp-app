import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {
    Button,
    FormHelperText,
    Grid,
    Modal,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import PropsAction from "../../interface/PropsAction";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const TextFields = styled(TextField)`
   input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    .MuiFormHelperText-root {
  color: #FF0000 !important;
}
`;

type TextBookType = {
    id:string,
    code: string,
    classification: string,
    textBookType: string,
    name: string,
    numberOfCharacters: string,
    questionCount: string,
    categoryId: string,
    categoryName: string
}
type TextBookSearchModalType = {
    onChange: (name:string, value:string) => void
    onChangeCount: (name:string, value:string) => void

}
const TextBookSearchModal:React.FC<TextBookSearchModalType> = ({onChange, onChangeCount}) => {
    const navigate = useNavigate();
    const [openInfo, setOpenInfo] = useState<boolean>(false);
    const [modalErrorCode, setModalErrorCode] = useState('');
    const [modalErrorName, setModalErrorName] = useState('');
    const [isEmpty, setIsEmpty] = useState(false);
    const [searchCode, setSearchCode] = useState('');
    const [searchName, setSearchName] = useState('');
    const [rows, setRows] = useState<TextBookType[]>([]);


    const clear = {
        id:'',
        code: '',
        classification: '',
        textBookType: '',
        name: '',
        numberOfCharacters: '',
        questionCount: '',
        categoryId: '',
        categoryName: '',
    }
    const [textBook, setTextBook] = useState({
        id:'',
        code: '',
        classification: '',
        textBookType: '',
        name: '',
        numberOfCharacters: '',
        questionCount: '',
        categoryId: '',
        categoryName: '',
    })

    const onchangeSearchCode = (e:PropsAction) => {
        setSearchCode(e.target.value)
    }
    const onchangeSearchName = (e:PropsAction) => {
        setSearchName(e.target.value)
    }
    const onClickSearch = (item: TextBookType) => {
        onChange('code', item.code);
        onChangeCount('questionCount', item.questionCount);

        setOpenInfo(current => !current);
        setTextBook(clear)
    }
    const clickButton = () => {
        setOpenInfo(current => !current);
        setModalErrorName('')
        setModalErrorCode('');
        setSearchCode('');
        setSearchName('');
    }
    const clickSearchCode = () => {
        if (searchCode === '') {
            setModalErrorCode('검색 값이 비어 있습니다.');
            return
        }
        setModalErrorCode('');
        rows.length = 0;
        axios.get(`/api/textbooks/code/${searchCode}`)
            .then(res => {
                setRows([res.data]);
            })
            .catch(error => {
                if (error.response.status === 401) {
                    navigate('/login');
                }
            })
    }
    const clickSearchName = () => {
        if (searchName === '') {
            setModalErrorName('검색 값이 비어 있습니다.');
            return
        } else if (searchName.length < 2){
            setModalErrorName('최소 2글자를 입력해 주세요');
            return;
        }
        setModalErrorName('');
        rows.length = 0;
        axios.get(`/api/textbooks/name/${searchName}`)
            .then(res => {
                let resValue = res.data;
                setRows(resValue);
                if (resValue.length === 0) {
                    setIsEmpty(true)
                }else {
                    setIsEmpty(false);
                }
            })
            .catch(error => {
                if (error.response.status === 401) {
                    navigate('/login');
                }
            })
    }
    return (
        <div>
            <Button
                variant="contained"
                onClick={clickButton}
                endIcon={<SendIcon/>}
            >
                교재검색
            </Button>
            <Box sx={{display: 'flex'}}>
                <Grid item xs={12}>


                </Grid>
            </Box>
            <Modal open={openInfo}>
                <Box sx={style}>
                    <Grid item xl={12} sx={{marginBottom:3}}>
                        <TextFields size='small' name='search' label='교재 코드' variant="outlined"
                                    error={modalErrorCode !== ''} helperText={modalErrorCode}
                                   focused onChange={onchangeSearchCode} value={searchCode}
                                    placeholder='교재코드 검색이 빠릅니다.' autoFocus
                        />
                        <Button
                            variant="contained"
                            onClick={clickSearchCode}
                            endIcon={<SendIcon/>}
                            sx={{marginLeft:0.5}}
                        >
                            검색
                        </Button>
                        <TextFields size='small' name='name' label='교재명' variant="outlined"
                                    sx={{marginLeft:4}}
                                    error={modalErrorName !== ''} helperText={modalErrorName}
                                    focused onChange={onchangeSearchName} value={searchName}
                        />
                        <Button
                            variant="contained"
                            onClick={clickSearchName}
                            endIcon={<SendIcon/>}
                            sx={{marginLeft:0.5}}

                        >
                            검색
                        </Button>
                    </Grid>
                    <Grid>
                        {
                            isEmpty ? <FormHelperText sx={{color: 'red'}}>
                                    교재 정보가 없습니다.</FormHelperText>
                                : <Table size="small" >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>분류</TableCell>
                                            <TableCell>코드</TableCell>
                                            <TableCell>제목</TableCell>
                                            <TableCell>문제수</TableCell>
                                            <TableCell>교재선택</TableCell>

                                            {/*<TableCell align="right">Sale Amount</TableCell>*/}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map(item => {
                                            return <TableRow key={item.id}>
                                                <TableCell>{item.classification}</TableCell>
                                                <TableCell >{item.code}</TableCell>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.questionCount}</TableCell>
                                                <TableCell>{item.id !== ''? <Button onClick={()=>onClickSearch(item)}>선택</Button> : ''}</TableCell>
                                            </TableRow>
                                        })}
                                    </TableBody>
                                </Table>
                        }

                    </Grid>
                    <Button
                        variant="contained"
                        onClick={clickButton}
                        style={{margin: 12,marginTop:30}}
                    >
                        닫기
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default TextBookSearchModal;