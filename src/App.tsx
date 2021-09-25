
import { GridCellParams, GridColDef, GridFilterItem, GridStateColDef } from '@material-ui/data-grid';
import './App.css';
import GridViewBG from './componentes/gridViewBG/gridViewBG';
import MenuBG from './componentes/menuBG/menuBG';
import data from './data.json'
import 'antd/dist/antd.css';
import MenuListBg from './interfaces/menu';
import { AiOutlineShop, AiOutlineSolution, AiOutlineUser } from 'react-icons/ai';
import { ColumnsType } from 'antd/lib/table';
import menuBG from './menu'
import ColumnasGrupo from './interfaces/columnasGrupos';
import DataSet from './interfaces/cuentaAhorros';
import filtroCatalogoValues from './data/catalogoValores';

import informacionFiltro from './data/informacionFiltro';
import CatalogoCampos from './data/catalogoCampo';

function App() {
  const menu : MenuListBg[] = menuBG;
  const columnsGroupResumen :ColumnasGrupo[] = [
    {
      tituloGrupo: "",
      items : [{
        dataIndex: 'titulo', 
        key:'titulo', 
        show:true,
        title: '', 
        width: 100,
      }
    ]
    },
    {
    tituloGrupo:"ANTERIOR",
    items: [
        {
          dataIndex: 'anterior', 
          key:'anterior', 
          title: 'Cuentas', 
          width: 100,
          show:true,
          render: (objeto:any) =>  objeto.cuenta
        },
        {
          dataIndex: 'anterior', 
          key:'anterior', 
          title: 'Saldos', 
          show:true,
          width: 100,
          render: (objeto:any) =>  objeto.saldo
        },
        {
          dataIndex: 'anterior', 
          key:'anterior', 
          title: 'Tasa', 
          show:true,
          width: 100,
          render: (objeto:any) =>  objeto.tasa
        }
      ]
    },
    {
    tituloGrupo:"ACTUAL",
    items: [
      {
        dataIndex: 'actual', 
        key:'actual', 
        title: 'Cuentas', 
        show:true,
        width: 100,
        render: (objeto:any) =>  objeto.cuenta
      },
      {
        dataIndex: 'actual', 
        key:'actual', 
        title: 'Saldos', 
        show:true,
        width: 100,
        render: (objeto:any) =>  objeto.saldo
      },
      {
        dataIndex: 'actual', 
        key:'actual', 
        title: 'Tasa', 
        show:true,
        width: 100,
        render: (objeto:any) =>  objeto.tasa
      }
    ]
    },
    {
      tituloGrupo:"VARIACION",
      items: [      
        {
          dataIndex: 'variacion', 
          key:'variacion', 
          title: 'Saldos',
          show:true, 
          width: 100,
          render: (objeto:any) =>  objeto.saldo
        },
        {
          dataIndex: 'actual', 
          key:'actual', 
          title: 'Tasa', 
          show:true,
          width: 100,
          render: (objeto:any) =>  objeto.tasa
        }
      ]
    }  
  ]
  const columnsGroup :ColumnasGrupo[] = [
    {
      tituloGrupo: "",
      items : [{
        dataIndex: 'codigo', 
        key:'codigo', 
        title: 'Codigo', 
        show:true,
        width: 100,
      },
      {
        dataIndex: 'descripcion', 
        key:'descripcion', 
        title: 'Descripcion', 
        show:true,
        width: 100,
      }
    ]
    },
    {
    tituloGrupo:"ANTERIOR",
    items: [
        {
          dataIndex: 'anterior', 
          key:'anterior', 
          title: 'Cuentas', 
          show:true,
          width: 100,
          render: (objeto:any) =>  objeto.cuenta
        },
        {
          dataIndex: 'anterior', 
          key:'anterior', 
          title: 'Saldos', 
          show:true,
          width: 100,
          render: (objeto:any) =>  objeto.saldo
        },
        {
          dataIndex: 'anterior', 
          key:'anterior', 
          title: 'Tasa', 
          show:true,
          width: 100,
          render: (objeto:any) =>  objeto.tasa
        }
      ]
    },
    {
    tituloGrupo:"ACTUAL",
    items: [
      {
        dataIndex: 'actual', 
        key:'actual', 
        title: 'Cuentas', 
        show:true,
        width: 100,
        render: (objeto:any) =>  objeto.cuenta
      },
      {
        dataIndex: 'actual', 
        key:'actual', 
        title: 'Saldos',
        show:true, 
        width: 100,
        render: (objeto:any) =>  objeto.saldo
      },
      {
        dataIndex: 'actual', 
        key:'actual', 
        title: 'Tasa',
        show:true, 
        width: 100,
        render: (objeto:any) =>  objeto.tasa
      }
    ]
    },
    {
      tituloGrupo:"VARIACION",
      items: [      
        {
          dataIndex: 'variacion', 
          key:'variacion', 
          title: 'Saldos',
          show:true, 
          width: 100,
          render: (objeto:any) =>  objeto.saldo
        },
        {
          dataIndex: 'actual', 
          key:'actual', 
          title: 'Tasa', 
          show:true,
          width: 100,
          render: (objeto:any) =>  objeto.tasa
        }
      ]
    }  
  ]

  let rows = new Array<DataSet>();
  for(let recorre = 0; recorre<300000; recorre++)
  {
    rows.push({
      key: recorre+1,
      codigo : (recorre +1).toString(),
      descripcion: "descripcion",
      anterior: {cuenta:1, saldo : 2, tasa:3},
      actual: {cuenta:1, saldo : 2, tasa:3},
      variacion: {cuenta:1, saldo : 2, tasa:3}    
})
  }
  const onOpenDetalle = (e:any) : any =>
  {
    console.log(e) //objeto obtenido cuando se abre el detalle
    const columns :any[] = [
        {
          dataIndex: 'anterior', 
          key:'anterior', 
          title: 'Cuentas', 
          width: 100,
          render: (objeto:any) =>  objeto.cuenta
        },
        {
          dataIndex: 'anterior', 
          key:'anterior', 
          title: 'Saldos', 
          width: 100,
          render: (objeto:any) =>  objeto.saldo
        },
        {
          dataIndex: 'anterior', 
          key:'anterior', 
          title: 'Tasa', 
          width: 100,
          render: (objeto:any) =>  objeto.tasa
        },
        {
          dataIndex: 'actual', 
          key:'actual', 
          title: 'Cuentas', 
          width: 100,
          render: (objeto:any) =>  objeto.cuenta
        },
        {
          dataIndex: 'actual', 
          key:'actual', 
          title: 'Saldos', 
          width: 100,
          render: (objeto:any) =>  objeto.saldo
        },
        {
          dataIndex: 'actual', 
          key:'actual', 
          title: 'Tasa', 
          width: 100,
          render: (objeto:any) =>  objeto.tasa
        },
        {
          dataIndex: 'variacion', 
          key:'variacion', 
          title: 'Cuentas', 
          width: 100,
          render: (objeto:any) =>  objeto.cuenta
        },
        {
          dataIndex: 'variacion', 
          key:'variacion', 
          title: 'Saldos', 
          width: 100,
          render: (objeto:any) =>  objeto.saldo
        },
        {
          dataIndex: 'variacion', 
          key:'variacion', 
          title: 'Tasa', 
          width: 100,
          render: (objeto:any) =>  objeto.tasa
        }
    ] 

    let rows = new Array<DataSet>();
    for(let recorre = 0; recorre<10; recorre++)
    {
      rows.push({
        key: recorre+1,
        codigo : (recorre +1).toString(),
        descripcion: "descripcion",
        anterior: {cuenta:1, saldo : 2, tasa:3},
        actual: {cuenta:1, saldo : 2, tasa:3},
        variacion: {cuenta:1, saldo : 2, tasa:3}      
    })
  }
    return {columns: columns, rows: rows}
  }

  const onAplicaFiltro = (e:any)=>{
    console.log(e)
  }
  
  const getDataSetGraficos = (x:any[], y:any[], tituloGrafico:string)=>{
    const dataSet = {
      labels:x ,
      datasets: [{
        label: tituloGrafico,
        data: y,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },    
    ]
    }

    return dataSet;
  }
  const meses:any[] = ["Enero","Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Noviembre", "Diciembre"]
  const dataSimuladaGrafico:any[] = [65, 59, 80, 81, 56, 55, 40, 52, 48, 12,11, 80];
  const diasMeses = ()=> { 
    let retorno:any[] = []
    for(var i=1;i<32; i++)
    {  
      retorno.push(i)
    }

    return retorno;
   }
 
  return (
      <> 
        <MenuBG items={menu} tituloPagina="RESUMEN CUENTAS DE AHORROS" >
          <div className="flex column" style={{justifyContent:"center"}}  >
            <GridViewBG 
            buttonDownload={true} 
            buttonFilter={true}  
            onOpenDetalle={onOpenDetalle} 
            height={100} 
            columns={columnsGroup} 
            rows={rows}          
            columnsTotal ={columnsGroupResumen}
            rowsTotal={[{
              
              codigo : 1,
              titulo:"Total",
              descripcion: "descripcion",
              anterior: {cuenta:1, saldo : 2, tasa:3},
              actual: {cuenta:1, saldo : 2, tasa:3},
              variacion: {cuenta:1, saldo : 2, tasa:3}  
            }]}     
            width={1200}
            tipoColumna="grupo"
            filtroCatalogoValues = {filtroCatalogoValues}
            filtroCatalogoCampos = {CatalogoCampos}             
            filtroInformacion = {informacionFiltro}
            onAplicarFiltro = {onAplicaFiltro}
            dataSetGraficos={{
            mensual:{
              labels: diasMeses(),
              datasets: [{
                label: 'Mensual',
                data: dataSimuladaGrafico,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              },            
            ]
            },
            anual:{
              labels: meses,
              datasets: [{
                label: 'Anual',
                data: dataSimuladaGrafico,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              },            
            ]
            }
          
          }}
            />            
          </div>
        </MenuBG>        
      </>
  );
}

export default App;
