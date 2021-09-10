import React, { CSSProperties, useState } from 'react';
import { DataGrid, GridColDef, GridCsvExportApi, GridExportCsvOptions, GridFilterItem, GridFilterModel, GridLinkOperator, GridToolbar, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@material-ui/data-grid';

interface RimGridViewProps{
    width:number;
    height:number,
    pagesize:number;
    columns: GridColDef[]
    rows : Array<any>    

}


const GridViewBG = (props:RimGridViewProps)=>{
    const [filtro, setFiltro] = useState(null)
    let referencia = React.useRef<HTMLDivElement>()
    const borrarFiltro = (e:any)=>{
        
        setFiltro(e)

        
    }
    const CustomToolbar = ()=> {
        return (
        
          <GridToolbar></GridToolbar>
        );
      }
      
      
    return  (
        <> 
            <div style={{width:props.width, height:props.height}} >
                <DataGrid rows={props.rows} columns={props.columns} pageSize= {props.pagesize} 
                components={{Toolbar:CustomToolbar}}
                onFilterModelChange={borrarFiltro}
                onColumnHeaderClick={()=>console.log("click")}
                filterModel={filtro || undefined}
                />
            </div>                
        </>
    )

  
}


export default GridViewBG;