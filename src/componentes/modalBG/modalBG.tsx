import { CloseOutlined, DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Modal, Select } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom'
import ButtonBG from '../buttonBG/buttonBG'
const  {confirm} =  Modal;
interface ModalBGProps {
    open:boolean;
    onOk  :any;
    onCancel  :any;
    onClearFiltro :any;
    
}

interface ModalBGState {
    open:boolean;
    filtros : Array<any>
    
}

interface catalogosCampos{

}

interface catalogosValues{

}

interface informacionFiltros{

}

interface filtroSeleccionado{
    idContainer:number,
    campoValue:number;

}
export default class ModalBG extends React.Component<ModalBGProps,ModalBGState>
{
    filtrosSeleccionados = new Array<filtroSeleccionado>()

    constructor(props:ModalBGProps){
        super(props)
        this.state = {
            open: this.props.open,
            filtros : []
        }
    }
    async componentDidUpdate(prevProps:ModalBGProps)
    {
        console.log("si vengo pa aca")
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
            <Modal style={{height:"1000px"}}  title="Filtros" visible={this.state.open} onOk={this.okModal}  onCancel={this.cancelModla} >
            <div className="flex row accionesModal"  > 
               <ButtonBG text="Limpiar" type="normal" style={{display: this.ElementosFiltro().filter(x=>x.estado).length > 0? "inline": "none"}}  onClick={this.quitarFiltrosAll}  icon={<DeleteOutlined />} />
               <ButtonBG text="Agregar Filtro" type="outline" onClick={this.agregarFiltro} icon={<PlusOutlined />} />
            </div>
            <div> </div>
             <div id="contenedorFiltro" className="flex colum contenedorFiltro"  >
                  
             </div>
            </Modal>
        )
    }

    onOpenModal = ()=>{
        this.setOpen(true)
    }
      
    createElementoFiltro = (id:number)=>{
        
        return (
          <> 
              <div className="flex row elementoFiltro" key={id}   >
                <Select key={`${id}-0`}  defaultValue="-1" style={{ width: 150 }} >
                  <option value="-1">Campos</option>  
                  <option value="0">Opcion 1</option>            
                </Select>
                <div style={{justifyContent:"center", alignItems:"center"}}  className="flex" >
                  <CloseOutlined className="iconEliminar" onClick={()=>{this.quitarFiltro(id)}} />
                </div>
                
              </div>
          </>
        )
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
        this.props.onClearFiltro(0)      
        
      }
      okModal = ()=>{
        if(this.props.onOk)
        {
            this.props.onOk(this.ElementosFiltro().filter(x=>x.estado).length)
        }
          
      }

      cancelModla = ()=>{
        if(this.props.onCancel)
        {
            this.props.onCancel()
        }
      }
}