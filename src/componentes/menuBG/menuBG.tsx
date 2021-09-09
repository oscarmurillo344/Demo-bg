import React from 'react';
import './menuBG.css';
import { bubble as Menu } from 'react-burger-menu'
import imagen from './../../logo.png'
import { AiOutlineShop, AiOutlineSolution, AiOutlineUser, AiOutlineTeam } from "react-icons/ai";


interface MenuListBg {
  nombre :string
  icon: any
}

export default class MenuBG extends React.Component<any, any>
{
 menu : MenuListBg[] = [
   {nombre:"Clientes", icon: <AiOutlineUser></AiOutlineUser>},
   {nombre:"Creditos", icon: <AiOutlineShop></AiOutlineShop>},
   {nombre:"Roles Pagos", icon: <AiOutlineSolution></AiOutlineSolution>}
  ]
 constructor(props:any)
 {   
    super(props);
 }
 
  render()
  {
    return (<>
        <nav className="nav-bar flex row" >
          <img src= {imagen} width="230px" height="70px" ></img>
          <section className="navegacion flex row" >
                <div>
                    JEFFERSON LEONEL VELEZ LARREA
                </div>
                <div>                    
                <section className="flex row" >
                    <div> SALIR </div>                      
                </section>
                </div>
          </section>
        </nav>        
        <div className="container-menu">
          <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } >
              <div id="items-menu" style={{display:"flex", flexDirection:"column"}}>
                    {
                        this.menu.map((recorre, id)=>{
                          return (
                          <div className="flex row items" key={id}> 
                            <div>{recorre.icon}</div>
                            <div>{recorre.nombre}</div>                                                      
                        </div>                            
                        )                          
                        })
                    }
                </div>                         
          </Menu>          
          <div className="descripcion-pantalla" >
                    Clientes
          </div>
        </div>
        <div style={{marginTop:"60px"}}>
            {this.props.children}
        </div>
               
    </>)
  }
}