import { CloseOutlined, DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { DatePicker, Input, Modal, Select } from 'antd'
import  './modalBG.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { catalogosCampos, catalogosFiltros, catalogosValues, informacionFiltros } from '../../interfaces/filtros'
import ButtonBG from '../buttonBG/buttonBG'
import SelectMultipleBG from '../selectMultipleBG/selectMultipleBG'
const  {confirm} =  Modal;
interface ModalBGProps {
    open:boolean;
    onOk  :any;
    onCancel  :any;
    onClearFiltro :any;
    filtroCatalogoCampos: catalogosCampos[];
    
    filtroInformacion: informacionFiltros[]
    catalogosValues : catalogosValues[]
    
}

interface ModalBGState {
    open:boolean;
    filtros : Array<any>
    tipoCatalogo: Array<ModalBGStateCatalogo>
    values: any;
    
}

interface ModalBGStateCatalogo{
    idContainer:number;
    campo:string;
    tipoDato:string;
    isCatalogo: boolean
    catalogoValue:catalogosValues[]    

}



export default class ModalBG extends React.Component<ModalBGProps,ModalBGState>
{
    retornoFiltrosAplicados = new Array<any>();
    constructor(props:ModalBGProps){
        super(props)
        this.state = {
            open: this.props.open,
            filtros : [],
            tipoCatalogo: [],            
            values: ["1"]
            
        }
    }
    async componentDidUpdate(prevProps:ModalBGProps)
    {
        

        if(prevProps !== this.props)
        {
            console.log("enrto")
            console.log(this.props.open)
            await this.setOpen(this.props.open)
        }
    }
    setOpen = (valor:boolean)=>
    {
        return new Promise((resolve, reject)=>{
            this.setState({...this.state, open: valor}, ()=>{
                resolve(0)
            })
        })
        
    }
    
    Open = ()=>{
        return this.state.open
    }

    setElementosFiltro = (valor: any[])=>{
        return new Promise((resolve, reject)=>{
            this.setState({...this.state, filtros: valor}, ()=>{
                resolve(0)
            })
        })
    }

    ElementosFiltro = ()=>{
        return this.state.filtros;
    }


    render()
    {
        return (
            <Modal style={{height:"1000px"}} width="550px" title="Filtros" visible={this.state.open} onOk={this.okModal} okText="Guardar Filtro" onCancel={this.cancelModla} >
            <div className="flex row accionesModal"  > 
               <ButtonBG shape="round" text="Limpiar" type="normal" style={{display: this.ElementosFiltro().filter(x=>x.estado).length > 0? "inline": "none"}}  onClick={this.quitarFiltrosAll}  icon={<DeleteOutlined />} />
               <ButtonBG shape="round" text="Agregar Filtro" type="outline" onClick={this.agregarFiltro} icon={<PlusOutlined />} />
            </div>
            <div> </div>
             <div id="contenedorFiltro" className="flex row contenedorFiltro"  style={{overflowY:"scroll", maxHeight:"400px"}} >
                  
             </div>
            </Modal>
        )
    }

    onOpenModal = ()=>{
        this.setOpen(true)
    }
    
    onChangeInputValue =async (e:any)=>{

        await this.setValues(e)
        
    }
    setValues =(valor:any)=>{
        return new Promise((resolve, reject)=>{
            const valores = this.state.values;
            valores.push(valor)
            this.setState({...this.state, values:valores}, ()=>resolve(1))
        })
    }

    optenerCatalogosValues = (id:any): any[]=>{
        let opciones:any[] = []
        this.state.tipoCatalogo.find(x=>x.idContainer === id)?.catalogoValue.map(x=>{
            opciones.push({label:x.value, value:x.id})
        })
        return opciones
    }
    onChangeValue = (e:any)=>{
        
        
        if( this.retornoFiltrosAplicados.filter(x=>x.id === e.campo).length > 0)
        {
            this.retornoFiltrosAplicados.map((recorre)=>{
                if(recorre.id === e.campo)
                {
                    recorre.value = e.value
                }
                
            })
        }else{
            this.retornoFiltrosAplicados.push({campo:this.state.tipoCatalogo.find(x=>x.idContainer === e.campo)?.campo, value:e.value, id:e.campo})
        }
        
        
    }
    createElementoFiltro = (id:number)=>{        
        return (
          <> 
              <div className="flex row elementoFiltro" key={id} style={{width:"480px"}}  >
                <Select key={`${id}-campo`} onChange={(e)=>this.onChaneCampo({value:e, id:id})} defaultValue="-1" style={{ width: 150 }} >
                  <option value="-1">Campos</option>  
                  {
                      this.props.filtroCatalogoCampos.map((recorre, index)=>{
                        return <option key={index} value={recorre.cammpo}>{ this.transformarToItem(recorre.cammpo)}</option>                      
                      })
                  }                  
                </Select>
                
                
                  
                <Input onChange={(e:any)=>{this.onChangeValue({campo: id, value:[e.target.value]})}} key={`${id}-valor`}  placeholder="Valor" style={{display: this.state.tipoCatalogo.filter(x=>x.idContainer === id && (x.tipoDato === "string" || x.tipoDato === "number" )&&  !x.isCatalogo).length > 0? "inline" : "none", width:"240px" }} />
                <DatePicker onChange={(e:any)=>{this.onChangeValue({campo: id, value:[e.target.value]})}} format="DD/mm/yyyy"  style={{display: this.state.tipoCatalogo.filter(x=>x.idContainer === id && x.tipoDato === "date" && !x.isCatalogo ).length > 0? "inline" : "none", width:"240px" }} />
                <SelectMultipleBG onChange={(e:any)=>{this.onChangeValue({campo: id, value:e.values})}}  show={this.state.tipoCatalogo.filter(x=>x.idContainer === id && x.isCatalogo).length > 0? true:false } opciones={this.optenerCatalogosValues(id)} />

                <div style={{justifyContent:"center", alignItems:"center"}}  className="flex" >
                
                  <CloseOutlined className="iconEliminar" onClick={()=>{this.quitarFiltro(id)}} />
                </div>
                
              </div>
          </>
        )
      }
 
     onChaneCampo = (e:any)=>{
        const tipoDato = this.props.filtroInformacion.find(x=>x.campo === e.value)?.tipoDato
        const esCatalogo =this.props.filtroInformacion.find(x=>x.campo === e.value)?.esCatalogo
        const catalogoValue = this.props.catalogosValues.filter(x=>x.campo === e.value);
        
       if(this.state.tipoCatalogo.length === 0)
       {
            this.setState({...this.state, tipoCatalogo:[{
                
                idContainer:e.id, tipoDato:tipoDato || "", isCatalogo: esCatalogo || false, catalogoValue:catalogoValue, campo:e.value}
            ] }, ()=>{
                const newFiltro = this.ElementosFiltro().map(recorre =>{
                    if(recorre.id === e.id)
                    {
                        recorre.element = this.createElementoFiltro(e.id)
                    }     
                    return recorre       
                })
                this.setElementosFiltro(newFiltro).then(()=>{
                    this.renderFiltro()
                })
            })
       }else{
        let tipoCatalogoAux = this.state.tipoCatalogo
        if(this.state.tipoCatalogo.filter(x=>x.idContainer === e.id).length > 0)
        {
            tipoCatalogoAux.map(recorre =>{
                if(recorre.idContainer === e.id)
                {
                    recorre.tipoDato =  tipoDato || ""
                    recorre.isCatalogo = esCatalogo || false
                    recorre.catalogoValue = catalogoValue                    
                    recorre.campo =  e.value
                }
                return recorre
            })
        }else{
            tipoCatalogoAux.push({idContainer:e.id, tipoDato:tipoDato || "", isCatalogo:esCatalogo || false, catalogoValue:catalogoValue,  campo:e.value})
        }
            this.setState({...this.state, tipoCatalogo: tipoCatalogoAux}, ()=>{
                const newFiltro = this.ElementosFiltro().map(recorre =>{
                    if(recorre.id === e.id)
                    {
                        recorre.element = this.createElementoFiltro(e.id)
                    }     
                    return recorre       
                })
                this.setElementosFiltro(newFiltro).then(()=>{
                    this.renderFiltro()
                })
            })
            

       }

     }
      
      agregarFiltro =async ()=>{
        
        const oldElements = this.ElementosFiltro()
        const elementosOrdenados = oldElements.sort((a,b)=>a.id - b.id)
        
        let idAsignada = 0
        if(elementosOrdenados.length > 0)
        {
            idAsignada = elementosOrdenados[elementosOrdenados.length - 1].id + 1;
        }
        
        oldElements?.push({id:idAsignada, element: this.createElementoFiltro(idAsignada), estado:true}, )
        await this.setElementosFiltro(oldElements)     
        console.log(this.ElementosFiltro())
        const elementos = React.createElement("div", {}, this.ElementosFiltro()?.map((recorre, index)=>{      
            if(recorre.estado)
            {
                return <div key={index} > {recorre.element} </div>
            }        
        }))
        ReactDOM.render(elementos, document.getElementById("contenedorFiltro")) 
        
      }
    
      
    
      quitarFiltro = async (idIngreso:number)=>{
        const retorno = this.ElementosFiltro().map(x=>{
            if(x.estado)
            {
                if(x.id === idIngreso)
                {
                    x.estado = false;
                }
            }            
            return x;
        })
        
        await this.setElementosFiltro(retorno)         
        const elementos = React.createElement("div", {}, this.ElementosFiltro()?.map((recorre, index)=>{   
            if(recorre.estado)
            { 
                return <div key={index} >  {recorre.element} </div>    
            }
            
            
            }))
        ReactDOM.render(elementos, document.getElementById("contenedorFiltro"))
                 
        
      }
      quitarFiltrosAll = async ()=>{
        
        
        ReactDOM.render(<> </>, document.getElementById("contenedorFiltro"))
        await this.setElementosFiltro([])     
        await this.setState({...this.state, tipoCatalogo: []})
        this.props.onClearFiltro(0)      
        
      }
      okModal = ()=>{
        if(this.props.onOk)
        {
            this.props.onOk({longitud: this.ElementosFiltro().filter(x=>x.estado).length, filtros:this.retornoFiltrosAplicados})
        }
          
      }

      cancelModla = ()=>{
        if(this.props.onCancel)
        {
            this.props.onCancel()
        }
      }

      renderFiltro = ()=>{
        const elementos = React.createElement("div", {}, this.ElementosFiltro()?.map((recorre, index)=>{      
            if(recorre.estado)
            {
                return <div key={index} > {recorre.element} </div>
            }        
        }))
        ReactDOM.render(elementos, document.getElementById("contenedorFiltro")) 
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
}