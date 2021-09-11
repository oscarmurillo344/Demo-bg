import { Button } from 'antd';
import { ButtonType } from 'antd/lib/button';
import React, { CSSProperties, useState } from 'react';
import './buttonBG.css'
interface ButtonBGProps
{
    color:string;
    type : "outline" | "normal"
    text:string;
    icon?:any;
}

const ButtonBG = (props:ButtonBGProps)=>
{
    let type:ButtonType = "primary"
    let classe = "normal"
    if(props.type === "normal")
    {
        type = "primary"
        classe = "normal"
    }else{
        classe = "outline"
        type = "ghost"
    }

    return (<> 
        <Button shape="round" className={classe} type={type} icon={props.icon}> {props.text}</Button>        
    </>)
}

export default ButtonBG