import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function Login() {
type Login = {
    email: string,
    pw: string
    }
    const [login, setLogin] = useState<Login>();
    return (
        <div className="App">
            <p>로그인 페이지</p>
            <Link to="/">메인</Link>
        </div>
    );
}

export default Login;
