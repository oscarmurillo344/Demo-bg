import React, { CSSProperties, useState } from 'react';
import { DataGrid, GridColDef, GridCsvExportApi, GridExportCsvOptions, GridFilterItem, GridFilterModel, GridLinkOperator, GridToolbar, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@material-ui/data-grid';
import 'antd/dist/antd.css';
import './gridViewBG.css'
import { Badge, Dropdown, Space, Table } from 'antd';
import { DownloadOutlined, DownOutlined, SelectOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import ButtonBG from '../buttonBG/buttonBG';

interface GridViewBGProps{
    width:number;
    height:number,
    pagesize:number;
    columns: GridColDef[]
    rows : Array<any>    

}


const GridViewBG = (props:GridViewBGProps)=>{

    const expandedRowRender = () => {
        const columns: any[] = [
            {dataIndex: 'ruc', title: 'Ruc', width: 160},
            {dataIndex: 'empresa', title: 'Empresa', width: 170},      
            {dataIndex: 'direccion', title: 'Direccion', width: 170},
       
          ];
    
        const rows = [
        {
        ruc: 1,
        empresa: "Nathalie Andrea",
        direccion: "Bohorquez Velez"       
        },
        {
        ruc: 2,
        empresa: "Nathalie Andrea",
        direccion: "Bohorquez Velez"       
        },
        {
        ruc: 3,
        empresa: "Nathalie Andrea",
        direccion: "Bohorquez Velez"       
        }
        ]
        return <Table columns={columns} dataSource={rows} pagination={false} />;
      };
     
      return (
        <div>
          <div className="acciones">
          <ButtonBG color="#bc157c" text="Exportar EXCEL" type="outline" icon={<DownloadOutlined />} /> 
          </div>
          
          <Table
            className="components-table-demo-nested"
            pagination  ={{pageSize : props.pagesize}}
            style={{width:props.width}}
            scroll ={{y:340}}
            columns={props.columns}
            expandable={{ expandedRowRender }}
            dataSource={props.rows}
          />
        </div>
      );

  
}


export default GridViewBG;