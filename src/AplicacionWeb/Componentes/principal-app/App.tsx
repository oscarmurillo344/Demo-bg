import './App.css';
import 'antd/dist/antd.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AiOutlineSetting } from 'react-icons/ai';
import Loader from 'react-loader-spinner';
import menu from "../../../LogicaWeb/data/menu";
import AhorroResumen from '../../Componentes/ahorros/resumen/ahorrosResumen';
import Home from '../home/home';
import MenuListBg from '../../Modelos/menu';
import MenuBG from '../menuBG/menuBG';
import React from 'react';

interface StatePrincipal {
  menuAbierto:boolean
  SpinnerAbierto:boolean
  FondoMenuAbierto:boolean
}

export default class App extends React.Component<any,StatePrincipal> {

   menus : MenuListBg[] = menu;

  constructor(props:any){
    super(props)
    this.state = {
      menuAbierto: false,
      SpinnerAbierto: false,
      FondoMenuAbierto: false
    }  
  }

  
   getPage = (pagina:string, props:any)=>{

    switch(pagina)
    {
      case "CuentaAhorrosResumen":
          return <AhorroResumen onReady={()=>this.onReadyComponent()} menuAbierto={this.state.menuAbierto} {...props} />
        
      case "CuentaAhorrosDetalles":
        return <AhorroResumen onReady={()=>this.onReadyComponent()} menuAbierto={this.state.menuAbierto} {...props} />
        
      case "NotFoundIt":
        return  <p>We are working in it! </p>
        
      case 'Home':
        return  <Home onReady={()=>this.onReadyComponent()} {...props}  />
    }
    return <> </>
  }
  
  
   onCloseMenu = ()=>{
    this.setState({
      ...this.state,
      menuAbierto:false,
      FondoMenuAbierto: false
    })
  }

   onOpenMenu = ()=>{
    this.setState({
      ...this.state,
      menuAbierto:true,
      FondoMenuAbierto: true
    })
  }

   onReadyComponent = ()=>{
    this.setState({
      ...this.state,
      SpinnerAbierto:true
    }, ()=>{
      setTimeout(() => {
        this.setState({
          ...this.state,
          SpinnerAbierto:false
        })
      }, 1000);
    })       
  }

   getModuloRuta = ()=>{
    let locacion = window.location
    let moduloRuta = locacion.pathname.substr(1, locacion.pathname.length)
    const indexBackSlash = moduloRuta.indexOf("/");

    moduloRuta = moduloRuta.substr(0, indexBackSlash === -1? moduloRuta.length: indexBackSlash)
    return moduloRuta;
  }
  
  render(): JSX.Element{
    return  (<>
      <div className="loading" style={{display: this.state.SpinnerAbierto ? "block": "none"}} >
      <div id="item-loading" >
      <Loader
          type="Audio"
          color="white"
          height={140}
          visible = {this.state.SpinnerAbierto}
          width={140}
          
        />
      </div>
      
      </div>
      <div className="fondoMenu" onClick={this.onCloseMenu} style={{display: this.state.FondoMenuAbierto ? "block": "none"}} > </div>          
      <section>
      
  
      <BrowserRouter>
        <Switch>                        
        <MenuBG 
        itemConfiguracion={{
            nombre:"Configuraciones", 
            icon: <AiOutlineSetting></AiOutlineSetting>,
            items: [{nombre:"opcion1"}, {nombre:"opcion2"}]
          }} 
        items={this.menus} 
        modulo={this.getModuloRuta()} 
        abrirMenu={this.state.menuAbierto} 
        onCloseMenu={()=>this.onCloseMenu()} 
        onOpenMenu={()=>this.onOpenMenu()}  >
  
          <Route exact path='/' render={(props)=>(this.getPage('Home', props))}></Route> 
          <Route exact path='/home' render={(props)=>(this.getPage('Home', props))}></Route> 
          <Route exact path='/activopasivo/ahorros/detalles' render={(props)=>(this.getPage('CuentaAhorrosDetalles', props))}></Route> 
          <Route exact path='/activopasivo/ahorros/resumen' render={(props)=>(this.getPage('CuentaAhorrosResumen', props))}></Route>
          <Route exact path='/nofoundit' render={(props)=>(this.getPage('NotFoundIt', props))}></Route> 
        </MenuBG>                
        </Switch>
      </BrowserRouter>  
              
    </section>    
  </>)
  }
 
}