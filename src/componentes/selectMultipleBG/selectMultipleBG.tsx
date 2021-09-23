
import { Select, Space } from "antd";
import { SelectProps } from "rc-select";
import React, {useEffect, useState} from "react";
interface SelectMultipleBG {
    show:boolean,
    opciones:any[]
}
const SelectMultipleBG = (props:SelectMultipleBG)=>{
    
    const [show, setShow] = useState(props.show)
    const [value, setValue] = React.useState([]);
    console.log("opciones de combo seleccional")
    console.log(props.opciones)
    useEffect(()=>{
        setShow(props.show)
    }, [props.show])
    return (<>
            <Select mode="multiple"  style={{ display:show?"inline":"none", width:"240px"}} value={value} onChange={(newValue:any) => {
        setValue(newValue);
      }}  options={props.opciones} placeholder="Valores" maxTagCount="responsive"  />
    </>);
}

export default SelectMultipleBG