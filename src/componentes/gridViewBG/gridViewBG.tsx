import React, { CSSProperties } from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';

interface RimGridViewProps{
    width:number;
    height:number,
    pagesize:number;
    columns: GridColDef[]
    rows : Array<any>    

}


const GridViewBG = (props:RimGridViewProps)=>{
    return  (
        <> 
            <div style={{width:props.width, height:props.height}} >
                <DataGrid rows={props.rows} columns={props.columns} pageSize= {props.pagesize}/>
            </div>                
        </>
    )
}


export default GridViewBG;