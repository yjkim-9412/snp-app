import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const pages = ['신규학생 등록', '수업자료 등록'];

const Header = () => {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = async () => {
        sessionStorage.removeItem('lg');
        await axios.get('/api/logout')
        navigate('/login');
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        SNP
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button href="/student/register" sx={{ my: 2, color: 'white', display: 'block' }}>
                            신규학생 등록
                        </Button>
                        <Button href="/" sx={{ my: 2, color: 'white', display: 'block' }}>
                            수업자료 등록
                        </Button>
                        <Button href="/" sx={{ my: 2, color: 'white', display: 'block' }}>
                            도서등록 조회
                        </Button>
                        <Button href="/" sx={{ my: 2, color: 'white', display: 'block'}}>
                            수업교재 코드 등록
                        </Button>

                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="로그아웃 합니다">
                            <Button onClick={handleOpenUserMenu} sx={{ my: 2, color: 'white', display: 'block' }}>로그아웃</Button>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
