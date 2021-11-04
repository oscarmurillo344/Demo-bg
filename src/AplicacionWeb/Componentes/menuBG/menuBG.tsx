import React from 'react';
import './menuBG.css';
import imagen from '../../../Imagenes/jusLogo.png';
import { AiOutlineCaretDown, AiOutlineCloseCircle, AiOutlineArrowLeft, AiFillBell } from "react-icons/ai";
import { Badge, Dropdown, Menu } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import MenuListBg from '../../Modelos/menu';

interface MenuBGProps
{
  items: MenuListBg[]  
  itemConfiguracion:MenuListBg;
  onCloseMenu? :any;
  onOpenMenu? :any 
  abrirMenu? : any;
  modulo:string;
}

interface MenuBGSatate
{
  moduloSeleccionado  : string
  itemsSleccionados :any[]
  renderItems: MenuListBg[]
  openMenu:boolean;
  addSpace:boolean;
  fechaActual:string;
  tituloItems : {titulo:string, isModulo:boolean}
  ViewPortNav:boolean
  VerNav:boolean
}

export default class MenuBG extends React.Component<MenuBGProps, MenuBGSatate>
{
 

 constructor(props:MenuBGProps)
 {   
    super(props);
    let moduloSelec = ""
    
    if(this.props.modulo.trim() === "")
    {
      const nombre = this.props.items.find(x=>x.default)?.nombre 
      moduloSelec = nombre? nombre : ""
    }else{
      const nombre = this.props.items.find(x=>x.ruta ==="/"+ this.props.modulo)?.nombre
      moduloSelec = nombre? nombre : ""
    }
    
    this.state ={moduloSeleccionado : moduloSelec, fechaActual:moment().format("YYYY-MM-DD HH:mm:ss").toString() , openMenu:false, addSpace:false, itemsSleccionados:[], renderItems:[],    
    tituloItems : {titulo:"", isModulo:false}, VerNav: false, ViewPortNav: false
  }
    this.onFechaActual()
 }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    let currentHideNav = (window.innerWidth <= 890);
    if (currentHideNav !== this.state.ViewPortNav) {
        this.setState({ViewPortNav: currentHideNav, VerNav: currentHideNav});
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }

 componentDidUpdate(propsPrev:MenuBGProps)
 {
   if(this.props.abrirMenu !== propsPrev.abrirMenu)
   {
     if(this.props.abrirMenu)
     {
       this.openMenu(this.state.moduloSeleccionado)
     }else{
      this.closeMenu() 
     }
   }
   
 }
  retornoBackground = (comparacion:MenuListBg)=>
  {
   const comparacionVal = (comparacion.nombre.trim().toLowerCase() === this.state.moduloSeleccionado.trim().toLowerCase())
   const moduloHome = this.props.items.find(x=>x.default)
   if(this.state.moduloSeleccionado.trim().toLowerCase() === "")
   {
     if(moduloHome?.nombre.trim().toLowerCase() === comparacion.nombre.trim().toLowerCase() )
     {
       return "#bc157c"
     }else{
      return "transparent" 
     }
   }else{

    if(this.state.moduloSeleccionado.trim().toLowerCase() === comparacion.nombre.trim().toLowerCase())
    {
      return comparacionVal ? "#bc157c": "transparent" 
    }else{
      return comparacionVal ? "#bc157c": "transparent" 
    }
      
   }
   
   
  }

  openMenu(nombreModuloSeleccionado:string)
  {
    return new Promise((resolve, reject)=>{
      this.setState({...this.state, addSpace:true}, ()=>{
        setTimeout(()=>{
          this.setState({...this.state, moduloSeleccionado:nombreModuloSeleccionado, openMenu:true}, 
            
            ()=> {
              if(this.props.onOpenMenu)
              {
                this.props.onOpenMenu();
              }
              
              resolve(true)
              
            })
        }, 200)
        
      })
    })
   
  }

  closeMenu()
  {
      this.setState({...this.state, openMenu: false},()=>{
          this.setState({...this.state, addSpace:false}, ()=>
          {
            if(this.props.onCloseMenu)
            {
              this.props.onCloseMenu()
            }
          }
      )    
    })
    
  }

  onClickItems = (itemsPrevios:MenuListBg[], itemSeleccionado:MenuListBg)=>
  {
    if(itemSeleccionado.items)
    {
      if(itemSeleccionado.items.length > 0)
      {
        const mismoLevel = this.esMismoNivel(itemSeleccionado);
        let itemsSeleccionadosPrevia = this.state.itemsSleccionados;
        if(mismoLevel)
        {
          
          itemsSeleccionadosPrevia.pop();
          itemsSeleccionadosPrevia.push(itemSeleccionado.nombre)
        }else{
          
          itemsSeleccionadosPrevia.push(itemSeleccionado.nombre)
        }

        const itemToRender = this.obtenerLasItem(itemsPrevios, itemsSeleccionadosPrevia, 0)
        this.setState({...this.state, renderItems:itemToRender}, ()=>
        
        {
          this.setState({...this.state, tituloItems:{titulo:itemSeleccionado.nombre, isModulo:false} })
                      
        })
          
      }else{
        
        this.closeMenu()
      }

    }else{
   
      const mismoLevel = this.esMismoNivel(itemSeleccionado);
      if(mismoLevel)
      {
        let itemsSeleccionadosPrevia = this.state.itemsSleccionados;
        itemsSeleccionadosPrevia.pop();
        itemsSeleccionadosPrevia.push(itemSeleccionado.nombre)
      }else{
        let itemsSeleccionadosPrevia = this.state.itemsSleccionados;        
        itemsSeleccionadosPrevia.push(itemSeleccionado.nombre)
      }
    
      this.closeMenu()
    }
  } 

  esMismoNivel = (itemSeleccionado:any)=>{
    let esMismoNivel = false;
    if(this.state.itemsSleccionados.length === 1)
    {
      const itemsHijosModulo = this.props.items.find(x=>x.nombre.trim().toLowerCase() === this.state.moduloSeleccionado.trim().toLowerCase())
      
      const itemsMismoNivel = itemsHijosModulo?.items?.filter(x=>x.nombre.trim().toLowerCase() === itemSeleccionado.nombre.trim().toLowerCase() )
    
      if(itemsMismoNivel)
      {
        esMismoNivel = itemsMismoNivel.length > 0 ? true:false;
      }
      

    }

    return esMismoNivel
  }
  
  onClickBackListItem = (itemsPrevios:MenuListBg[])=>{
    let itemsSeleccionadosPrevia = this.state.itemsSleccionados;
    if(this.state.itemsSleccionados.length > 1)
    {
      itemsSeleccionadosPrevia.pop()
      itemsSeleccionadosPrevia.pop()
    }else{
      itemsSeleccionadosPrevia.pop()
    }
    
    
    const firtsItem = this.props.items.find(x=>x.nombre.trim().toLowerCase() === this.state.moduloSeleccionado.trim().toLowerCase() )?.items
    const itemToRender = this.obtenerLasItem(firtsItem? firtsItem : [], itemsSeleccionadosPrevia, 0)
    this.setState({...this.state, renderItems:itemToRender}, ()=>
    
    {
      const titulo = itemsSeleccionadosPrevia.length > 0 ? itemsSeleccionadosPrevia[itemsSeleccionadosPrevia.length] : this.state.moduloSeleccionado;

      this.setState({...this.state, tituloItems:{titulo: titulo, isModulo:this.state.itemsSleccionados.length === 1 ? false: true} }, ()=>{
        
      })
                  
    })
  }
  obtenerLasItem = (listaItems:MenuListBg[], itemsSeleccionados:any, iteracion:number):MenuListBg[]=>{
      let itera = iteracion;
      const itemSelecc = itemsSeleccionados[itera]
      if(itera > itemsSeleccionados.length - 1)
      {
        return listaItems;
      }else{
        if(listaItems.length  === 0)
        {
          return listaItems;
        }else{
          
            const retorno = listaItems.find(x=>x.nombre.trim().toLowerCase() === itemSelecc.trim().toLowerCase())
            itera ++;
            return this.obtenerLasItem(retorno?.items? retorno.items : [], itemsSeleccionados, itera )
          
        }
      }
      
  }
  onClickModulo = (nombre:string)=>
  {
    const moduloSelec = this.state.moduloSeleccionado
    const objetoSelc = this.props.items.find(x=>x.nombre.trim().toLowerCase() === nombre.trim().toLowerCase());
    if(moduloSelec.trim().toLowerCase() !== nombre.trim().toLowerCase() || this.state.itemsSleccionados.length === 0)
    { 
      
      const render = this.props.items.find(x=>x.nombre.trim().toLowerCase() === nombre.trim().toLowerCase())?.items
    

      
      this.setState({...this.state, renderItems: render? render : [], itemsSleccionados:[]  }, ()=>{
        this.setState({...this.state, tituloItems:{titulo:nombre, isModulo:true} }, ()=>{
          
          if(objetoSelc?.default)
          {
            this.setState({...this.state, moduloSeleccionado:nombre, openMenu:false}, ()=>{
              this.closeMenu()
            })            
            
          }else{
            this.openMenu(nombre)
          }
          
        })
        
      })
    }else{
            
      if(objetoSelc?.default)
      {
        this.closeMenu()
      }else{
        this.openMenu(nombre)
      }
      
    }        
  }


  onClickCloseMenu = ()=>{
      this.closeMenu();
  }

  actionMenu = (moduloSelecc:string, openMenu:boolean)=>
  {
    if(this.props.items.filter(x=>x.nombre.trim().toLowerCase() === moduloSelecc.trim().toLowerCase()).length> 0 && openMenu)
    {
      return "scale(1)"
    }else{
      return "scale(0)" 
    }
  }

 
  goTo = (objeto:MenuListBg, itemsSeleccionado:any[]=[])=>
  { 
    if(objeto.items)
    {
      return window.location
    }else{
      if(objeto.ruta)
      { 
        return objeto.ruta
        
      }else{
        return "/nofoundit"
      }
    }
  }
  
  getRutaCompletaActual = ()=>{
    let ruta = this.state.moduloSeleccionado
    if(this.state.itemsSleccionados.length > 0)
    {
      ruta = ruta + " / "
    }
    this.state.itemsSleccionados.forEach((recorre, index)=>{
        if(index === this.state.itemsSleccionados.length - 1)
        {
          ruta  = ruta + recorre
        }else{
          ruta  = ruta + recorre +" / "
        }
        
        
    })

    return ruta
  }
  onFechaActual = ()=>{
    setInterval(() => {
      this.setState({...this.state, fechaActual:moment().format("YYYY-MM-DD HH:mm:ss").toString() })
      
    }, 1000);       
  }
  ToogleLateral(): void{
    this.setState({ ViewPortNav: !this.state.ViewPortNav, VerNav: !this.state.VerNav}, ()=> this.onClickCloseMenu())
  }
  
  render(): JSX.Element
  {
    return (<>
        <nav className="nav-bar row justify-content-md-between fixed" >
          <div className="col-lg-6 col-sm-8 ml-3 pantalla" >
            <div className="row mt-3">
              <div className="col-1 mr-2">
                <a onClick={() => this.ToogleLateral()} >
                <img src= {imagen} width="40px" height="40px" ></img>
                </a>
              </div>
              <div className="col-10 col-md-7 col-sm-10">
                <p style={{fontSize:"20px", letterSpacing:"4px", margin:"0"}} >NEO FINANCIAL</p>
                <p id="ruta" style={{color:"white", margin:"0"}} >  {this.getRutaCompletaActual()} </p>
              </div>
            </div>
          </div>

         
          <div className="col-lg-4 col-sm-3 d-sm-block d-none" >
            <div className="row align-items-center justify-content-lg-start justify-content-center">
              <div className="col-xl-5 col-lg-2 col-md-1"></div>
              <div className="col-xl-4 col-lg-5 d-none d-lg-block" style={{color:"white", height:"100%"}}>
                <p style={{ margin:"0px", fontSize:"12px" , fontWeight:100}} >Leonel Velez Larrea </p>
                <p style={{ margin:0,  fontSize:"12px", fontWeight:100}}>{this.state.fechaActual}</p>
              </div>
              <div className="col-xl-1 col-md-2 col-1">
                <Badge  count={1} color="#bc157c" >
                    <div style={{ fontSize:"24px", height:"100%", color:"white"}}>
                          <AiFillBell  />
                    </div> 
                </Badge>
              </div>
              <div className="col-xl-1 col-md-2 ml-sm-2 col-1" >
                  <Dropdown  placement="bottomRight" arrow overlay={
                  <Menu>
                  <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="#">
                      Salir
                    </a>
                  </Menu.Item>
                  <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="#">
                      Perfil
                    </a>
                  </Menu.Item>
                </Menu>
              }>
                    <div className="boton p-2" ><AiOutlineCaretDown></AiOutlineCaretDown></div>
              </Dropdown>
            </div>
          </div>
        </div>
    </nav>        
        <div className={this.state.VerNav ? "container-menu ancho-manu flex columna salida" : 
                                   "container-menu ancho-manu flex columna entrada"} >
            {
              this.props.items.map((recorre, index)=>{
                return <Link to= {this.goTo(recorre) } onClick={()=>this.onClickModulo(recorre.nombre)}  className="flex container-item" 
                style={{color:"white", fontSize:"30px", backgroundColor: this.retornoBackground(recorre), 
                        marginTop: (recorre.nombre == 'Configuraciones') ? '180px': '0' }} >
                  {recorre.icon}
                </Link>
              })

            }
             
        </div>
        <div className="container-menu-childrens sombra" style={{transform: this.actionMenu(this.state.moduloSeleccionado, this.state.openMenu) }} >
            
           <div id="iconClose" onClick={()=>this.onClickCloseMenu()}   ><AiOutlineCloseCircle></AiOutlineCloseCircle></div>
            <div id="tituloItem" > <div className="icon" style={{visibility:this.state.tituloItems.isModulo? "hidden" : "visible"}}  onClick={()=>this.onClickBackListItem(this.state.renderItems)} > <AiOutlineArrowLeft> </AiOutlineArrowLeft> </div>  <p> {this.state.tituloItems.titulo}</p></div>
            
            {
              
               this.state.renderItems.map((recorreChild:any, indexchild:any)=>{
                return (
                  <> 
                    <Link to={this.goTo(recorreChild)} key={indexchild} 
                    onClick={()=>this.onClickItems(this.state.renderItems,recorreChild)} 
                    className="container-menu-childrens-children"  >
                      
                      <div className="icon" >{recorreChild.icon}</div>
                      <div>{recorreChild.nombre}</div>
                      
                    </Link>
                  </>
                )
              }) 
                 
            })          
        </div>
           <div id="content"  style={{marginTop:"80px", marginLeft:this.state.VerNav ? "0px" : ""}} >
            {this.props.children}
          </div>
    </>)
  }
}