
import { Select } from "antd";
import {useEffect, useState} from "react";

interface SelectMultipleBG {
    show:boolean,
    opciones:any[],
    onChange?:any;
}
const SeleccionMultipleBG = (props:SelectMultipleBG)=>{
    
    const [show, setShow] = useState(props.show)
    const [value, setValue] = useState([]);
    
    useEffect(()=>{
        setShow(props.show)
    }, [props.show])

    const onChangeValor = (newValue:any)=>{
        setValue(newValue);
        if(props.onChange)
        {
            props.onChange({values:newValue});
            setValue(newValue);
        }
    }
    return (<>
            <Select mode="multiple"  style={{ display:show?"inline":"none", width:"240px"}} value={value} onChange={onChangeValor}  options={props.opciones} placeholder="Valores" maxTagCount="responsive"  />
    </>);
}

export default SeleccionMultipleBG