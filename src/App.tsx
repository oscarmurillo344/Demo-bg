import './App.css';
import 'antd/dist/antd.css';

import AhorroResumen from './modulos/ahorros/resumen/ahorrosResumen';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MenuBG from './componentes/menuBG/menuBG';
import menuBG from './menu'
import MenuListBg from './interfaces/menu';
import { useState } from 'react';

function App() {
  const menu : MenuListBg[] = menuBG;
  const [menuAbierto, setMenuAbierto] = useState(false)
  const getPage = (pagina:string, props:any)=>{
    switch(pagina)
    {
      case "CuentaAhorrosResumen":
          return <AhorroResumen menuAbierto={menuAbierto} {...props} />
        
      case "CuentaAhorrosDetalles":
        return <AhorroResumen menuAbierto={menuAbierto} {...props} />
        
      case "NotFoundIt":
        return  <p>We are working in it! </p>
        
      case 'Home':
        return <p>Estas en home</p>
    }
    return <> </>

  }

  const onCloseMenu = ()=>{
    setMenuAbierto(false)
  }

  const onOpenMenu = ()=>{
    setMenuAbierto(true)
  }
  return (<>
    <section>
    
    <BrowserRouter>
      <Switch>                        
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
