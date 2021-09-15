import React, { CSSProperties, useState } from 'react';
import { DataGrid, GridColDef, GridCsvExportApi, GridExportCsvOptions, GridFilterItem, GridFilterModel, GridLinkOperator, GridToolbar, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@material-ui/data-grid';
import 'antd/dist/antd.css';
import './gridViewBG.css'
import { Badge, Dropdown, Modal, Space, Table, Select } from 'antd';
import { CloseOutlined, DeleteOutlined, DownloadOutlined, DownOutlined, FunnelPlotOutlined, PlusOutlined, SelectOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import ButtonBG from '../buttonBG/buttonBG';
import { ColumnsType } from 'antd/lib/table';
import ColumnGroup from 'rc-table/lib/sugar/ColumnGroup';
import Column from 'rc-table/lib/sugar/Column';
import ColumnasGrupo from '../../interfaces/columnasGrupos';
import ReactDOM from 'react-dom';

interface GridViewBGProps{
    width:number;
    height:number,
    pagesize:number;
    columns: ColumnasGrupo[];
    rows : Array<any>    
    onOpenDetalle : any;
    buttonDownload?:boolean;
    buttonFilter?:boolean;
}

interface GridViewBGModalState {
  id:number;
  element:any
}

const GridViewBG = (props:GridViewBGProps)=>{
  const [filtro, setFiltro] = useState(false)
  const [elementosFiltros, setElementosFiltros] = useState<Array<GridViewBGModalState>>([])
  const [badge, setBadge] = useState(0)
  const getColumnsGroup = (columns:any[])=>{
    return columns.map((recorre, index) =>{
      return (
        <>
          <ColumnGroup key={index} title={recorre.tituloGrupo} >
            {recorre.items.map((recorreChildre:any, indexChildren:any)=>{
              let render = undefined
              if(recorreChildre.render)
              {
                render = recorreChildre.render
              }
              return (<> 
                <Column   title={recorreChildre.title} dataIndex={recorreChildre.dataIndex} key={recorreChildre.key} 
                  width={recorreChildre.width} render={render}                            
                />
              </>)
            })
            }
            
          </ColumnGroup>                   
        </>
      )
    })
  }
  const expandedRowRender = (e:any) => {
      const retorno = props.onOpenDetalle(e)
      return <Table scroll={{y:340}} dataSource={retorno.rows} pagination={false}>  {getColumnsGroup(retorno.columns)}  </Table>;
    };
  const onOpenModal = ()=>{
    setFiltro(true)
  }
  const elementoFiltro = (id:number)=>{
    return (
      <> 
          <div className="flex row elementoFiltro" key={id}   >
            <Select defaultValue="Seleccione" style={{ width: 150 }} >
              <option value="0">Opcion 1</option>            
            </Select>
            <div style={{justifyContent:"center", alignItems:"center"}}  className="flex" >
              <CloseOutlined className="iconEliminar" onClick={()=>{quitarFiltro(id)}} />
            </div>
            
          </div>
      </>
    )
  }
  let contador = 0;
  const agregarFiltro =()=>{
    const oldElements = elementosFiltros
    oldElements?.push({id:contador++, element: elementoFiltro(contador++)})
    const elementos = React.createElement("div", {}, oldElements?.map((recorre, index)=>{      
      return <div key={index} > {recorre.element} </div>
    }))

    ReactDOM.render(elementos, document.getElementById("contenedorFiltro"))
    setElementosFiltros(oldElements)
  }
  const quitarFiltro = (id:number)=>{
    console.log(id)
  }
  const quitarFiltrosAll = ()=>{
    
    
    ReactDOM.render(<> </>, document.getElementById("contenedorFiltro"))
    setElementosFiltros([])   
    setBadge(0) 
    setFiltro(false)
  }
  const okModal = ()=>{
    setFiltro(false)
    if(elementosFiltros)
    {
      setBadge(elementosFiltros.length)
    }
    
  }
  const modal = ()=>
  {
    return (
      <> 
         <Modal style={{height:"1000px"}}  title="Filtros" visible={filtro} onOk={okModal}  onCancel={()=>setFiltro(false)} >
           <div className="flex row accionesModal"  > 
              <ButtonBG text="Limpiar" type="normal" onClick={quitarFiltrosAll}  icon={<DeleteOutlined />} />
              <ButtonBG text="Agregar Filtro" type="outline" onClick={agregarFiltro} icon={<PlusOutlined />} />
           </div>
           <div> </div>
            <div id="contenedorFiltro" className="flex colum contenedorFiltro"  >
                 
            </div>
        </Modal>
      </>
    )
  }
    return (
      <div>
        <div className="acciones">          
        <ButtonBG style={{display: `${props.buttonDownload? "inline" : "none"}` }}   text="Exportar EXCEL" type="outline" icon={<DownloadOutlined />} /> 

        <Badge count={badge} color="#bc157c" > 
          <ButtonBG style={{display: `${props.buttonFilter? "inline" : "none"}` }}  onClick={onOpenModal}  text="Filtrar" type="normal" icon={<FunnelPlotOutlined />} /> 
        </Badge>
        
        </div>
        
        <Table
          className="components-table-demo-nested"
          pagination  ={{pageSize : props.pagesize}}
          style={{width:props.width}}
          scroll ={{y:340}}            
          expandable={{ expandedRowRender }}
          dataSource={props.rows}>
          {
            getColumnsGroup(props.columns)
          }
          
        </Table>
        {
          modal()
        }
      </div>
    );

  
}


export default GridViewBG;