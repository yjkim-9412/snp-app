import {ChangeEvent, MouseEventHandler, SyntheticEvent} from "react";

interface PropsAction extends ChangeEvent<HTMLInputElement>{
    target: HTMLInputElement & EventTarget,
}


export default PropsAction;