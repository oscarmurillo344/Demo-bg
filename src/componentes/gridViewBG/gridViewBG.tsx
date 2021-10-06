import { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './gridViewBG.css'
import {Line} from 'react-chartjs-2'
import { Badge, Table, Tabs, Tree, DatePicker } from 'antd';
import { DoubleLeftOutlined, DownloadOutlined, FileExcelOutlined, FileOutlined, FilePdfOutlined, FunnelPlotOutlined, PlusOutlined, ReloadOutlined, RotateRightOutlined, SearchOutlined, SelectOutlined } from '@ant-design/icons';
import ButtonBG from '../buttonBG/buttonBG';
import ColumnGroup from 'rc-table/lib/sugar/ColumnGroup';
import Column from 'rc-table/lib/sugar/Column';
import ColumnasGrupo from '../../interfaces/columnasGrupos';
import ModalBG from '../modalBG/modalBG';
import { catalogosCampos, catalogosValues, informacionFiltros } from '../../interfaces/filtros';
import moment from 'moment';
import ModalContentBG from '../modalContentBG/modalContentBG';
import { AiOutlineCloseCircle } from 'react-icons/ai';
const { TabPane } = Tabs;

interface GridViewBGPropsDataSetGrafico{
      labels: any[],
      datasets: [{
        label:string,
        data:any[],
        fill:boolean,
        borderColor:string,
        tension:number
      }]
    
}
interface GridViewBGProps{
    width:number;
    height:number,
    
    columns: ColumnasGrupo[] | any[];
    rows : Array<any>    
    columnsTotal: ColumnasGrupo[] | any[];
    rowsTotal : Array<any>    
    onOpenDetalle : any;
    buttonDownload?:boolean;
    buttonFilter?:boolean;
    tipoColumna: "grupo" | "individual"
    filtroCatalogoCampos: catalogosCampos[];
    onAplicarFiltro?:any;
    menuAbierto:any; 
    filtroCatalogoValues : catalogosValues[]
    filtroInformacion: informacionFiltros[];
    onBuscar?:any;
    onLoad?: any;
    dataSetGraficos? : {mensual:GridViewBGPropsDataSetGrafico, anual:GridViewBGPropsDataSetGrafico}
}

let validarRefencia = 0;
const GridViewBG = (props:GridViewBGProps)=>{
  const [open, setOpen] = useState(false)
  const [badge, setBadge] = useState(0)
  const [openModalContent, setOpenModalContent] = useState(false)
  const [openModalColumn, setOpenModalColumn] = useState(false)
  const [openGrafico, setOpenGrafico] = useState(false)
  const [columnsTotales, setColumnsTotales] = useState(props.columnsTotal)
  const [columnsGrupo, setColumnsGrupos] = useState(props.columns)
  const [rowTotales, setRowTotales] = useState(props.rowsTotal)
  const [rowGrupos, setRowGrupos] = useState(props.rows)
  const [filtrosAplicadosObjeto, setFiltrosAplicados] = useState({});
  const [menuAbierto, setMenuAbierto] = useState(props.menuAbierto)
  let fechaAnterior = new Date(moment().subtract(20, "days").toDate());
  let fechaActual = new Date(moment().toDate());
  const dataAnual = {
    labels: ["Enero","Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Noviembre", "Diciembre"],
    datasets: [{
      label: 'Grafico 1',
      data: [65, 59, 80, 81, 56, 55, 40, 52, 48, 12,11, 80],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };
  useEffect(()=>{
    console.log(props.menuAbierto)
    console.log("se ha actualizado")
    setMenuAbierto(props.menuAbierto)
  }, [props.menuAbierto])
  useEffect(()=>{
      if(props.onLoad)
      {
        props.onLoad({
          fechaAnterior : fechaAnterior,
          fechaActual : fechaActual,
          filtrosAplicados : filtrosAplicadosObjeto
        });
      }
  })

  useEffect(()=>{
    setRowTotales(props.rowsTotal)
  }, [props.rowsTotal])

  useEffect(()=>{
    setRowGrupos(props.rows)
  }, [props.rows])
  
 
  const getColumnsGroup = (columns:any[])=>{
    if(props.tipoColumna === "grupo")
    {
      return columns.map((recorre, index) =>{
        if(recorre.items.filter((x:any)=>x.show).length > 0)
        {
          return (
            <>
              <ColumnGroup key={index} title={recorre.tituloGrupo} >
                {recorre.items.map((recorreChildre:any, indexChildren:any)=>{
                  let render = undefined
                  let show = recorreChildre.show;
                  if(recorreChildre.render)
                  {
                    render = recorreChildre.render
                  }
                  if(show)
                  {
                    return (<> 
                      <Column   title={recorreChildre.title} dataIndex={recorreChildre.dataIndex} key={recorreChildre.key} 
                        width={recorreChildre.width} render={render}                            
                      />
                    </>)
                  }
                  
                })
                }
                
              </ColumnGroup>                   
            </>
          )
        }
       
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
      setBadge(e.longitud)
      setFiltrosAplicados(e)
      
      
      if(props.onAplicarFiltro)
      {
        
        props.onAplicarFiltro(e);
        
      }
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
    const onCheked =(e:any)=>{
      console.log("est es lo que retorna el check")
      console.log(e)
      if(props.tipoColumna === "grupo")
      { 
          e.columns.map((x:any)=>
          {
            if(x.tituloGrupo.toLowerCase() === e.columnGroupTitle.toLowerCase())
            {
                x.items.forEach((element:any, index:any) => {
                  if(e.keys.length > 0)
                  {
                    let seleccionado = false;
                    e.keys.forEach((elementKey:any) => {
                      if(elementKey === `0-${index}`)
                      {
                        seleccionado = true
                      }
                    });
                    if(seleccionado)
                    {
                      element.show = true
                    }else{
                      element.show = false;
                    }
                  }else{
                    element.show = false
                  }
                    
                });
                
            }                      
          }
          )
          if(e.tipo === "grupo")
          {
            console.log(e.columns)
            setColumnsGrupos(e.columns)
          }else{
            console.log(e.columns)
            setColumnsTotales(e.columns)
          }

      }
      
    }
    const obtenerTreeColumnas = (columns:any[], tipoGrid: "totales" | "grupo")=>{
      if(props.tipoColumna === "grupo")
      {
          const data = obtenerTreeData(columns)
          
          
          if(data)
          {
            
            return  (<>          
              <div className="flex fila" style={{justifyContent:"space-around"}} >
                  {
                    
                    columns.map((recorre:any, index:any)=>{
                        if(recorre.tituloGrupo.trim() !== "")
                        {
                          console.log("tree")
                          console.log(data[index].children)
                          return (<> 
  
                            <Tree 
                            onCheck={(checkedKeys)=>onCheked({keys:checkedKeys, columnGroupTitle:recorre.tituloGrupo, columns: columns, tipo:tipoGrid })}
                            defaultCheckedKeys={data[index].children.map((recorre:any)=> {
                              return recorre.key
                            })}
                            key={index}
                            treeData={[data[index]]}                        
                            checkable/>                      
                            </>)
                        }   
                      
                    })
                  }
                  
  
              </div>
             </>)
          }
         
      }
        
    }

    const obtenerTreeData = (columns:any[])=>
    { 
      let data = new Array<any>();
      if(props.tipoColumna === "grupo" )
      {
          columns.forEach((recorre:any, index:any) =>{
            
              const childrenTree = recorre.items.map((recorreItem:any, indexItem:any)=>{
                return {title:recorreItem.title.toLowerCase(), key: `0-${indexItem}` }
              })
              data.push({title: recorre.tituloGrupo.toLowerCase(), key:`0`, children:childrenTree} )
            
            
          })
      return data;
      }
      
    }

    
    const onBuscar = ()=>{
      if(props.onBuscar)
      {
        console.log(filtrosAplicadosObjeto)
        console.log({
          fechaAnterior : fechaAnterior,
          fechaActual : fechaActual,
          filtrosAplicados : filtrosAplicadosObjeto
        })
        props.onBuscar({
          fechaAnterior : fechaAnterior,
          fechaActual : fechaActual,
          filtrosAplicados : filtrosAplicadosObjeto
        });
      }
    }
    const onChangeFechaFechaAnterior = (e:Date)=>
    {
      fechaAnterior = e;
    }
    const onChangeFechaFechaActual = (e:Date)=>
    {
      fechaActual = e;
    }
    const fechas = ()=>{
      return <>
          <div className="row align-items-end">
              <div className="col-6" >
                <div>Fecha Anterior</div>
                <DatePicker format="DD/MM/yyyy" onChange={()=>onChangeFechaFechaAnterior} name="fechaAnterior"  defaultValue={moment().subtract(20, "days")} style={{ width:"200px"}} />
              </div>
              <div className="col-6">
              <div>Fecha Actual</div>
                <DatePicker format="DD/MM/yyyy" onChange={()=>onChangeFechaFechaActual} name="fechaActual" defaultValue={moment()} style={{ width:"200px"}} />
              </div>
          </div>
       </> 
    }
    
    const actionGraficos = (verGrafico:boolean):string =>{
      if(verGrafico){
        return "scale(1)"
      }else{
        return "scale(0)" 
      }
    }

   const onClickCloseGrafico =()=>{
    setOpenGrafico(!openGrafico)
    }

    return (
      <>
                <div className="tabContainer" > 
                
                <div className="row align-items-end my-3">
                  <div className="col-xl-5 col-lg-6 col-md-7 col-sm-8 col-12">
                    {
                      fechas()
                    }
                  </div>
                  <div className="col-lg-4 col-12 mt-sm-2">
                      <ButtonBG 
                                shape="round" 
                                onClick={onBuscar} 
                                style={{display: `${props.buttonFilter? "inline" : "none"}`}}  
                                text="Buscar" 
                                type="normal" 
                                icon={<ReloadOutlined />} /> 
                  <Badge 
                          count={badge} 
                          color="#bc157c"
                          className="mx-3 mt-sm-2" > 
                      <ButtonBG 
                          shape="round" 
                          style={{display: `${props.buttonFilter? "inline" : "none"}` }} 
                          onClick={onOpenModal}  
                          text="Filtrar" 
                          type="normal" 
                          icon={<FunnelPlotOutlined />} /> 
                  </Badge>
                  </div>                 
                </div>
       <div className="row">
          <div className="col-11" >
                  <Table
                    className="totales"
                    pagination={false}
                    style={{marginBottom:"40px"}}
                    scroll ={{ x:true}}  
                    dataSource={rowTotales}>
                    {
                      getColumnsGroup(columnsTotales)
                    }
                    
                  </Table>  
                   <Table
                      className="components-table-demo-nested"
                      style={{width: "100%", overflow:"inherit", overflowWrap:"anywhere"}}
                      size={"large"}
                      scroll ={{ x: true, y:200}}
                      expandable={{ expandedRowRender }}
                      dataSource={rowGrupos}>
                      {
                        getColumnsGroup(columnsGrupo)
                      }                        
                    </Table>
              <div  className="flex acciones">
                    <ButtonBG shape="round" style={{display: `${props.buttonDownload? "inline" : "none"}` }} onClick={onDowload}   text="Exportar" type="outline" icon={<DownloadOutlined />} />           
                    <ButtonBG shape="round" text="Variaciones" type="outline" icon={<FileOutlined />} /> 
                    <ButtonBG shape="round" text="Columnas" onClick={onColumnas}  type="outline" icon={<RotateRightOutlined />} /> 
             </div>
       </div>
        <div className="col-1 align-self-center">
           <ButtonBG shape="circle" onClick={()=>onClickCloseGrafico()} text="" type="normal" icon={<DoubleLeftOutlined />} /> 
        </div>
        <div  id="contenedorGraficos" className="slide-grafico" style={{transform: actionGraficos(openGrafico) }}>
              <div className="container-fluid">
              <div id="iconCloseGrafico" onClick={()=>onClickCloseGrafico()}><AiOutlineCloseCircle width={100}></AiOutlineCloseCircle></div>
                <div className="row">
                   <div className="col-12">
                   <p style={{marginLeft:"24px", fontWeight:700, color:"#160F41"}} > Gráfico De Evoluciones</p>
                   </div>
                </div>
              <div className="row">
                <div className="col-12"  style={{ height:"225px" }}> 
                  {
                      props.dataSetGraficos?  <Line data={props.dataSetGraficos?.anual}  /> :  <> </>
                    }
                    
                </div>
              </div>
              <div className="row">
                  <div className="col-12"  style={{ height:"225px" }}> 
                    {
                        props.dataSetGraficos?  <Line data={props.dataSetGraficos?.mensual}  /> :  <> </>
                      }
                      
                  </div>
              </div>
              </div>
        </div>
    </div>            
</div>
            
             {/*    <TabPane tab="Graficos" key="3">
                <div className="tabContainer flex" style={{justifyContent:"center"}}  >
                      <Tabs  defaultActiveKey="0" centered> 

                        <TabPane tab="Anual" key="0" >
                        <div className="flex"  style={{width:"1000px",justifyContent:"center", height:"500px"}}> 
                        {
                            props.dataSetGraficos?  <Line data={props.dataSetGraficos?.anual}  /> :  <> </>
                        }
                          
                        </div>
                        </TabPane>

                        <TabPane tab="Mensual" key="1" >
                        <div className="flex"  style={{width:"1000px",justifyContent:"center", height:"500px"}}> 
                        {
                            props.dataSetGraficos?  <Line data={props.dataSetGraficos?.mensual}  /> :  <> </>
                        }
                        </div>
                        </TabPane>

                      </Tabs>
                      
                      
                </div>
                </TabPane> */}
        
      
        {
          <>
          <ModalBG catalogosValues={props.filtroCatalogoValues}  filtroCatalogoCampos = {props.filtroCatalogoCampos} filtroInformacion={props.filtroInformacion} open={open} onCancel={onCancel} onOk={onOk} onClearFiltro={onClearFiltro}  />
          <ModalContentBG 
           width={500}
           onOk={onOkColumns} 
           onCancel={onCancelColumns} 
           titulo={'Columnas'} 
           content={ <> 
           <div  >
              <Tabs defaultActiveKey="0" centered >
                  <TabPane tab="total" key="0">
                  {
                     obtenerTreeColumnas(columnsTotales, "totales")
                  }
                  </TabPane>
                  <TabPane tab="grupo" key="1">
                  {
                     obtenerTreeColumnas(columnsGrupo, "grupo")
                  }
                  </TabPane>


              </Tabs>
           
              
           </div>
            
           
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
      </>
    );
    
    
        

  
}


export default GridViewBG;
