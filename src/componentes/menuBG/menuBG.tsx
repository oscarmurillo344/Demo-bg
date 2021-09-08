import React from 'react';
import './menuBG.css';
import { bubble as Menu } from 'react-burger-menu'
import imagen from './../../logo.png'


export default class MenuBG extends React.Component<any, any>
{
 
 constructor(props:any)
 {
    super(props);
 }
 
  render()
  {
    return (<>
        <nav className="nav-bar" >
          <img src= {imagen} width="200px" className="logo" ></img>
        </nav>        
        <div className="container-menu">
          <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } >
              <div id="items-menu" style={{display:"flex", flexDirection:"column"}}>
                    {
                        ["Clientes","Creditos","Roles Pagos"].map((recorre, id)=>{
                            return ( <p> {recorre} </p>);
                        })
                    }
                </div>                         
          </Menu>          
          <div className="descripcion-pantalla" >
                    Clientes
          </div>
        </div>
               
    </>)
  }
}