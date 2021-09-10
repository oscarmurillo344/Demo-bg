import React, { CSSProperties, useState } from 'react';
import { DataGrid, GridColDef, GridCsvExportApi, GridExportCsvOptions, GridFilterItem, GridFilterModel, GridLinkOperator, GridToolbar, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@material-ui/data-grid';
import 'antd/dist/antd.css';
import { Badge, Dropdown, Space, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';

interface RimGridViewProps{
    width:number;
    height:number,
    pagesize:number;
    columns: GridColDef[]
    rows : Array<any>    

}


const GridViewBG = (props:RimGridViewProps)=>{

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
        <Table
        className="components-table-demo-nested"
        pagination  ={{pageSize : props.pagesize}}
        style={{width:props.width}}
        scroll ={{y:340}}
        columns={props.columns}
        expandable={{ expandedRowRender }}
        dataSource={props.rows}
        />
      );

  
}


export default GridViewBG;