import { useEffect } from "react";
import { Line } from "react-chartjs-2"
import './home.css'
interface HomeProps{
    onReady? :any;
}

const Home = (props:HomeProps)=>{
    const meses:any[] = ["Enero","Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Noviembre", "Diciembre"]
    const dataSimuladaGrafico:any[] = [65, 59, 80, 81, 56, 55, 40, 52, 48, 12,11, 80];
    const data  = {
        labels: meses,
        datasets: [{
          label: 'Anual',
          data: dataSimuladaGrafico,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
      
            },            
        ]
      }
    
    useEffect(()=>{
        if(props.onReady)
        {
            props.onReady();
        }
    }, [])
    const getGrafico = (width:string, heigth:string)=>{
       return <div className="item-dashboard"  style={{width: width, justifyContent:"center", height:heigth}}> 
        {
            <Line data={data}  /> 
        }          
      </div>
    }
    return (
        <> 
        <div className="flex colum" >
        <div className="flex" style={{justifyContent:"center", alignItems:"start"}} >
        <div className="flex colum"  >
            <div  style={{justifyContent:"start", alignItems:"center"}} className="flex colum contenedor" >
                <p className="titulo" > Activo y Pasivo</p>
                <div className="flex row" style={{alignItems:"start"}} >
                    {
                        getGrafico("280px", "100px")
                    }
                    {
                        getGrafico("280px", "100px")
                    }
                    {
                        getGrafico("280px", "100px")
                    }
                </div>
                <div className="flex row" style={{justifyContent:"center"}} >
                    {
                        getGrafico("280px", "100px")
                    }
                    {
                        getGrafico("280px", "100px")
                    }
                    {
                        getGrafico("280px", "100px")
                    }
                </div>
            </div>
            <div className="contenedor flex colum" style={{marginTop:"1px", justifyContent:"center", alignItems:"center"}} >
            <p className="titulo" > Informe Cartera</p>
            <div className="flex row" style={{justifyContent:"center"}} >
                     
                    {
                        getGrafico("280px", "100px")
                    }
                    {
                        getGrafico("280px", "100px")
                    }
                    {
                        getGrafico("280px", "100px")
                    }
                </div>
            </div>
        </div>
        
            <div style={{justifyContent:"center", alignItems:"center"}} >
                
                <div className="flex contenedor colum"  style={{justifyContent:"center", alignItems:"center"}} >
                <p className="titulo" > Cobertura</p>
                    {
                        getGrafico("280px", "200px")

                    }
                   
                    
                </div>
                <div className="flex contenedor colum"  style={{justifyContent:"center", alignItems:"center"}} >
                <p className="titulo" > Informe Pasivo</p>
                    {
                        getGrafico("280px", "200px")

                    }
                   
                    
                </div>
                    
                    
            </div>
        </div>
        
        </div>
                     
        </>
    )
}

export default Home