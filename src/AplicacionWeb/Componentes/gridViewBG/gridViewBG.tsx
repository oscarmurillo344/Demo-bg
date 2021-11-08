import 'antd/dist/antd.css';
import './gridViewBG.css'
import {Line} from 'react-chartjs-2'
import { Table, Tabs, Tree, DatePicker, Dropdown, Divider, Tag } from 'antd';
import { DoubleLeftOutlined, DownloadOutlined, FileExcelOutlined, FileOutlined, FilePdfOutlined, FunnelPlotOutlined, ReloadOutlined, RotateRightOutlined } from '@ant-design/icons';
import ButtonBG from '../buttonBG/buttonBG';
import ColumnGroup from 'rc-table/lib/sugar/ColumnGroup';
import Column from 'rc-table/lib/sugar/Column';
import ModalBG from '../modalBG/modalBG';
import moment, { Moment } from 'moment';
import ModalContentBG from '../modalContentBG/modalContentBG';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ColumnasGrupo from '../../Modelos/columnasGrupos';
import { catalogosCampos, catalogosValues, informacionFiltros } from '../../Modelos/filtros';
import React from 'react';
import { ExpandableConfig } from 'rc-table/lib/interface';
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

interface FiltroAplicado {
  filtros:Array<any>
  longitud:number
}
interface GridViewBGState {
  openDropDown:boolean
  openModalContent:boolean
  openModalColumn:boolean
  openGrafico:boolean
  columnsTotales:any
  columnsGrupo:any
  rowTotales:any
  rowGrupos:any
  filtrosAplicadosObjeto:FiltroAplicado
}


export default class GridViewBG extends React.Component<GridViewBGProps,GridViewBGState>{
 
   fechaAnterior = new Date(moment().subtract(20, "days").toDate());
   fechaActual = new Date(moment().toDate());
  
  constructor(props:GridViewBGProps){
    super(props)
    this.state = {
      openDropDown:false,
      openModalContent: false,
      openModalColumn: false,
      openGrafico: false,
      columnsTotales: this.props.columnsTotal,
      columnsGrupo: this.props.columns,
      rowTotales: this.props.rowsTotal,
      rowGrupos: this.props.rows,
      filtrosAplicadosObjeto: {
        filtros:[],
        longitud: 0
      }
    }
  }

  componentDidUpdate(Prevprops:GridViewBGProps){
      if(Prevprops.onLoad)
      {
        this.props.onLoad({
          fechaAnterior : this.fechaAnterior,
          fechaActual : this.fechaActual,
          filtrosAplicados : this.state.filtrosAplicadosObjeto
        });
        console.log(this.state.filtrosAplicadosObjeto.filtros)
      }
      if(Prevprops.rowsTotal != this.props.rowsTotal){
        this.setState({
          ...this.state,
          rowTotales: this.props.rowsTotal
        })
      }

      if(Prevprops.rows != this.props.rows){
        this.setState({
          ...this.state,
          rowGrupos: this.props.rows
        })
      }
  } 
 
   getColumnsGroup = (columns:any[])=>{
    if(this.props.tipoColumna === "grupo")
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
                return recorreChildre  
                })
                }
                
              </ColumnGroup>                   
            </>
          )
        }
       return recorre
      })
    }else{
      return this.props.columns.map((recorre:any)=>{
        return (<> 
          <Column   
           title={recorre.title} dataIndex={recorre.dataIndex} key={recorre.key} 
            width={recorre.width} render={recorre}                            
          />
        </>)
      })
    }
    
  }

  onOpenModal = ()=>{
      this.setState({
        ...this.state,
        openDropDown: !this.state.openDropDown
      })
  }
   onOkModalDownload = ()=>{
    this.setState({
      ...this.state,
      openModalContent: !this.state.openDropDown
    })
  } 
    onCancelModalDownload = ()=>{
      this.setState({
        ...this.state,
        openModalContent: !this.state.openDropDown
      })
    }

   onOk = (e:FiltroAplicado)=>
    { 
      this.setState({
        ...this.state,
        openDropDown: false,
        filtrosAplicadosObjeto: e
      })

      if(this.props.onAplicarFiltro)
      {
        this.props.onAplicarFiltro(e);
      }
    }

    onCancel = ()=>{
      this.setState({
        ...this.state,
        openDropDown: false
      })
    }

    onClearFiltro = ()=>{
      this.setState({
        ...this.state,
        openDropDown: false
      })
    }

    onDowload =()=>
    {
      this.setState({
        ...this.state,
        openModalContent: false
      })
    }

    onColumnas =()=>{
      this.setState({
        ...this.state,
        openModalColumn: true
      })
    }

    onOkColumns = ()=>{
      this.setState({
        ...this.state,
        openModalColumn: false
      })
    }

    onCancelColumns = ()=>{
      this.setState({
        ...this.state,
        openModalColumn: false
      })
    }
    
    onCheked =(e:any)=>{
      if(this.props.tipoColumna === "grupo")
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
            return x                     
          }
          )
          if(e.tipo === "grupo")
          {
            this.setState({
              ...this.state,
              columnsGrupo: e.columns
            })
          }else{
            this.setState({
              ...this.state,
              columnsTotales: e.columns
            })
          }

      }
      
    }

    obtenerTreeColumnas = (columns:any[], tipoGrid: "totales" | "grupo")=>{
      if(this.props.tipoColumna === "grupo")
      {
          const data = this.obtenerTreeData(columns)
          
          
          if(data)
          {
            
            return  (<>          
              <div className="flex fila" style={{justifyContent:"space-around"}} >
                  {
                    
                    columns.map((recorre:any, index:any)=>{
                        if(recorre.tituloGrupo.trim() !== "")
                        {
                          return (<> 
  
                            <Tree 
                            onCheck={(checkedKeys)=>this.onCheked({keys:checkedKeys, columnGroupTitle:recorre.tituloGrupo, columns: columns, tipo:tipoGrid })}
                            defaultCheckedKeys={data[index].children.map((recorre:any)=> {
                              return recorre.key
                            })}
                            key={index}
                            treeData={[data[index]]}                        
                            checkable/>                      
                            </>)
                        }   
                      return recorre
                    })
                  }
                  
  
              </div>
             </>)
          }
         
      }
        
    }

    obtenerTreeData = (columns:any[])=>
    { 
      let data = new Array<any>();
      if(this.props.tipoColumna === "grupo" )
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

    
    onBuscar = ()=>{
      if(this.props.onBuscar)
      {
        this.props.onBuscar({
          fechaAnterior : this.fechaAnterior,
          fechaActual : this.fechaActual,
          filtrosAplicados : this.state.filtrosAplicadosObjeto
        });
      }
    }

    onChangeFechaFechaAnterior = (e:Date)=>
    {
      this.fechaAnterior = e;
    }

    onChangeFechaFechaActual = (e:Date)=>
    {
      this.fechaActual = e;
    }

    fechas = ()=>{
      return <>
          <div className="row align-items-end">
              <div className="col-sm-6 " >
                <div>Fecha Anterior</div>
                <DatePicker format="DD/MM/yyyy" onChange={(fecha:any)=>this.onChangeFechaFechaAnterior(fecha)} name="fechaAnterior"  defaultValue={moment().subtract(20, "days")} style={{ width:"200px"}} />
              </div>
              <div className="col-sm-6">
              <div>Fecha Actual</div>
                <DatePicker format="DD/MM/yyyy" onChange={(fecha:any)=>this.onChangeFechaFechaActual(fecha)} name="fechaActual" defaultValue={moment()} style={{ width:"200px"}} />
              </div>
          </div>
       </> 
    }
    
    BorrarTag(e:any): any{
    }

    FiltrosAplicados = () => {
      const { filtros } = this.state.filtrosAplicadosObjeto;
      return (<> 
      <div className="row no-gutters">
       <div className="col-1">
           <h4>Filtros aplicados: </h4>
       </div>
       <div className="col-10">
         {<div style={{display: filtros.length > 0 ? "flex":"none" }}>
            <Tag  color="#bc157c" closable onClose={(e) => this.BorrarTag(e)}>
                Region: "sierra", "costa"
              </Tag>
            <Tag color="#bc157c" closable onClose={(e) => this.BorrarTag(e)}>
                  Empresa: "Economic"
              </Tag>
        </div>}
       </div>
      </div>
      </>)
    }

  actionGraficos = (verGrafico:boolean):string =>{
    if(verGrafico){
      return "scale(1)"
    }else{
      return "scale(0)" 
    }
  }

  expandedRowRender(e:any){
    const retorno = this.props.onOpenDetalle(e)
    return <Table scroll={{y:340}} dataSource={retorno.rows} pagination={false} columns={retorno.columns} >    </Table>;
  };

  onClickCloseGrafico =()=>{
    this.setState({...this.state, openGrafico: !this.state.openGrafico})
  }

  render(): JSX.Element{
    return (
      <>
       <div className="tabContainer" > 
                
                <div className="row align-items-end my-3">
                  <div className="col-xl-5 col-lg-6 col-md-7 col-sm-8 col-12">
                    {
                      this.fechas()
                    }
                  </div>
                  <div className="col-lg-4 col-12 mt-2">
                      <ButtonBG 
                                shape="round" 
                                onClick={this.onBuscar()} 
                                style={{display: `${this.props.buttonFilter? "inline" : "none"}`}}  
                                text="Buscar" 
                                type="normal" 
                                icon={<ReloadOutlined />} /> 
             <Dropdown placement="bottomRight" visible={this.state.openDropDown} trigger={['click']} overlay={<>
              <ModalBG catalogosValues={this.props.filtroCatalogoValues}  filtroCatalogoCampos = {this.props.filtroCatalogoCampos} filtroInformacion={this.props.filtroInformacion} open={this.state.openDropDown} onCancel={()=>this.onCancel()} onOk={(e:FiltroAplicado)=>this.onOk(e)} onClearFiltro={()=>this.onClearFiltro()}  />
                  </>}>
                    <ButtonBG 
                          shape="round" 
                          style={{display: `${this.props.buttonFilter? "inline" : "none"}`, marginLeft:"5%"}} 
                          onClick={()=>this.onOpenModal()}  
                          text="Filtrar" 
                          type="normal"
                          icon={<FunnelPlotOutlined />} /> 
              </Dropdown>
                
                  </div>                 
           </div>
           <Divider style={{margin: "12px 0"}} />
           {
             this.FiltrosAplicados()
           }
           <Divider style={{margin: "12px 0"}} />
       <div className="row">
          <div className="col-11" >
                  <Table
                    className="totales"
                    pagination={false}
                    style={{marginBottom:"40px"}}
                    scroll ={{ x:true}}  
                    dataSource={this.state.rowTotales}>
                    {
                      this.getColumnsGroup(this.state.columnsTotales)
                    }
                    
                  </Table>  
                   <Table
                      className="components-table-demo-nested"
                      style={{width: "100%", overflow:"inherit", overflowWrap:"anywhere"}}
                      size={"large"}
                      scroll ={{ x: true, y:200}}
                      expandable={{expandedRowRender: (e:any)=>this.expandedRowRender(e)}}
                      dataSource={this.state.rowGrupos}>
                      {
                        this.getColumnsGroup(this.state.columnsGrupo)
                      }                        
                    </Table>
              <div  className="flex acciones">
                    <ButtonBG shape="round" style={{display: `${this.props.buttonDownload? "inline" : "none"}` }} onClick={()=>this.onDowload()}   text="Exportar" type="outline" icon={<DownloadOutlined />} />           
                    <ButtonBG shape="round" text="Variaciones" type="outline" icon={<FileOutlined />} /> 
                    <ButtonBG shape="round" text="Columnas" onClick={()=>this.onColumnas()}  type="outline" icon={<RotateRightOutlined />} /> 
             </div>
       </div>
        <div className="col-1 align-self-center">
           <ButtonBG shape="circle" onClick={()=>this.onClickCloseGrafico()} text="" type="normal" icon={<DoubleLeftOutlined />} /> 
        </div>
        <div  id="contenedorGraficos" className="slide-grafico" style={{transform: this.actionGraficos(this.state.openGrafico) }}>
              <div className="container-fluid">
              <div id="iconCloseGrafico" onClick={()=>this.onClickCloseGrafico()}><AiOutlineCloseCircle width={100}></AiOutlineCloseCircle></div>
                <div className="row">
                   <div className="col-12">
                   <p style={{marginLeft:"24px", fontWeight:700, color:"#160F41"}} > Gráfico De Evoluciones</p>
                   </div>
                </div>
              <div className="row">
                <div className="col-12"  style={{ height:"225px" }}> 
                  {
                      this.props.dataSetGraficos?  <Line data={this.props.dataSetGraficos?.anual}  /> :  <> </>
                  }
                </div>
              </div>
              <div className="row">
                  <div className="col-12"  style={{ height:"225px" }}> 
                    {
                        this.props.dataSetGraficos?  <Line data={this.props.dataSetGraficos?.mensual}  /> :  <> </>
                    }
                  </div>
              </div>
              </div>
        </div>
    </div>            
</div>      
        {
          <>
          <ModalContentBG 
           width={500}
           onOk={()=>this.onOkColumns()} 
           onCancel={()=>this.onCancelColumns()} 
           titulo={'Columnas'} 
           content={ <> 
              <Tabs defaultActiveKey="0" centered >
                  <TabPane tab="total" key="0">
                  {
                     this.obtenerTreeColumnas(this.state.columnsTotales, "totales")
                  }
                  </TabPane>
                  <TabPane tab="grupo" key="1">
                  {
                     this.obtenerTreeColumnas(this.state.columnsGrupo, "grupo")
                  }
                  </TabPane>
              </Tabs>
           </> }
           visible={this.state.openModalColumn}></ModalContentBG>

           
          <ModalContentBG 
           width={340}
           onOk={()=>this.onOkModalDownload()} 
           onCancel={()=>this.onCancelModalDownload()} 
           titulo={'Descargar'} 
           content={ <> 
              <div className="flex" style={{width:"100%", justifyContent:"space-around"}} >
              <ButtonBG shape="round" text="Excel" type="outline" icon={<FileExcelOutlined />} /> 
              <ButtonBG shape="round" text="PDF" type="outline" icon={<FilePdfOutlined />} /> 
              </div>
              

           </> }
           visible={this.state.openModalContent}></ModalContentBG>
          </>
          
        }
      </>
    )
  }          
}
