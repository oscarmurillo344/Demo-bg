import React from 'react';
import './menuBG.css';
import { bubble as MenuBurger } from 'react-burger-menu'
import imagen from './../../jusLogo.png'
import iconOption from "./../../iconLogOut.png"
import { AiOutlineShop, AiOutlineSolution, AiOutlineUser, AiOutlineTeam, AiOutlineLogin, AiOutlineCaretDown, AiOutlineCloseCircle, AiOutlineArrowLeft } from "react-icons/ai";
import { Button, Dropdown, Menu } from 'antd';
import { AppstoreOutlined, DownOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import SubMenu from 'antd/lib/menu/SubMenu';
import MenuListBg from '../../interfaces/menu';



interface MenuBGProps
{
  items: MenuListBg[]  
}

interface MenuBGSatate
{
  moduloSeleccionado  : string
  itemsSleccionados :any[]
  renderItems: MenuListBg[]
  openMenu:boolean;
  addSpace:boolean;
  tituloItems : {titulo:string, isModulo:boolean}
}
export default class MenuBG extends React.Component<MenuBGProps, MenuBGSatate>
{
 
 constructor(props:any)
 {   
    super(props);
    this.state ={moduloSeleccionado : "", openMenu:false, addSpace:false, itemsSleccionados:[], renderItems:[],
    tituloItems : {titulo:"", isModulo:false}
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
      return comparacionVal ? "#bc157c": "transparent" 
   }
   
   
  }

  openMenu(nombreModuloSeleccionado:string)
  {
    return new Promise((resolve, reject)=>{
      this.setState({...this.state, addSpace:true}, ()=>{
        setTimeout(()=>{
          this.setState({...this.state, moduloSeleccionado:nombreModuloSeleccionado, openMenu:true}, ()=>resolve(true))
        }, 200)
        
      })
    })
   
  }

  closeMenu()
  {
    return new Promise((resolve, reject)=>{
      this.setState({...this.state, openMenu: false},()=>{
        setTimeout(()=>{
          this.setState({...this.state, addSpace:false}, ()=>resolve(true))    
        }, 200)
      })
    })
    
  }

  onClickItems = (itemsPrevios:MenuListBg[], itemSeleccionado:MenuListBg)=>
  {
    if(itemSeleccionado.items)
    {
      if(itemSeleccionado.items.length > 0)
      {
          this.closeMenu().then(()=>{
            let itemsSeleccionadosPrevia = this.state.itemsSleccionados;
          itemsSeleccionadosPrevia.push(itemSeleccionado.nombre)

          const itemToRender = this.obtenerLasItem(itemsPrevios, itemsSeleccionadosPrevia, 0)
          console.log(itemToRender)
          this.setState({...this.state, renderItems:itemToRender}, ()=>
          
          {
            this.setState({...this.state, tituloItems:{titulo:itemSeleccionado.nombre, isModulo:false} }, ()=>{
              this.openMenu(this.state.moduloSeleccionado)
            })
                        
          })
          })
          
      }else{
        this.closeMenu()
      }

    }else{
      this.closeMenu()
    }
  }
  onClickBackListItem = (itemsPrevios:MenuListBg[])=>{
    this.closeMenu().then(()=>{
    let itemsSeleccionadosPrevia = this.state.itemsSleccionados;
    itemsSeleccionadosPrevia.pop()
    const firtsItem = this.props.items.find(x=>x.nombre.trim().toLowerCase() === this.state.moduloSeleccionado.trim().toLowerCase() )?.items
    const itemToRender = this.obtenerLasItem(firtsItem? firtsItem : [], itemsSeleccionadosPrevia, 0)
    console.log(itemToRender)
    this.setState({...this.state, renderItems:itemToRender}, ()=>
    
    {
      const titulo = itemsSeleccionadosPrevia.length > 0 ? itemsSeleccionadosPrevia[itemsSeleccionadosPrevia.length] : this.state.moduloSeleccionado;

      this.setState({...this.state, tituloItems:{titulo: titulo, isModulo:this.state.itemsSleccionados.length === 1 ? false: true} }, ()=>{
        this.openMenu(this.state.moduloSeleccionado)
      })
                  
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
    if(moduloSelec.trim().toLowerCase() !== nombre.trim().toLowerCase())
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

 

  
  render()
  {
    return (<>
        <nav className="nav-bar flex row" >
          <div  className="ancho-manu flex" style={{justifyContent:"center"}} > 

            <img src= {imagen} width="40px" height="40px" ></img>
          </div>
          <div className='pantalla' >
              
              <p>{this.state.tituloItems.titulo}</p>
          </div>
          <div className="opciones" >
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
                <div   className="flex boton" ><AiOutlineCaretDown></AiOutlineCaretDown></div>
          </Dropdown>
          </div>
        </nav>        
        <div className="container-menu ancho-manu flex colum" style={{alignItems:"center"}} >
            {
              this.props.items.map((recorre, index)=>{
                return <a href="#" onClick={()=>this.onClickModulo(recorre.nombre)}  className="flex container-item" 
                style={{color:"white", fontSize:"30px", backgroundColor: this.retornoBackground(recorre) }} >
                  {recorre.icon}
                </a>
              })
            }
        </div>
        <div className="container-menu-childrens" style={{transform: this.actionMenu(this.state.moduloSeleccionado, this.state.openMenu)}} >
            
            <div id="iconClose" onClick={()=>this.onClickCloseMenu()}   ><AiOutlineCloseCircle></AiOutlineCloseCircle></div>
            <div id="tituloItem" > <div className="icon" style={{visibility:this.state.tituloItems.isModulo? "hidden" : "visible"}}  onClick={()=>this.onClickBackListItem(this.state.renderItems)} > <AiOutlineArrowLeft> </AiOutlineArrowLeft> </div>  <p> {this.state.tituloItems.titulo}</p></div>
            
            {
              
               this.state.renderItems.map((recorreChild:any, indexchild:any)=>{
                return (
                  <> 
                    <a href="#" key={indexchild} onClick={()=>this.onClickItems(this.state.renderItems,recorreChild)} className="container-menu-childrens-children"  >
                      
                      <div className="icon" >{recorreChild.icon}</div>
                      <div>{recorreChild.nombre}</div>
                      
                    </a>
                  </>
                )
              }) 
                 
            })            
                            
        </div>
        <div id="content"  style={{marginTop:"20px", marginLeft: this.state.addSpace? "260px": "70px"}} >
            
            {this.props.children}
        </div>               
    </>)
  }
}