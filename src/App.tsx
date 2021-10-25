import './App.css';
import 'antd/dist/antd.css';

import AhorroResumen from './modulos/ahorros/resumen/ahorrosResumen';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import MenuBG from './componentes/menuBG/menuBG';
import menuBG from './menu'
import MenuListBg from './interfaces/menu';
import { useEffect, useState } from 'react';
import Home from './modulos/home/home';
import { AiOutlineSetting } from 'react-icons/ai';
import Loader from 'react-loader-spinner';

function App() {
  const menu : MenuListBg[] = menuBG;
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
    console.log(moduloRuta)
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
      <MenuBG itemConfiguracion={  {
       nombre:"Configuraciones", 
       icon: <AiOutlineSetting></AiOutlineSetting>,
       items: [{nombre:"opcion1"}, {nombre:"opcion2"}]
   }} items={menu} modulo={getModuloRuta()} abrirMenu={menuAbierto} onCloseMenu={onCloseMenu} onOpenMenu={onOpenMenu}  >

        <Route exact path='/' render={(props)=>(getPage('Home', props))}></Route> 
        <Route exact path='/home' render={(props)=>(getPage('Home', props))}></Route> 
        <Route exact path='/activopasivo/ahorros/detalles' render={(props)=>(getPage('CuentaAhorrosDetalles', props))}></Route> 
        <Route exact path='/activopasivo/ahorros/resumen' render={(props)=>(getPage('CuentaAhorrosResumen', props))}></Route>
        <Route exact path='/nofoundit' render={(props)=>(getPage('NotFoundIt', props))}></Route> 
        <Redirect from="/" to="home" />
      </MenuBG>                
      </Switch>
    </BrowserRouter>  
            
  </section>    
</>)
 
}

export default App;
