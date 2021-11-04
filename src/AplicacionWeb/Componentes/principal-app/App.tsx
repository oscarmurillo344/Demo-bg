import './App.css';
import 'antd/dist/antd.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import Loader from 'react-loader-spinner';
import menu from "../../../LogicaWeb/data/menu";
import AhorroResumen from '../../Componentes/ahorros/resumen/ahorrosResumen';
import Home from '../home/home';
import MenuListBg from '../../Modelos/menu';
import MenuBG from '../menuBG/menuBG';

function App() {
  const menus : MenuListBg[] = menu;
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [openSpinner, setOpenSpinner] = useState(true);
  const [openFondoMenu, setOpenFondoMenu] = useState(false);
  
  const getPage = (pagina:string, props:any)=>{

    switch(pagina)
    {
      case "CuentaAhorrosResumen":
          return <AhorroResumen onReady={onReadyComponent} menuAbierto={menuAbierto} {...props} />
        
      case "CuentaAhorrosDetalles":
        return <AhorroResumen onReady={onReadyComponent} menuAbierto={menuAbierto} {...props} />
        
      case "NotFoundIt":
        return  <p>We are working in it! </p>
        
      case 'Home':
        return  <Home onReady={onReadyComponent} {...props}  />
    }
    return <> </>

  }
  
  useEffect(()=>{
    setTimeout(() => {
      setOpenSpinner(false)
    }, 1000);   
  }, [])

  
  const onCloseMenu = ()=>{
    setMenuAbierto(false)
    setOpenFondoMenu(false)
  }

  const onOpenMenu = ()=>{
    setMenuAbierto(true)
    setOpenFondoMenu(true)
  }

  const onReadyComponent = ()=>{
    setOpenSpinner(true)
    setTimeout(() => {
      setOpenSpinner(false)
    }, 1000);   
  }

  const getModuloRuta = ()=>{
    let locacion = window.location
    let moduloRuta = locacion.pathname.substr(1, locacion.pathname.length)
    const indexBackSlash = moduloRuta.indexOf("/");

    moduloRuta = moduloRuta.substr(0, indexBackSlash === -1? moduloRuta.length: indexBackSlash)
    return moduloRuta;
  }
  
  return (<>
    <div className="loading" style={{display: openSpinner? "block": "none"}} >
    <div id="item-loading" >
    <Loader
        type="Audio"
        color="white"
        height={140}
        visible = {openSpinner}
        width={140}
        
      />
    </div>
    
    </div>
    <div className="fondoMenu" onClick={onCloseMenu} style={{display: openFondoMenu? "block": "none"}} > </div>          
    <section>
    

    <BrowserRouter>
      <Switch>                        
      <MenuBG itemConfiguracion={{
       nombre:"Configuraciones", 
       icon: <AiOutlineSetting></AiOutlineSetting>,
       items: [{nombre:"opcion1"}, {nombre:"opcion2"}]
   }} items={menus} modulo={getModuloRuta()} abrirMenu={menuAbierto} onCloseMenu={onCloseMenu} onOpenMenu={onOpenMenu}  >

        <Route exact path='/' render={(props)=>(getPage('Home', props))}></Route> 
        <Route exact path='/home' render={(props)=>(getPage('Home', props))}></Route> 
        <Route exact path='/activopasivo/ahorros/detalles' render={(props)=>(getPage('CuentaAhorrosDetalles', props))}></Route> 
        <Route exact path='/activopasivo/ahorros/resumen' render={(props)=>(getPage('CuentaAhorrosResumen', props))}></Route>
        <Route exact path='/nofoundit' render={(props)=>(getPage('NotFoundIt', props))}></Route> 
      </MenuBG>                
      </Switch>
    </BrowserRouter>  
            
  </section>    
</>)
 
}

export default App;
