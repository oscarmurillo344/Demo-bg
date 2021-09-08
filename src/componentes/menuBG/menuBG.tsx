import React from 'react';
import './menuBG.css';
import { bubble as Menu } from 'react-burger-menu'



export default class MenuBG extends React.Component<any, any>
{
 
 constructor(props:any)
 {
    super(props);
 }
 
  render()
  {
    return (<>        
        <div className="container-menu">
          <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } >
              <div id="items-menu" style={{display:"flex", flexDirection:"column"}}>
                    {
                        ["Item uno ","Item numero dos","iterm numero 3"].map((recorre, id)=>{
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