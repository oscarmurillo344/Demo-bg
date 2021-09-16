
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
function App() {
  const menu : MenuListBg[] = menuBG;
  const columnsGroup :ColumnasGrupo[] = [
    {
    tituloGrupo:"ANTERIOR",
    items: [
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
          width: 100,
          render: (objeto:any) =>  objeto.saldo
        },
        {
          dataIndex: 'actual', 
          key:'actual', 
          title: 'Tasa', 
          width: 100,
          render: (objeto:any) =>  objeto.tasa
        }
      ]
      },
]

  let rows = new Array<DataSet>();
  for(let recorre = 0; recorre<300000; recorre++)
  {
    rows.push({
      key: recorre+1,
      codigo : (recorre +1).toString(),
      descripcion: "",
      anterior: {cuenta:1, saldo : 2, tasa:3},
      actual: {cuenta:1, saldo : 2, tasa:3},
      variacion: {cuenta:1, saldo : 2, tasa:3}    
})
  }
  const onOpenDetalle = (e:any) : any =>
  {
    console.log(e) //objeto obtenido cuando se abre el detalle
    const columns :ColumnasGrupo[] = [
      {
        tituloGrupo: "",
        items : [{
          dataIndex: 'codigo', 
          key:'codigo', 
          title: 'Codigo', 
          width: 100,
        },
        {
          dataIndex: 'descripcion', 
          key:'descripcion', 
          title: 'Descripcion', 
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
            width: 100,
            render: (objeto:any) =>  objeto.saldo
          },
          {
            dataIndex: 'actual', 
            key:'actual', 
            title: 'Tasa', 
            width: 100,
            render: (objeto:any) =>  objeto.tasa
          }
        ]
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
  return (
      <> 
        <MenuBG items={menu} tituloPagina="Detalle Cuentas Ahorros" >
          <div className="flex" style={{justifyContent:"center"}}  >
            <GridViewBG 
            buttonDownload={true} 
            buttonFilter={true}  
            onOpenDetalle={onOpenDetalle} 
            height={325} 
            columns={columnsGroup} 
            rows={rows} 
            pagesize={10}  
            width={1200}
            filtroCatalogoValues = {[
              {
                campo:"edad",
                id: "0",
                value: "23"
              }
            ]}
            filtroCatalogoCampos = {[
              {cammpo:"edad"},
              {cammpo:"fecha"}              
              
            ]}
            filtroCatalogo = {[{
              tipoDato:"string",
              id:"=",
              value:"igual a"
            },
            
          
          ]}
            filtroInformacion = {[
              {
                campo : "edad",
                tipoDato : "string",
                esCatalogo: true
              
            },
            {
              campo : "fecha",
              tipoDato : "date",
              esCatalogo: false
            
            }
            ]}
            />
          </div>
        </MenuBG>        
      </>
  );
}

export default App;
