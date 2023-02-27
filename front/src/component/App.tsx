import React, {useEffect, useState} from 'react';
import axios from "axios";
import Router from "./Router";
import AppRouter from "./Router";
import "bootstrap/dist/css/bootstrap.css";
import '../axios.config';
import { useNavigate } from 'react-router-dom';
import {Container} from "@mui/material/";

function App() {

    return (
        <AppRouter  />
    );
}
export default App;
