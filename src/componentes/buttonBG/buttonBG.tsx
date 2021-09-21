import { Button } from 'antd';
import { ButtonType } from 'antd/lib/button';
import React, { CSSProperties, useState } from 'react';
import './buttonBG.css'
interface ButtonBGProps
{
    
    type : "outline" | "normal" 
    shape :"round" | "circle";
    text:string;
    icon?:any;
    style?:CSSProperties;
    onClick?: any;
}

const ButtonBG = (props:ButtonBGProps)=>
{
    let type:ButtonType = "primary"
    let classe = "normal"
    switch(props.type)
    {
        case 'outline':
            
            classe = "outline"
            type = "ghost"
            break;
        case 'normal':
            type = "primary"
            classe = "normal"
            break;     
    }
       
    
    const onClick = ()=>{
        if(props.onClick)
        {
            props.onClick()
        }        
    }
    return (<> 
        <Button shape={props.shape} onClick={onClick} style={props.style} className={classe} type={type} icon={props.icon}> {props.text}</Button>        
    </>)
}

export default ButtonBG