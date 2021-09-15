import React, { CSSProperties, useState } from 'react';
import { DataGrid, GridColDef, GridCsvExportApi, GridExportCsvOptions, GridFilterItem, GridFilterModel, GridLinkOperator, GridToolbar, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@material-ui/data-grid';
import 'antd/dist/antd.css';
import './gridViewBG.css'
import { Badge, Dropdown, Modal, Space, Table } from 'antd';
import { DownloadOutlined, DownOutlined, FunnelPlotOutlined, SelectOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import ButtonBG from '../buttonBG/buttonBG';
import { ColumnsType } from 'antd/lib/table';
import ColumnGroup from 'rc-table/lib/sugar/ColumnGroup';
import Column from 'rc-table/lib/sugar/Column';
import ColumnasGrupo from '../../interfaces/columnasGrupos';

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


const GridViewBG = (props:GridViewBGProps)=>{
  const [filtro, setFiltro] = useState(false)

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

  const modal = ()=>
  {
    return (
      <> 
         <Modal title="Filtros" visible={filtro} onOk={()=>setFiltro(false)}  onCancel={()=>setFiltro(false)} >
            
        </Modal>
      </>
    )
  }
    return (
      <div>
        <div className="acciones">          
        <ButtonBG style={{display: `${props.buttonDownload? "inline" : "none"}` }}   text="Exportar EXCEL" type="outline" icon={<DownloadOutlined />} /> 

        <Badge count={1} color="#bc157c" > 
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