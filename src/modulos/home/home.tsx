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
    const getGrafico = ()=>{
       return <div className="item-dashboard"  style={{width: "530px", justifyContent:"center", height:"200px"}}> 
        {
            <Line data={data}  /> 
        }          
      </div>
    }
    return (
        <> 
            <div style={{justifyContent:"center", alignItems:"center"}} className="flex colum" >
            <div className="flex row" >
                {
                    getGrafico()
                }
                {
                    getGrafico()
                }
            </div>
            <div className="flex row" >
                {
                    getGrafico()
                }
                {
                    getGrafico()
                }
            </div>
            </div>
            
        </>
    )
}

export default Home