import React from 'react';
import './menuBG.css';
import { bubble as MenuBurger } from 'react-burger-menu'
import imagen from './../../jusLogo.png'
import iconOption from "./../../iconLogOut.png"
import { AiOutlineShop, AiOutlineSolution, AiOutlineUser, AiOutlineTeam } from "react-icons/ai";
import { Dropdown, Menu } from 'antd';
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
}
export default class MenuBG extends React.Component<MenuBGProps, MenuBGSatate>
{
 
 constructor(props:any)
 {   
    super(props);
    this.state ={moduloSeleccionado : ""}
 }
  
  render()
  {
    return (<>
        <nav className="nav-bar flex row" >
          <div  className="ancho-manu flex" style={{justifyContent:"center"}} > 

            <img src= {imagen} width="40px" height="40px" ></img>
          </div>
          

        </nav>        
        <div className="container-menu ancho-manu flex colum" style={{alignItems:"center"}} >
            {
              this.props.items.map((recorre, index)=>{
                return <a href="#" onClick={()=>this.setState({...this.state, moduloSeleccionado:recorre.nombre})}  className="flex container-item" style={{color:"white", fontSize:"30px"}} >
                  {recorre.icon}
                </a>
              })
            }
        </div>
        <div className="container-menu-childrens" style={{display:this.state.moduloSeleccionado.trim() !== ""? "flex": "none"}} >
            {
              this.props.items.filter(x=>x.nombre.trim().toLowerCase() === this.state.moduloSeleccionado.trim().toLowerCase()).map((recorre, index)=>{
                {
                  return recorre.items.map((recorreChild:any, indexchild:any)=>{
                    return (
                      <> 
                        <a href="#" className="container-menu-childrens-children" >
                          
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