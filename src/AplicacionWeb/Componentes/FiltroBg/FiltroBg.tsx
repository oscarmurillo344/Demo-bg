import { FunnelPlotOutlined } from "@ant-design/icons";
import { DatePicker, Input, Select } from 'antd'
import { promises } from "dns";
import React from "react";
import { catalogosCampos, catalogosValues, FiltrosValores, informacionFiltros } from "../../Modelos/filtros";
import ButtonBG from "../buttonBG/buttonBG";
import SeleccionMultipleBG from "../selectMultipleBG/selectMultipleBG";
import "./FiltroBG.css";

interface FiltroBgProps {
    filtroCatalogoCampos: catalogosCampos[];
    filtroInformacion: informacionFiltros[]
    catalogosValues : catalogosValues[]
    Guardar:(valor:FiltrosValores) => void
}
interface FiltroBgState {
    FiltrosVista:FiltrosValores
    tipoCatalogo:ModalBGStateCatalogo
}

interface ModalBGStateCatalogo{
    idContainer:number;
    campo:string;
    tipoDato:string;
    isCatalogo: boolean
    catalogoValue:catalogosValues[]    

}
export default class FiltroBg extends React.Component<FiltroBgProps,FiltroBgState>{

    constructor(props:FiltroBgProps){
        super(props)
        this.state = {
            FiltrosVista: { id:0, campo: "", listaFiltro: []},
            tipoCatalogo: { idContainer:0, campo:"", tipoDato:"", isCatalogo: false, catalogoValue:[]}
        }
    }
setFiltroVista(filtro:any):Promise<any>{
    return new Promise((resolve, reject)=>{
        this.setState({...this.state, FiltrosVista: filtro}, ()=>{
            resolve(0)
        })
    })
}
     transformarToItem = (input:string)=>{
        if(input)
        {
            if(input.length > 0)
            {
              const primerLetra = input.toUpperCase()[0];                
              const restoInput = input.substr(1,input.length - 1).toLocaleLowerCase();
              return primerLetra +  restoInput
            }
        }
    }

     onChangeCampo(e:string){
        const tipoDato = this.props.filtroInformacion.find(x=>x.campo === e)?.tipoDato
        const esCatalogo =this.props.filtroInformacion.find(x=>x.campo === e)?.esCatalogo
        const catalogoValue = this.props.catalogosValues.filter(x=>x.campo === e);

            this.setState(()=>{
                return {
                    tipoCatalogo:{
                
                        idContainer:0, 
                        tipoDato:tipoDato || "", 
                        isCatalogo: esCatalogo || false, 
                        catalogoValue:catalogoValue, 
                        campo:e
                    }
                }
            })
    }
    
    private onChangeValue = async (e:any[])=>{
        let listaSelecionadas:any[] = e
        let listaFiltro = this.state.tipoCatalogo.catalogoValue.filter(x=>listaSelecionadas.includes(x.id))
        await this.setFiltroVista({
            campo: this.state.tipoCatalogo.campo,
            listaFiltro: listaFiltro
        })
    }

    private optenerCatalogosValues = (): any[]=>{
        let opciones :any[] = [] 
        this.state.tipoCatalogo.catalogoValue.map(x=>{
              opciones.push({label:x.value, value:x.id})
          })
        return opciones
    }

    private Guardar() {
        this.props.Guardar(this.state.FiltrosVista)
    }

    render(){
        const { tipoCatalogo } = this.state
        return (<>
         <div className="row no-gutters" >
            <div className="col-4">
            <Select 
                onChange={(e)=>this.onChangeCampo(e)} defaultValue="-1" style={{ width: 150 }}>
                  <Select.Option value="-1">Campos</Select.Option>  
                  {
                      this.props.filtroCatalogoCampos.map((recorre, index)=>{
                        return <Select.Option key={index} value={recorre.campo}>{ this.transformarToItem(recorre.campo)}</Select.Option>                      
                      })
                  }                  
            </Select>
            </div>
            <div className="col-6">
            <Input onChange={(e:any)=>{this.onChangeValue(e.target.value)}}  placeholder="Valor" style={{display: !tipoCatalogo.isCatalogo && (tipoCatalogo.tipoDato === "string" || tipoCatalogo.tipoDato === "number") ? "inline" : "none", width:"240px" }} />
            <DatePicker onChange={(e:any)=>{this.onChangeValue(e)}} format="DD/mm/yyyy"  style={{display: tipoCatalogo.tipoDato === "date" && !tipoCatalogo.isCatalogo ? "inline" : "none", width:"240px" }} />
            <SeleccionMultipleBG onChange={(e:any)=>{this.onChangeValue(e.values)}}  show={tipoCatalogo.isCatalogo} opciones={this.optenerCatalogosValues()} />
            </div>
        </div>
        <div className="row no-gutters justify-content-end mt-2">
            <div className="col-4">
            <ButtonBG shape="round" text="Guardar Filtro" type="normal"
                                    onClick={()=>this.Guardar()} 
                                    icon={<FunnelPlotOutlined />} />  
            </div>
        </div>
        </>)
    }
}