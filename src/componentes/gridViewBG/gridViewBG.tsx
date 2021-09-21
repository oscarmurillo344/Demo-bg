import React, { CSSProperties, useState, useEffect } from 'react';
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
import ModalBG from '../modalBG/modalBG';
import { catalogosCampos, catalogosFiltros, catalogosValues, informacionFiltros } from '../../interfaces/filtros';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
interface GridViewBGProps{
    width:number;
    height:number,
    
    columns: ColumnasGrupo[];
    rows : Array<any>    
    onOpenDetalle : any;
    buttonDownload?:boolean;
    buttonFilter?:boolean;
    filtroCatalogoCampos: catalogosCampos[];
    filtroCatalogo: catalogosFiltros[];
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
      return <Table scroll={{y:340}} dataSource={retorno.rows} pagination={false} columns={retorno.columns} >    </Table>;
    };
    const onOpenModal = ()=>{
      console.log("entro")
      setOpen(true)
      
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

    const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (apiData:any, fileName:any) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
    return (
      <div>
        <div className="acciones">          
        <ButtonBG style={{display: `${props.buttonDownload? "inline" : "none"}` }}    text="Exportar EXCEL" type="outline" icon={<DownloadOutlined />} /> 

        <Badge count={badge} color="#bc157c" > 
          <ButtonBG style={{display: `${props.buttonFilter? "inline" : "none"}` }}  onClick={onOpenModal}  text="Filtrar" type="normal" icon={<FunnelPlotOutlined />} /> 
        </Badge>
        
        </div>
        
        <Table
          className="components-table-demo-nested"
          
          style={{width:props.width}}
          scroll ={{y:340}}            
          expandable={{ expandedRowRender }}
          dataSource={props.rows}>
          {
            getColumnsGroup(props.columns)
          }
          
        </Table>
        {
          <ModalBG catalogosValues={props.filtroCatalogoValues}   filtroCatalogo = {props.filtroCatalogo} filtroCatalogoCampos = {props.filtroCatalogoCampos} filtroInformacion={props.filtroInformacion} open={open} onCancel={onCancel} onOk={onOk} onClearFiltro={onClearFiltro}  />
        }
      </div>
    );

        

  
}


export default GridViewBG;