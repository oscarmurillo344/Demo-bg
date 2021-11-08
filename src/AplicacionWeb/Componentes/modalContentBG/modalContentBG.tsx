import { Modal } from "antd";
import {useState, useEffect } from "react";

interface ModalContentBGProps
{
    titulo: string;
    content:any;
    visible:boolean;
    onOk :any;
    width:any;
    onCancel:any;
}
const ModalContentBG = (props:ModalContentBGProps)=>{
    const [visible, setVisible] =useState(props.visible);

        useEffect(()=>{
            setVisible(props.visible)
        }, [props.visible])


        const onOk = ()=>{
            props.onOk()
        }

        const onCancel = ()=>{
            props.onCancel()
        }   
        
        return (<>                 
        <Modal  title={props.titulo}  width={props.width} visible={visible} onOk={onOk}  onCancel={onCancel} >
                {props.content}
        </Modal>
        </>)
}

export default ModalContentBG