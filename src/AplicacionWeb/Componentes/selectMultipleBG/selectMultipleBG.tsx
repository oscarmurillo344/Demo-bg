
import { Select } from "antd";
import {useEffect, useState} from "react";

interface SelectMultipleBG {
    show:boolean
    opciones:any[]
    onChange:any;
    resetValue:boolean;
    DefaultValue:any
}
const SeleccionMultipleBG = (props:SelectMultipleBG)=>{
    
    const [show, setShow] =     useState(props.show)
    const [value, setValue] =   useState([]);
                                useState(props.resetValue)    
    useEffect(()=>{
        setShow(props.show)
    }, [props.show])

    useEffect(()=>{
        setValue([])
    }, [props.resetValue])

    const onChangeValor = (newValue:any)=>{
        if(props.onChange)
        {
            props.onChange({values:newValue});
            setValue(newValue);
        }
    }
    
    return (<>
    </>);
}

export default SeleccionMultipleBG