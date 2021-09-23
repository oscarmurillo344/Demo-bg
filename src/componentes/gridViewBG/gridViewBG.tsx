import React, { CSSProperties, useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridCsvExportApi, GridExportCsvOptions, GridFilterItem, GridFilterModel, GridLinkOperator, GridToolbar, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@material-ui/data-grid';
import 'antd/dist/antd.css';
import './gridViewBG.css'
import { Badge, Dropdown, Modal, Space, Table, Select, Tabs, Tree, DatePicker } from 'antd';
import { CloseOutlined, DeleteOutlined, DownloadOutlined, DownOutlined, FileExcelOutlined, FileOutlined, FilePdfOutlined, FunnelPlotOutlined, PlusOutlined, ReloadOutlined, RotateRightOutlined, SearchOutlined, SelectOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import ButtonBG from '../buttonBG/buttonBG';
import { ColumnsType } from 'antd/lib/table';
import ColumnGroup from 'rc-table/lib/sugar/ColumnGroup';
import Column from 'rc-table/lib/sugar/Column';
import ColumnasGrupo from '../../interfaces/columnasGrupos';
import ReactDOM from 'react-dom';
import ModalBG from '../modalBG/modalBG';
import { catalogosCampos, catalogosFiltros, catalogosValues, informacionFiltros } from '../../interfaces/filtros';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import ModalContentBG from '../modalContentBG/modalContentBG';
const { TabPane } = Tabs;

interface GridViewBGProps{
    width:number;
    height:number,
    
    columns: ColumnasGrupo[] | any[];
    rows : Array<any>    
    columnsResumen: ColumnasGrupo[] | any[];
    rowsResumen : Array<any>    
    onOpenDetalle : any;
    buttonDownload?:boolean;
    buttonFilter?:boolean;
    tipoColumna: "grupo" | "individual"
    filtroCatalogoCampos: catalogosCampos[];

    filtroCatalogoValues : catalogosValues[]
    filtroInformacion: informacionFiltros[];
    
}

interface GridViewBGModalState {
  id:number;
  element:any
}
let validarRefencia = 0;
const GridViewBG = (props:GridViewBGProps)=>{
  const [open, setOpen] = useState(false)
  const [badge, setBadge] = useState(0)
  const [openModalContent, setOpenModalContent] = useState(false)
  const [openModalColumn, setOpenModalColumn] = useState(false)
  const getColumnsGroup = (columns:any[])=>{
    if(props.tipoColumna === "grupo")
    {
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
    }else{
      return props.columns.map((recorre:any, index:any)=>{
        return (<> 
          <Column   title={recorre.title} dataIndex={recorre.dataIndex} key={recorre.key} 
            width={recorre.width} render={recorre}                            
          />
        </>)
      })
    }
    
  }
  const expandedRowRender = (e:any) => {
      const retorno = props.onOpenDetalle(e)
      return <Table scroll={{y:340}} dataSource={retorno.rows} pagination={false} columns={retorno.columns} >    </Table>;
    };
    const onOpenModal = ()=>{
      console.log("entro")
      setOpen(true)
      
    }
    const onOkModalDownload = ()=>{
      console.log("actualizo el state")
      setOpenModalContent(false)

    } 
    const onCancelModalDownload = ()=>{
      setOpenModalContent(false)

    }
    const onOk = (e:any)=>
    { 
      setOpen(false)
      setBadge(e)
    }

    const onCancel = ()=>{
      setOpen(false)
    }

    const onClearFiltro = ()=>{
      setBadge(0)
      setOpen(false)

    }
    const onDowload =()=>
    {
      setOpenModalContent(true)
    }

    const onColumnas =()=>{
      setOpenModalColumn(true)
    }

    const onOkColumns = ()=>{
      setOpenModalColumn(false)
    }

    const onCancelColumns = ()=>{
      setOpenModalColumn(false)
    }
    const fechas = ()=>{
      return <>
          <div className="flex" style={{ alignItems:"end"}}  >
              <div className="flex colum" style={{alignItems:"start", justifyContent:"center"}} >
                <div>Fecha Anterior</div>
                <DatePicker format="DD/MM/yyyy"  style={{ width:"200px"}} />
              </div>
              <div className="flex colum" style={{alignItems:"start", marginLeft:"20px"}}  >
              <div>Fecha Actual</div>
                <DatePicker format="DD/MM/yyyy"  style={{ width:"200px"}} />
              </div>
              <ButtonBG shape="round" style={{display: `${props.buttonFilter? "inline" : "none"}`, marginLeft:"20px" }}  text="Buscar" type="normal" icon={<ReloadOutlined />} /> 
              
          </div>
       </> 
    }
    return (
      <div style={{justifyContent:"end", width:"100%", marginRight:"30px"}} className="flex" >
        
        <Tabs defaultActiveKey="1" tabPosition="right" >
                
                <TabPane tab="Informacion" key="1">
                <div className="tabContainer"> 
                
                <div className="acciones flex" style={{justifyContent:"space-between", alignItems:"end", marginBottom:"20px"}}>          
                  {
                    fechas()
                  }
                  <Badge count={badge} color="#bc157c" > 
                    <ButtonBG shape="round" style={{display: `${props.buttonFilter? "inline" : "none"}` }}  onClick={onOpenModal}  text="Filtrar" type="normal" icon={<FunnelPlotOutlined />} /> 
                  </Badge>
                  
                </div>
                  <Table
                    className="totales"
                    pagination={false}
                    style={{width:props.width, marginBottom:"10px"}}
                                      
                    dataSource={props.rowsResumen}>
                    {
                      getColumnsGroup(props.columnsResumen)
                    }
                    
                  </Table>  
                  <Table
                      className="components-table-demo-nested"
                      
                      style={{width:props.width}}
                      scroll ={{y:210}}            
                      expandable={{ expandedRowRender }}
                      dataSource={props.rows}>
                      {
                        getColumnsGroup(props.columns)
                      }                        
                    </Table>
                    <div className="flex acciones" >
                    <ButtonBG shape="round" style={{display: `${props.buttonDownload? "inline" : "none"}` }} onClick={onDowload}   text="Exportar" type="outline" icon={<DownloadOutlined />} />           
                    <ButtonBG shape="round" text="Variaciones" type="outline" icon={<FileOutlined />} /> 
                    <ButtonBG shape="round" text="Columnas" onClick={onColumnas}  type="outline" icon={<RotateRightOutlined />} /> 
                    </div>
                </div>
                </TabPane>
              
                <TabPane tab="Graficos" key="3">
                <div className="tabContainer"> 
                </div>
                </TabPane>
        </Tabs> 
      
        {
          <>
          <ModalBG catalogosValues={props.filtroCatalogoValues}  filtroCatalogoCampos = {props.filtroCatalogoCampos} filtroInformacion={props.filtroInformacion} open={open} onCancel={onCancel} onOk={onOk} onClearFiltro={onClearFiltro}  />
          <ModalContentBG 
           width={500}
           onOk={onOkColumns} 
           onCancel={onCancelColumns} 
           titulo={'Columnas'} 
           content={ <> 
            <Tree
            checkable
        
            treeData={[
              {
                title: '0-0',
                key: '0-0',
                children: [
                  {
                    title: '0-0-0',
                    key: '0-0-0',
                    children: [
                      {
                        title: '0-0-0-0',
                        key: '0-0-0-0',
                      },
                      {
                        title: '0-0-0-1',
                        key: '0-0-0-1',
                      },
                      {
                        title: '0-0-0-2',
                        key: '0-0-0-2',
                      },
                    ],
                  },
                  {
                    title: '0-0-1',
                    key: '0-0-1',
                    children: [
                      {
                        title: '0-0-1-0',
                        key: '0-0-1-0',
                      },
                      {
                        title: '0-0-1-1',
                        key: '0-0-1-1',
                      },
                      {
                        title: '0-0-1-2',
                        key: '0-0-1-2',
                      },
                    ],
                  },
                  {
                    title: '0-0-2',
                    key: '0-0-2',
                  },
                ],
              },
              {
                title: '0-1',
                key: '0-1',
                children: [
                  {
                    title: '0-1-0-0',
                    key: '0-1-0-0',
                  },
                  {
                    title: '0-1-0-1',
                    key: '0-1-0-1',
                  },
                  {
                    title: '0-1-0-2',
                    key: '0-1-0-2',
                  },
                ],
              },
              {
                title: '0-2',
                key: '0-2',
              },
            ]}
          />
           </> }
           visible={openModalColumn}></ModalContentBG>

           
          <ModalContentBG 
           width={340}
           onOk={onOkModalDownload} 
           onCancel={onCancelModalDownload} 
           titulo={'Descargar'} 
           content={ <> 
              <div className="flex" style={{width:"100%", justifyContent:"space-around"}} >
              <ButtonBG shape="round" text="Excel" type="outline" icon={<FileExcelOutlined />} /> 
              <ButtonBG shape="round" text="PDF" type="outline" icon={<FilePdfOutlined />} /> 
              </div>
              

           </> }
           visible={openModalContent}></ModalContentBG>
          </>
          
        }
      </div>
    );
    
    
        

  
}


export default GridViewBG;

