import * as React from 'react';
import DaumPostcode from 'react-daum-postcode';
import {Hidden, Modal, styled} from "@mui/material";
import Button from "@mui/material/Button";
import {Box, Grid, TextField} from "@mui/material/";
import {StudentFieldAddress, StudentFieldType} from "../../interface/StudentFieldType";
import {useEffect, useRef, useState} from "react";
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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
const AddressByKakao: React.FC<StudentFieldAddress> = ({onChangeAddress, fieldErrorType,addressProps}) => {
    /**
     * useState
     */
    const [openPostcode, setOpenPostcode] = useState<boolean>(false);
    const [address, setAddress] = useState('')
    const focusRef = useRef<HTMLDivElement>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const [ErrorText, setErrorText] = useState<string>('');
    useEffect(() => {
        if (addressProps != null)setAddress(addressProps);
    },[addressProps])
    useEffect(() => {
        setErrorText(fieldErrorType);
        if (fieldErrorType === '' || undefined) {
            setIsError(false);
        }else {
            setIsError(true);
        }
    },[fieldErrorType])

    /**
     * handler
     */
    const handle = {
        // 버튼 클릭 이벤트
        clickButton: () => {
            setOpenPostcode(current => !current);
            if (focusRef.current != null){
                focusRef.current.focus();
            }
        },

        // 주소 선택 이벤트
        selectAddress: (data: any) => {
            setAddress(data.roadAddress);
            onChangeAddress({address: data.roadAddress});
            setOpenPostcode(false);
            setErrorText('');
            setIsError(false);
        },
    }

    return (

        <Grid item xs={12}>
            <TextFields
                helperText={ErrorText}
                required
                fullWidth
                type="text"
                id="address"
                name="address"
                label="주소"
                value={address}
                aria-readonly={true}
                error={isError}
            />
            <div>
                <Button
                    variant="contained"
                    sx={{mt: 1, mb: 2}}
                    style={{float: 'right'}}
                    onClick={handle.clickButton}
                >
                    주소찾기
                </Button>
                <Modal open={openPostcode}>
                    <Box sx={style}>
                        <Button
                            variant="contained"
                            onClick={handle.clickButton}
                            style={{marginBottom:4}}
                        >
                            취소
                        </Button>
                    <DaumPostcode

                        onComplete={handle.selectAddress}  // 값 선택할 경우 실행되는 이벤트
                        autoClose={false} // 값 선택할 경우 닫힘 설정
                    />
                    </Box>
                </Modal>
            </div>
        </Grid>
    )
}

export default AddressByKakao;