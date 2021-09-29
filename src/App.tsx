import './App.css';
import 'antd/dist/antd.css';

import AhorroResumen from './modulos/ahorros/resumen/ahorrosResumen';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MenuBG from './componentes/menuBG/menuBG';
import menuBG from './menu'
import MenuListBg from './interfaces/menu';
import { useEffect, useState } from 'react';
import Home from './modulos/home/home';
import video from './indices_video.gif'

function App() {
  const menu : MenuListBg[] = menuBG;
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [openSpinner, setOpenSpinner] = useState(true);
  const getPage = (pagina:string, props:any)=>{
    switch(pagina)
    {
      case "CuentaAhorrosResumen":
          return <AhorroResumen onReady={onReadyAhorros} menuAbierto={menuAbierto} {...props} />
        
      case "CuentaAhorrosDetalles":
        return <AhorroResumen onReady={onReadyAhorros} menuAbierto={menuAbierto} {...props} />
        
      case "NotFoundIt":
        return  <p>We are working in it! </p>
        
      case 'Home':
        return  <Home {...props}  />
    }
    return <> </>

  }
  
  const onCloseMenu = ()=>{
    
    setMenuAbierto(false)
  }

  const onOpenMenu = ()=>{
    setMenuAbierto(true)
  }
  const onReadyAhorros = ()=>{
    setOpenSpinner(true)
    setTimeout(() => {
      setOpenSpinner(false)
    }, 1500);   
  }
  return (<>
    <div className="loading" style={{display: openSpinner? "block": "none"}} >
        <img style={{opacity:"0.7"}} src={video} width="100%" height="100%" />
    </div>       
    <section>
    
    <BrowserRouter  >
      <Switch  >                        
      <MenuBG items={menu} onCloseMenu={onCloseMenu} onOpenMenu={onOpenMenu}  >
        <Route exact path='/' render={(props)=>(getPage('Home', props))}></Route> 
        <Route exact path='/home' render={(props)=>(getPage('Home', props))}></Route> 
        <Route exact path='/ahorros/detalles' render={(props)=>(getPage('CuentaAhorrosDetalles', props))}></Route> 
        <Route exact path='/ahorros/resumen' render={(props)=>(getPage('CuentaAhorrosResumen', props))}></Route>
        <Route exact path='/nofoundit' render={(props)=>(getPage('NotFoundIt', props))}></Route> 
      </MenuBG>                
      </Switch>
    </BrowserRouter>  
            
  </section>    
</>)
 
}

export default App;
