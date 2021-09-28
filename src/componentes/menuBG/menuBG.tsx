import React from 'react';
import './menuBG.css';
import { bubble as MenuBurger } from 'react-burger-menu'
import imagen from './../../jusLogo.png'
import iconOption from "./../../iconLogOut.png"
import { AiOutlineShop, AiOutlineSolution, AiOutlineUser, AiOutlineTeam, AiOutlineLogin, AiOutlineCaretDown, AiOutlineCloseCircle } from "react-icons/ai";
import { Button, Dropdown, Menu } from 'antd';
import { AppstoreOutlined, DownOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import SubMenu from 'antd/lib/menu/SubMenu';
import MenuListBg from '../../interfaces/menu';



interface MenuBGProps
{
  items: MenuListBg[]
  tituloPagina :string;
}

interface MenuBGSatate
{
  moduloSeleccionado  : string
  openMenu:boolean;
}
export default class MenuBG extends React.Component<MenuBGProps, MenuBGSatate>
{
 
 constructor(props:any)
 {   
    super(props);
    this.state ={moduloSeleccionado : "", openMenu:true}
 }
  
  retornoBackground = (comparacion:string)=>
  {
    const color = comparacion.trim().toLowerCase() === this.state.moduloSeleccionado.trim().toLowerCase()? "#bc157c": "transparent" 
    return color
  }

  actionMenu = (moduloSelecc:string, openMenu:boolean)=>
  {
    if(this.props.items.filter(x=>x.nombre.trim().toLowerCase() === moduloSelecc.trim().toLowerCase()).length> 0 && openMenu)
    {
      return "rotateY(0deg)"
    }else{
      return "rotateY(90deg)" 
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
              
              <p>Activos y Pasivos - Ahorros</p>
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
                return <a href="#" onClick={()=>this.setState({...this.state, moduloSeleccionado:recorre.nombre, openMenu:true})}  className="flex container-item" 
                style={{color:"white", fontSize:"30px", backgroundColor: this.retornoBackground(recorre.nombre) }} >
                  {recorre.icon}
                </a>
              })
            }
        </div>
        <div className="container-menu-childrens" style={{transform: this.actionMenu(this.state.moduloSeleccionado, this.state.openMenu)}} >
            <div id="iconClose" onClick={()=>this.setState({...this.state, openMenu: false})} ><AiOutlineCloseCircle></AiOutlineCloseCircle></div>
            {
              
              this.props.items.filter(x=>x.nombre.trim().toLowerCase() === this.state.moduloSeleccionado.trim().toLowerCase()).map((recorre, index)=>{
                {
                  return recorre.items.map((recorreChild:any, indexchild:any)=>{
                    return (
                      <> 
                        <a href="#" className="container-menu-childrens-children"  >
                          
                          <div className="icon" >{recorreChild.icon}</div>
                          <div>{recorreChild.nombre}</div>
                          
                        </a>
                      </>
                    )
                  })
                }
                 
              })            
                
            }
        </div>
        <div style={{marginTop:"20px", marginLeft:"260px"}} >
            
            {this.props.children}
        </div>               
    </>)
  }
}