
import { Select } from "antd";
import {useEffect, useState} from "react";

interface SelectMultipleBG {
    show:boolean,
    opciones:any[],
    onChange:any;
    resetValue:boolean;
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
            <Select mode="multiple" onClick={e => e.stopPropagation()} allowClear={true}  style={{ display:show?"inline-block":"none", width:"300px"}} value={value} onChange={onChangeValor}  options={props.opciones} placeholder="Valores" maxTagCount="responsive"  />
    </>);
}

export default SeleccionMultipleBG