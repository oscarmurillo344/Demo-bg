import './App.css';
import 'antd/dist/antd.css';

import AhorroResumen from './modulos/ahorros/resumen/ahorrosResumen';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MenuBG from './componentes/menuBG/menuBG';
import menuBG from './menu'
import MenuListBg from './interfaces/menu';
function App() {
  const menu : MenuListBg[] = menuBG;
  const getPage = (pagina:string, props:any)=>{
    switch(pagina)
    {
      case "CuentaAhorrosResumen":
          return <AhorroResumen {...props} />
        
      case "CuentaAhorrosDetalles":
        return <AhorroResumen {...props} />
        
      case "NotFoundIt":
        return  <p>We are working in it! </p>
        
      case 'Home':
        return <p>Estas en home</p>
    }
    return <> </>

  }
  return (<>
    <section>
    
    <BrowserRouter>
      <Switch>                        
      <MenuBG items={menu}  >
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
