import { useEffect, useState } from "react";
import GridViewBG from "../../../componentes/gridViewBG/gridViewBG";
import MenuBG from "../../../componentes/menuBG/menuBG";
import ColumnasGrupo from "../../../interfaces/columnasGrupos";
import DataSet from "../../../interfaces/cuentaAhorros";
import { catalogosCampos, catalogosValues, informacionFiltros } from "../../../interfaces/filtros";
import MenuListBg from "../../../interfaces/menu";
import menuBG from './../../../menu'
import filtroCatalogoValues from './../../../data/catalogoValores';
import './ahorrosResumen.css'
import informacionFiltro from './../../../data/informacionFiltro';
import CatalogoCampos from './../../../data/catalogoCampo';
interface AhorroResumenProps
{
    menuAbierto: boolean
    onReady? :any;
}
const AhorroResumen = (props:AhorroResumenProps)=>{
    const menu : MenuListBg[] = menuBG;
    const [filtrosCampos, setFiltrosCampos] = useState(Array<informacionFiltros>())
    const [filtrosValues, setFiltrosValues] = useState(Array<catalogosValues>())
    const [filtrosCampoCatalogo,setFiltrosCampoCatalogo] =  useState(Array<catalogosCampos>())  
    const [menuAbierto, setMenuAbierto] = useState(props.menuAbierto)
    useEffect(()=>{
        setMenuAbierto(props.menuAbierto)
    }, [props.menuAbierto])
    useEffect(()=>{
      if(props.onReady)
      {
        props.onReady();
      }
    }, [])
    
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
            width: "72px",
            show:true,
            render: (objeto:any) =>  objeto.cuenta
          },
          {
            dataIndex: 'anterior', 
            key:'anterior', 
            title: 'Saldos', 
            show:true,
            width: "63px",
            render: (objeto:any) =>  objeto.saldo
          },
          {
            dataIndex: 'anterior', 
            key:'anterior', 
            title: 'Tasa', 
            show:true,
            width: "49px",
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
          width: "72px",
          render: (objeto:any) =>  objeto.cuenta
        },
        {
          dataIndex: 'actual', 
          key:'actual', 
          title: 'Saldos', 
          show:true,
          width: "63px",
          render: (objeto:any) =>  objeto.saldo
        },
        {
          dataIndex: 'actual', 
          key:'actual', 
          title: 'Tasa', 
          show:true,
          width: "49px",
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
            width: "63px",
            render: (objeto:any) =>  objeto.saldo
          },
          {
            dataIndex: 'actual', 
            key:'actual', 
            title: 'Tasa', 
            show:true,
            width: "49px",
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
          width: "90px",
        },
        {
          dataIndex: 'descripcion', 
          key:'descripcion', 
          title: 'Descripcion', 
          show:true,
          width: "200px",
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
            width: "auto",
            render: (objeto:any) =>  objeto.cuenta
          },
          {
            dataIndex: 'anterior', 
            key:'anterior', 
            title: 'Saldos', 
            show:true,
            width: "auto",
            render: (objeto:any) =>  objeto.saldo
          },
          {
            dataIndex: 'anterior', 
            key:'anterior', 
            title: 'Tasa', 
            show:true,
            width: "auto",
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
          width: "auto",
          render: (objeto:any) =>  objeto.cuenta
        },
        {
          dataIndex: 'actual', 
          key:'actual', 
          title: 'Saldos',
          show:true, 
          width: "auto",
          render: (objeto:any) =>  objeto.saldo
        },
        {
          dataIndex: 'actual', 
          key:'actual', 
          title: 'Tasa',
          show:true, 
          width: "auto",
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
            width: "auto",
            render: (objeto:any) =>  objeto.saldo
          },
          {
            dataIndex: 'actual', 
            key:'actual', 
            title: 'Tasa', 
            show:true,
            width: "auto",
            render: (objeto:any) =>  objeto.tasa
          }
        ]
      }  
    ]
  
    let rows = new Array<DataSet>();
    for(let recorre = 0; recorre<1000; recorre++)
    {
      rows.push({
        key: recorre+1,
        codigo : (recorre +1).toString(),
        descripcion: "descripcion",
        anterior: {cuenta:80.3, saldo : 42.1, tasa:31.3},
        actual: {cuenta:56.21, saldo : 2.4, tasa:34.42},
        variacion: {cuenta:62.5, saldo : 2.6, tasa:32.12}    
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
          anterior: {cuenta:20.1, saldo : 4.3, tasa:33.21},
          actual: {cuenta:40.21, saldo : 2.1, tasa:30.12},
          variacion: {cuenta:22.21, saldo : 2.6, tasa:32.31}      
      })
    }
      return {columns: columns, rows: rows}
    }
  
    const onAplicaFiltro = (e:any)=>{
      console.log("datow filtros")
      console.log(e)
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
    const onBuscar = (e:any)=>{
      console.log(e)
    }
  
    const onLoad = (e:any)=>{
  
    }
  
    const getPage = (pagina:string, props:any)=>{
      return <> </>
    }


    return (<> 
    
    <div className="flex column" style={{justifyContent:"center"}}  >
            <GridViewBG
            onBuscar={onBuscar}
            menuAbierto = {menuAbierto}
            buttonDownload={true} 
            buttonFilter={true}  
            onOpenDetalle={onOpenDetalle} 
            height={100} 
            columns={columnsGroup} 
            rows={rows}          
            onLoad={onLoad}
            columnsTotal ={columnsGroupResumen}
            rowsTotal={[{
              
              codigo : 1,
              titulo:"Total",
              descripcion: "descripcion",
              anterior: {cuenta:120.32, saldo : 6.4, tasa:128.98},
              actual: {cuenta:130.00, saldo : 12.3, tasa:30.32},
              variacion: {cuenta:122.32, saldo : 2.12, tasa:31.56}  
            }]}     
            width={1200}
            tipoColumna="grupo"
            filtroCatalogoValues = {filtroCatalogoValues}
            filtroCatalogoCampos = { CatalogoCampos}             
            filtroInformacion = {informacionFiltro}
            onAplicarFiltro = {onAplicaFiltro}
            dataSetGraficos={{
            mensual:{
              labels: diasMeses(),
              datasets: [{
                label: 'Diario',
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
                label: 'Mensual',
                data: dataSimuladaGrafico,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            
              },            
            ]
            }
          
          }}
            />      
           
          </div>
    
    </>)
}

export default AhorroResumen