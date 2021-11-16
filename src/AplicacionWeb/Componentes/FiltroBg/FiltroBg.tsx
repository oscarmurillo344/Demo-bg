import { FunnelPlotOutlined } from "@ant-design/icons";
import { DatePicker, Input, Select } from 'antd'
import React from "react";
import { catalogosCampos, catalogosValues, FiltrosValores, informacionFiltros, ModalBGStateCatalogo } from "../../Modelos/filtros";
import ButtonBG from "../buttonBG/buttonBG";
import "./FiltroBG.css";

interface FiltroBgProps {
    filtroCatalogoCampos: catalogosCampos[]
    filtroInformacion: informacionFiltros[]
    catalogosValues : catalogosValues[]
    disabled: boolean
    selectDefault:ModalBGStateCatalogo
    onClick: (e:any) => void
    Guardar:(valor:any) => void
}

interface FiltroBgState {
    tipoCatalogo:ModalBGStateCatalogo
    Valores:string[]
}


export default class FiltroBg extends React.Component<FiltroBgProps,FiltroBgState>{

    constructor(props:FiltroBgProps){
        super(props)
        this.state = {
            tipoCatalogo: this.props.selectDefault,
            Valores: []
        }
    }
    
    componentDidMount(){
        if(this.state.tipoCatalogo.FiltrosVista!.listaFiltro.length>0){
            this.SetResetSeleccion(this.state.tipoCatalogo.FiltrosVista!.listaFiltro.map(x=> x.id))
        }
    }

    setFiltroVista(filtro:FiltrosValores){
        const { tipoCatalogo } = this.state

        this.setState(()=>{
               return {
                tipoCatalogo: {
                    campo: tipoCatalogo.campo,
                    tipoDato: tipoCatalogo.tipoDato,
                    catalogoValue: tipoCatalogo.catalogoValue,
                    isCatalogo: tipoCatalogo.isCatalogo,
                    FiltrosVista: filtro
                }}})
    }

    SetResetSeleccion(valor:string[]){
            this.setState(()=> {
                return { Valores: valor}
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
        this.SetResetSeleccion([])
            this.setState(()=>{
                return {
                    tipoCatalogo:{
                        tipoDato:tipoDato || "", 
                        isCatalogo: esCatalogo || false, 
                        catalogoValue:catalogoValue, 
                        campo:e,
                        FiltrosVista: { id:0, campo: "", listaFiltro: []}
                    }
                }
            })
    }
    
    private onChangeValue = async (e:any)=>{
        let listaSelecionadas:any = e
        if(typeof listaSelecionadas === "string" || typeof listaSelecionadas === "number"){
            this.setFiltroVista({
                id: 0,
                campo: this.state.tipoCatalogo.campo,
                valor: listaSelecionadas,
                listaFiltro: []
            })
        }else{
            let listaFiltro = this.state.tipoCatalogo.catalogoValue.filter(x=>listaSelecionadas.includes(x.id))
        this.setFiltroVista({
            id:0,
            campo: this.state.tipoCatalogo.campo,
            listaFiltro: listaFiltro
        })
        this.SetResetSeleccion(e)
        }
    }

    private optenerCatalogosValues = (): any[]=>{
        let opciones :any[] = [] 
        this.state.tipoCatalogo.catalogoValue.map(x=>{
              opciones.push({label:x.value, value:x.id})
          })
        return opciones
    }

    private Guardar() {
        if(this.state.tipoCatalogo.FiltrosVista.listaFiltro.length > 0 || this.state.tipoCatalogo.FiltrosVista.valor != undefined){
            this.props.Guardar(this.state.tipoCatalogo)
            this.SetResetSeleccion([])
        }
    }

    render(){
        const { tipoCatalogo, Valores } = this.state
        const { disabled } = this.props
        return (<>
         <div className="row" onClick={e => this.props.onClick(e)}>
            <div className="col-3 mr-3">
            <div>Filtros</div>
            <Select 
                onClick={e => this.props.onClick(e)}
                onChange={(e)=>this.onChangeCampo(e)} disabled={disabled} defaultValue={tipoCatalogo?.campo} style={{ width: 150 }}>
                  <Select.Option value="-1">Campos</Select.Option>  
                  {
                      this.props.filtroCatalogoCampos.map((recorre, index)=>{
                        return <Select.Option key={index} value={recorre.campo}>{ this.transformarToItem(recorre.campo)}</Select.Option>                      
                      })
                  }                  
            </Select>
            </div>
            <div className="col-5" >
                <div style={{display: !tipoCatalogo.isCatalogo && (tipoCatalogo.tipoDato === "string" || tipoCatalogo.tipoDato === "number") ? "inline" : "none"}}> 
                <div>Valor</div>  
                <Input onClick={e => this.props.onClick(e)} value={tipoCatalogo.FiltrosVista.valor}  onChange={(e:any)=>{this.onChangeValue(e.target.value)}}  placeholder="Valor" style={{width:"240px" }} />
                </div>
                <div style={{display: tipoCatalogo.tipoDato === "date" && !tipoCatalogo.isCatalogo ? "inline" : "none"}} >  
                    <div>Fecha</div>
                    <DatePicker onClick={e => this.props.onClick(e)} onChange={(e:any)=>{this.onChangeValue(e)}} format="DD/mm/yyyy"  style={{width:"240px"}} />
                </div>
                <div style={{ display:tipoCatalogo.isCatalogo?"inline-block":"none"}}>
                    <div>Valores</div>
                    <Select mode="multiple" defaultValue={tipoCatalogo.FiltrosVista.listaFiltro.map(x=>x.id)}  value={Valores} options={this.optenerCatalogosValues()} onChange={(e:any)=>{this.onChangeValue(e)}} onClick={e => e.stopPropagation()} allowClear={true}  style={{width:"240px"}} placeholder="Valores" maxTagCount="responsive"  />
                </div>
            </div>
            <div className="col-2 align-self-end">
                <ButtonBG shape="round" text="Filtrar" type="normal"
                                    onClick={()=>this.Guardar()} 
                                    icon={<FunnelPlotOutlined />} />  
            </div>
        </div>
    </>)
    }
}